// One-time backfill: import-catalog.ts created products/variants without any Inventory row,
// so those variants were invisible on the Inventory page (which only lists stocked variants).
// Gives every variant missing a row in the given warehouse a quantityOnHand of 0 (not a guess —
// real counts should be entered via Adjust Stock / CSV import afterwards).
// Run with: npx tsx prisma/backfill-inventory.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const warehouse = await prisma.warehouse.findFirst({ where: { type: "PHYSICAL" } });
  if (!warehouse) throw new Error("No PHYSICAL warehouse found to backfill into");

  const variants = await prisma.productVariant.findMany({
    where: { inventory: { none: { warehouseId: warehouse.id } } },
    select: { id: true },
  });

  if (variants.length === 0) {
    console.log("Nothing to backfill.");
    return;
  }

  await prisma.inventory.createMany({
    data: variants.map((v) => ({ variantId: v.id, warehouseId: warehouse.id, quantityOnHand: 0 })),
  });

  console.log(`Backfilled ${variants.length} variants into "${warehouse.name}" (${warehouse.id}) at qty 0.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
