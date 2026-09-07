// One-time fix: getOrCreateOnlineWarehouse's findFirst-then-create had a race that let two
// "Online Fulfilment Center" (type ONLINE) rows get created. Merges every duplicate ONLINE
// warehouse into one canonical row (the one with the most existing data attached), moving its
// Inventory/StockMovement/OrderItem/InventoryImport rows over, then deletes the empty duplicate.
// Run with: npx tsx prisma/merge-duplicate-warehouses.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const onlineWarehouses = await prisma.warehouse.findMany({
    where: { type: "ONLINE" },
    orderBy: { id: "asc" },
  });

  if (onlineWarehouses.length <= 1) {
    console.log("Nothing to merge.");
    return;
  }

  const withCounts = await Promise.all(
    onlineWarehouses.map(async (warehouse) => ({
      warehouse,
      weight:
        (await prisma.inventory.count({ where: { warehouseId: warehouse.id } })) +
        (await prisma.stockMovement.count({ where: { warehouseId: warehouse.id } })) +
        (await prisma.orderItem.count({ where: { warehouseId: warehouse.id } })),
    })),
  );

  withCounts.sort((a, b) => b.weight - a.weight || a.warehouse.id.localeCompare(b.warehouse.id));
  const [{ warehouse: canonical }, ...rest] = withCounts;
  console.log(`Canonical warehouse: ${canonical.name} (${canonical.id})`);

  for (const { warehouse: dup } of rest) {
    console.log(`Merging duplicate ${dup.id} into ${canonical.id}...`);

    const dupInventory = await prisma.inventory.findMany({ where: { warehouseId: dup.id } });
    for (const row of dupInventory) {
      const existing = await prisma.inventory.findUnique({
        where: { variantId_warehouseId: { variantId: row.variantId, warehouseId: canonical.id } },
      });

      if (existing) {
        await prisma.inventory.update({
          where: { variantId_warehouseId: { variantId: row.variantId, warehouseId: canonical.id } },
          data: {
            quantityOnHand: existing.quantityOnHand + row.quantityOnHand,
            reorderPoint: Math.max(existing.reorderPoint, row.reorderPoint),
          },
        });
        await prisma.inventory.delete({
          where: { variantId_warehouseId: { variantId: row.variantId, warehouseId: dup.id } },
        });
      } else {
        await prisma.inventory.update({
          where: { variantId_warehouseId: { variantId: row.variantId, warehouseId: dup.id } },
          data: { warehouseId: canonical.id },
        });
      }
    }

    await prisma.stockMovement.updateMany({ where: { warehouseId: dup.id }, data: { warehouseId: canonical.id } });
    await prisma.orderItem.updateMany({ where: { warehouseId: dup.id }, data: { warehouseId: canonical.id } });
    await prisma.inventoryImport.updateMany({ where: { warehouseId: dup.id }, data: { warehouseId: canonical.id } });

    await prisma.warehouse.delete({ where: { id: dup.id } });
    console.log(`Deleted duplicate warehouse ${dup.id}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
