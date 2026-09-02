// One-time import of the client's real product catalogue
// (frontend/Munay_Website_Catalog_v3_1.xlsx, transformed to catalog-import.json).
// Run with: npx tsx prisma/import-catalog.ts
import { readFileSync } from "node:fs";
import { MainCategory, PrismaClient, ProductStatus } from "@prisma/client";

const prisma = new PrismaClient();

interface ImportVariant {
  sku: string;
  color: string;
  size: string;
}

interface ImportProduct {
  name: string;
  tags: string[];
  mainCategories: string[]; // e.g. ["Women"] or ["Men", "Women"]
  subcategory: string;
  subcategoryGroup: string;
  section: string | null;
  price: number;
  composition: string | null;
  fiber: string;
  description: string;
  careInstructions: string;
  variants: ImportVariant[];
}

const MAIN_CATEGORY_MAP: Record<string, MainCategory> = {
  Women: MainCategory.WOMEN,
  Men: MainCategory.MEN,
  Home: MainCategory.HOME,
};

async function resolveSubcategoryId(mainCategory: MainCategory, name: string, group: string) {
  const existing = await prisma.subcategory.findUnique({
    where: { mainCategory_name: { mainCategory, name } },
  });
  if (existing) return existing.id;
  const created = await prisma.subcategory.create({ data: { mainCategory, name, group } });
  return created.id;
}

async function main() {
  const products: ImportProduct[] = JSON.parse(readFileSync(new URL("./catalog-import.json", import.meta.url), "utf-8"));

  let created = 0;
  let skipped = 0;

  for (const p of products) {
    const existing = await prisma.product.findUnique({ where: { name: p.name } });
    if (existing) {
      console.log(`SKIP (already exists): ${p.name}`);
      skipped++;
      continue;
    }

    const subcategoryIds = await Promise.all(
      p.mainCategories.map((mc) =>
        resolveSubcategoryId(MAIN_CATEGORY_MAP[mc], p.subcategory, p.subcategoryGroup),
      ),
    );

    // Style-level sku: shared prefix of this product's variant skus (e.g. "PU-YURAQ" from
    // "PU-YURAQ-CAM-S") — required on Product, but not unique (see catalogue field alignment).
    const styleSku = p.variants[0].sku.split("-").slice(0, 2).join("-");

    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        sku: styleSku,
        section: p.section ?? undefined,
        price: p.price,
        composition: p.composition ?? undefined,
        fiber: p.fiber,
        careInstructions: p.careInstructions,
        tags: p.tags,
        status: ProductStatus.ACTIVE,
        subcategories: { create: subcategoryIds.map((subcategoryId) => ({ subcategoryId })) },
        variants: {
          create: p.variants.map((v) => ({
            sku: v.sku,
            color: v.color,
            size: v.size,
            price: p.price,
            status: ProductStatus.ACTIVE,
          })),
        },
      },
    });
    created++;
  }

  console.log(`\nDone. Created ${created} products, skipped ${skipped} (already existed).`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
