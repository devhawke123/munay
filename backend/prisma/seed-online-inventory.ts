// One-time seed: the ONLINE warehouse (which the new storefront checkout deducts from) had zero
// Inventory rows for every variant — no real checkout could ever succeed. Gives every variant a
// flat placeholder quantity online, independent of physical warehouse counts, so the storefront
// is actually sellable. Adjust real per-product online quantities afterwards via the Inventory
// page's Adjust Stock / bulk adjust.
// Run with: npx tsx prisma/seed-online-inventory.ts
import { PrismaClient } from "@prisma/client";

const PLACEHOLDER_QTY = 10;

const prisma = new PrismaClient();

async function main() {
  const online = await prisma.warehouse.findFirst({ where: { type: "ONLINE" } });
  if (!online) throw new Error("No ONLINE warehouse found");

  const variants = await prisma.productVariant.findMany({ select: { id: true } });
  if (variants.length === 0) {
    console.log("No variants to seed.");
    return;
  }

  await prisma.inventory.createMany({
    data: variants.map((v) => ({ variantId: v.id, warehouseId: online.id, quantityOnHand: PLACEHOLDER_QTY })),
    skipDuplicates: true,
  });

  console.log(`Seeded ${variants.length} variants into "${online.name}" (${online.id}) at qty ${PLACEHOLDER_QTY}.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
