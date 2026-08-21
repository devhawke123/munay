import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";
import { prisma } from "../../db.js";

export function listWarehouses() {
  return prisma.warehouse.findMany({ orderBy: { name: "asc" } });
}

interface CreateWarehouseInput {
  name: string;
  location?: string;
  address?: string;
}

export function createWarehouse(data: CreateWarehouseInput) {
  return prisma.warehouse.create({ data });
}

export function listInventory(warehouseId?: string) {
  return prisma.inventory.findMany({
    where: warehouseId ? { warehouseId } : undefined,
    include: { variant: true, warehouse: true },
  });
}

export function listImportsForWarehouse(warehouseId: string) {
  return prisma.inventoryImport.findMany({
    where: { warehouseId },
    orderBy: { importedAt: "desc" },
  });
}

interface InventoryCsvRow {
  sku: string;
  quantityOnHand: string;
  reorderPoint: string;
}

interface ImportSummary {
  imported: number;
  skipped: string[];
  status: "completed" | "partial" | "failed";
}

export async function importInventoryFromCsv(
  warehouseId: string,
  filePath: string,
  importedBy?: string,
): Promise<ImportSummary> {
  const raw = await readFile(filePath, "utf-8");
  const rows: InventoryCsvRow[] = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  const skipped: string[] = [];

  try {
    const imported = await prisma.$transaction(async (tx) => {
      let count = 0;

      for (const row of rows) {
        const variant = await tx.productVariant.findUnique({
          where: { sku: row.sku },
          select: { id: true },
        });

        if (!variant) {
          skipped.push(row.sku);
          continue;
        }

        await tx.inventory.upsert({
          where: {
            variantId_warehouseId: {
              variantId: variant.id,
              warehouseId,
            },
          },
          create: {
            variantId: variant.id,
            warehouseId,
            quantityOnHand: Number(row.quantityOnHand),
            reorderPoint: Number(row.reorderPoint),
          },
          update: {
            quantityOnHand: Number(row.quantityOnHand),
            reorderPoint: Number(row.reorderPoint),
          },
        });

        count++;
      }

      const status: ImportSummary["status"] = skipped.length === 0 ? "completed" : "partial";

      await tx.inventoryImport.create({
        data: {
          warehouseId,
          fileName: filePath,
          rowCount: rows.length,
          status,
          importedBy,
        },
      });

      return count;
    });

    return {
      imported,
      skipped,
      status: skipped.length === 0 ? "completed" : "partial",
    };
  } catch (err) {
    await prisma.inventoryImport.create({
      data: {
        warehouseId,
        fileName: filePath,
        rowCount: rows.length,
        status: "failed",
        importedBy,
      },
    });

    return { imported: 0, skipped, status: "failed" };
  }
}
