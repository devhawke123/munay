/**
 * One-shot: upload frontend/assets/productImages → Supabase product-images bucket
 * and insert ProductImage rows (public HTTPS URLs).
 *
 * Usage: node scripts/import-product-images.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { createHash, randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const ASSETS = path.join(ROOT, "frontend/assets/productImages");
const BUCKET = "product-images";
const SUPABASE_URL = "https://xjbyfzhrgojtesjktvmw.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqYnlmemhyZ29qdGVzamt0dm13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NjU2OTUsImV4cCI6MjEwNTA0MTY5NX0.oWuUDugTDbnDECaDVfUqOIBv02uq7p9Sa3V7edKACOg";
const DB_URL =
  "postgresql://postgres:Munay%40123%40a@db.xjbyfzhrgojtesjktvmw.supabase.co:5432/postgres";

/** Asset inner folder name → DB Product.name */
const FOLDER_TO_PRODUCT = {
  "Yuraq Pullover": "Yuraq Pullover",
  "Tikay Scarf": "Tikay Scarf",
  "Iskay Cape": "Iskay Cape",
  "Pachakuti Scarf": "Pachakuti Scarf",
  "Kusik Throw": "Couverture Kusik",
  "Warmisqa Throw": "Couverture Warmisqa",
  "Allin Throw": "Couverture Allin",
  "Warmi Pullover": "Warmi Wasi Pullover",
  "Wasi Pullover": "Wasi Pullover",
  "Uchuy Huacaya": "Uchuy Huacaya",
  "Uchuy Suri": "Uchuy Suri",
  "Chaska Coat": "Chaska Coat",
  "Kallpa Pullover": "Kallpa Pullover",
  "Mayu Shawl": "Mayu Shawl",
  "Uma Coat": "Manteau Uma",
  "Kuntur Coat": "Kuntur Coat",
  "Kancha Top": "Top Kancha",
  "Cardigan Punchaw": "Cardigan Punchaw",
  "Chanka Hat": "Chanka Hat",
};

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function norm(s) {
  return String(s)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Guess color from nested folder or flat filename. */
function detectColor(relParts, productFolder) {
  if (relParts.length >= 2) {
    // color/file.jpg
    return relParts[0];
  }
  const base = path.parse(relParts[0]).name;
  // Strip product name prefixes / dimensions / trailing indices
  let s = base
    .replace(/\(.*?\)/g, " ")
    .replace(/\d+\s*x\s*\d+\s*px/gi, " ")
    .replace(/^\d+/, " ");
  const folderNorm = norm(productFolder);
  const sNorm = norm(s);
  // Remove product words from start
  let colorPart = sNorm;
  if (colorPart.startsWith(folderNorm)) {
    colorPart = colorPart.slice(folderNorm.length).trim();
  }
  // Drop trailing photo indices like "1" "2" "4"
  colorPart = colorPart.replace(/\s+\d+$/, "").trim();
  if (!colorPart) return null;
  // Title-case-ish from original: find original substring
  // Prefer returning a cleaned version of the leftover from original base
  const m = base.match(
    new RegExp(
      productFolder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*(.+)$",
      "i",
    ),
  );
  let raw = m ? m[1] : colorPart;
  raw = raw
    .replace(/\(.*?\)/g, " ")
    .replace(/\d+\s*x\s*\d+\s*px/gi, " ")
    .replace(/\s+\d+$/, "")
    .replace(/[_-]+/g, " ")
    .trim();
  // Title case words
  return raw
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => (w === "&" ? "&" : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join(" ")
    .replace(/\s+&\s+/g, " & ") || null;
}

function walkImages(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkImages(full));
    else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

function contentType(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "image/jpeg";
}

function slug(s) {
  return norm(s).replace(/\s+/g, "-") || "image";
}

async function main() {
  if (!fs.existsSync(ASSETS)) {
    throw new Error(`Assets not found: ${ASSETS}`);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const client = new pg.Client({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const { rows: products } = await client.query(`SELECT id, name FROM "Product"`);
  const byName = new Map(products.map((p) => [p.name, p.id]));

  // Clear existing ProductImages for re-import
  await client.query(`DELETE FROM "ProductImage"`);

  let uploaded = 0;
  let linked = 0;
  const mainsByProduct = new Set();

  for (const zipDir of fs.readdirSync(ASSETS, { withFileTypes: true })) {
    if (!zipDir.isDirectory()) continue;
    const zipPath = path.join(ASSETS, zipDir.name);
    // Find inner product folder
    const children = fs.readdirSync(zipPath, { withFileTypes: true }).filter((d) => d.isDirectory());
    for (const child of children) {
      const productFolder = child.name;
      const dbName = FOLDER_TO_PRODUCT[productFolder];
      if (!dbName) {
        console.warn("No map for folder", productFolder);
        continue;
      }
      const productId = byName.get(dbName);
      if (!productId) {
        console.warn("Product missing in DB:", dbName);
        continue;
      }

      const productRoot = path.join(zipPath, productFolder);
      const files = walkImages(productRoot);
      // Stable order
      files.sort((a, b) => a.localeCompare(b));

      let sortOrder = 0;
      const mainByColor = new Set();

      for (const file of files) {
        const rel = path.relative(productRoot, file);
        const relParts = rel.split(path.sep);
        const color = detectColor(relParts, productFolder);
        const ext = path.extname(file).toLowerCase() || ".jpg";
        const hash = createHash("md5").update(rel).digest("hex").slice(0, 8);
        const objectPath = `${slug(dbName)}/${color ? slug(color) : "general"}/${hash}${ext}`;

        const buf = fs.readFileSync(file);
        const { error } = await supabase.storage.from(BUCKET).upload(objectPath, buf, {
          contentType: contentType(file),
          upsert: true,
        });
        if (error) {
          console.error("Upload failed", objectPath, error.message);
          continue;
        }
        uploaded++;

        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);
        const publicUrl = pub.publicUrl;

        const isMainProduct = !mainsByProduct.has(productId);
        const isMainColor = color && !mainByColor.has(norm(color));
        const isMain = isMainProduct || Boolean(isMainColor && !mainsByProduct.has(productId));
        // First image overall is product main; also mark first of each color
        let flagMain = false;
        if (!mainsByProduct.has(productId)) {
          flagMain = true;
          mainsByProduct.add(productId);
        }
        if (color) mainByColor.add(norm(color));

        await client.query(
          `INSERT INTO "ProductImage" (id, "productId", path, "isMain", "sortOrder", color, "createdAt")
           VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
          [randomUUID().replace(/-/g, "").slice(0, 25), productId, publicUrl, flagMain, sortOrder++, color],
        );
        linked++;
        if (linked % 20 === 0) console.log(`… ${linked} images linked`);
      }
      console.log(`OK ${dbName}: ${files.length} files`);
    }
  }

  const counts = await client.query(
    `SELECT COUNT(*)::int AS images, COUNT(DISTINCT "productId")::int AS products FROM "ProductImage"`,
  );
  console.log("Done.", { uploaded, linked, ...counts.rows[0] });
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
