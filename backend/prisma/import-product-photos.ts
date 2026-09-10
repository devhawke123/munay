// One-time import of the 19-folder product photo drop (frontend/src/assets/productImages/).
// Only 9 folders actually contain real photos — the rest are empty (just a macOS .DS_Store).
// Matches each folder to its DB product (several use different, partly-French DB names), parses
// each filename's trailing color token, tags it against that product's real variant colors, and
// copies the file into backend/uploads/products/ with a real ProductImage row.
// Run with: npx tsx prisma/import-product-photos.ts
import { randomUUID } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_ROOT = path.resolve(__dirname, "../../frontend/src/assets/productImages");
const UPLOAD_DIR = path.resolve(__dirname, "../uploads/products");
if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });

interface ImportEntry {
  folders: string[];
  productName: string;
  // Filename color token -> real variant color, for cases the DB uses a different name
  // (e.g. the photoshoot calls it "Stone Grey", the catalogue calls the variant "Powder Pink").
  colorOverrides?: Record<string, string>;
}

const ENTRIES: ImportEntry[] = [
  { folders: ["Allin Throw"], productName: "Couverture Allin" },
  { folders: ["Chaska Coat"], productName: "Chaska Coat" },
  { folders: ["Kuntur Coat"], productName: "Kuntur Coat", colorOverrides: { kamel: "Camel" } },
  { folders: ["Kusik Throw"], productName: "Couverture Kusik" },
  { folders: ["Mayu Shawl"], productName: "Mayu Shawl" },
  {
    folders: ["Warmi Pullover", "Wasi Pullover"],
    productName: "Warmi Wasi Pullover",
    colorOverrides: { "stone grey": "Powder Pink" },
  },
  { folders: ["Warmisqa Throw"], productName: "Couverture Warmisqa" },
  { folders: ["Yuraq Pullover"], productName: "Yuraq Pullover" },
];

const IMAGE_EXT = /\.(jpg|jpeg|png|webp)$/i;

function findImageFiles(folderBaseName: string): string[] {
  const wrapper = readdirSync(SOURCE_ROOT).find((d) => d.startsWith(`${folderBaseName}-`));
  if (!wrapper) return [];
  const innerDir = path.join(SOURCE_ROOT, wrapper, folderBaseName);
  if (!existsSync(innerDir)) return [];
  return readdirSync(innerDir)
    .filter((f) => IMAGE_EXT.test(f))
    .map((f) => path.join(innerDir, f));
}

function extractRawColor(filePath: string, folderBaseName: string): string {
  let name = path.basename(filePath).replace(IMAGE_EXT, "");
  const prefix = new RegExp(`^${folderBaseName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i");
  name = name.replace(prefix, "").trim();
  name = name.replace(/\(\s*\d+\s*x\s*\d+\s*px\s*\)/gi, "").trim();
  name = name.replace(/\d+$/, "").trim();
  return name.replace(/\s+/g, " ").trim();
}

function matchVariantColor(rawColor: string, variantColors: string[], overrides?: Record<string, string>): string | null {
  const lower = rawColor.toLowerCase();
  if (overrides?.[lower]) return overrides[lower];
  const exact = variantColors.find((c) => c.toLowerCase() === lower);
  if (exact) return exact;
  const contains = variantColors.find(
    (c) => c.toLowerCase().includes(lower) || lower.includes(c.toLowerCase()),
  );
  return contains ?? null;
}

async function main() {
  const unmatched: string[] = [];
  const summary: string[] = [];

  for (const entry of ENTRIES) {
    const product = await prisma.product.findFirst({
      where: { name: entry.productName },
      include: { variants: true },
    });
    if (!product) {
      summary.push(`SKIP "${entry.productName}" — product not found`);
      continue;
    }
    const variantColors = [...new Set(product.variants.map((v) => v.color))];

    const files = entry.folders.flatMap((folder) =>
      findImageFiles(folder).map((filePath) => ({
        filePath,
        rawColor: extractRawColor(filePath, folder),
      })),
    );
    if (files.length === 0) {
      summary.push(`SKIP "${entry.productName}" — no image files found`);
      continue;
    }

    const withColor = files
      .map((f) => ({
        ...f,
        color: matchVariantColor(f.rawColor, variantColors, entry.colorOverrides),
      }))
      .sort((a, b) => (a.color ?? "").localeCompare(b.color ?? "") || a.filePath.localeCompare(b.filePath));

    for (const f of withColor) {
      if (!f.color) unmatched.push(`${entry.productName}: ${path.basename(f.filePath)} (parsed "${f.rawColor}")`);
    }

    const imageRows = withColor.map((f, index) => {
      const ext = path.extname(f.filePath).toLowerCase();
      const filename = `${randomUUID()}${ext}`;
      copyFileSync(f.filePath, path.join(UPLOAD_DIR, filename));
      return {
        productId: product.id,
        path: `/uploads/products/${filename}`,
        isMain: index === 0,
        sortOrder: index,
        color: f.color ?? undefined,
      };
    });

    await prisma.$transaction(async (tx) => {
      await tx.productImage.deleteMany({ where: { productId: product.id } });
      await tx.productImage.createMany({ data: imageRows });
    });

    summary.push(`OK "${entry.productName}" — ${imageRows.length} images (${imageRows.filter((r) => r.color).length} color-tagged)`);
  }

  console.log(summary.join("\n"));
  if (unmatched.length > 0) {
    console.log("\nImported untagged (no matching variant color) — review manually:");
    console.log(unmatched.map((u) => `  - ${u}`).join("\n"));
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
