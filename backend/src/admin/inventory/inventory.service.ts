import { readFile } from "node:fs/promises";
import type { Prisma, WarehouseType } from "@prisma/client";
import { parse } from "csv-parse/sync";
import { prisma } from "../../db.js";
import { HttpError } from "../shared/middleware/errorHandler.js";

export function listWarehouses(type?: WarehouseType) {
  return prisma.warehouse.findMany({ where: type ? { type } : undefined, orderBy: { name: "asc" } });
}

interface CreateWarehouseInput {
  name: string;
  type?: WarehouseType;
  location?: string;
  address?: string;
}

export function createWarehouse(data: CreateWarehouseInput) {
  return prisma.warehouse.create({ data });
}

const ITEM_INCLUDE = (warehouseId: string) =>
  ({
    subcategory: true,
    variants: { include: { inventory: { where: { warehouseId } } } },
  }) satisfies Prisma.ProductInclude;

type ProductForItem = Prisma.ProductGetPayload<{ include: ReturnType<typeof ITEM_INCLUDE> }>;

function toItem(product: ProductForItem) {
  const stockedVariants = product.variants.filter((v) => v.inventory.length > 0);
  const variants = stockedVariants.map((v) => ({
    id: v.id,
    color: v.color,
    size: v.size,
    qty: v.inventory[0].quantityOnHand,
  }));

  return {
    id: product.id,
    product: product.name,
    sku: product.sku,
    category: product.subcategory.mainCategory,
    subcategory: product.subcategory.name,
    totalStock: variants.reduce((sum, v) => sum + v.qty, 0),
    reorderPoint: Math.max(0, ...stockedVariants.map((v) => v.inventory[0].reorderPoint)),
    variants,
  };
}

async function listItemsForWarehouse(warehouseId: string) {
  const products = await prisma.product.findMany({
    where: { variants: { some: { inventory: { some: { warehouseId } } } } },
    include: ITEM_INCLUDE(warehouseId),
    orderBy: { name: "asc" },
  });
  return products.map(toItem);
}

export async function getWarehouseWithItems(warehouseId: string) {
  const warehouse = await prisma.warehouse.findUnique({
    where: { id: warehouseId },
    include: { imports: { orderBy: { importedAt: "desc" }, take: 1 } },
  });
  if (!warehouse) return null;

  const { imports, ...rest } = warehouse;
  return {
    ...rest,
    lastImportAt: imports[0]?.importedAt ?? null,
    items: await listItemsForWarehouse(warehouseId),
  };
}

export async function listWarehousesWithItems(type?: WarehouseType) {
  const warehouses = await listWarehouses(type);
  return Promise.all(
    warehouses.map(async (warehouse) => {
      const latestImport = await prisma.inventoryImport.findFirst({
        where: { warehouseId: warehouse.id },
        orderBy: { importedAt: "desc" },
      });
      return {
        ...warehouse,
        lastImportAt: latestImport?.importedAt ?? null,
        items: await listItemsForWarehouse(warehouse.id),
      };
    }),
  );
}

// Largest-remainder method: scales existing variant quantities to a new product-level
// total, keeping the sum exact and each variant's share proportional to its old share.
function distributeTotal(rows: { variantId: string; qty: number }[], newTotal: number) {
  const oldTotal = rows.reduce((sum, r) => sum + r.qty, 0);

  if (oldTotal === 0) {
    const base = Math.floor(newTotal / rows.length);
    let remainder = newTotal - base * rows.length;
    return rows.map((r) => {
      const bonus = remainder > 0 ? 1 : 0;
      if (remainder > 0) remainder--;
      return { variantId: r.variantId, newQty: base + bonus };
    });
  }

  const scaled = rows.map((r) => {
    const exact = (r.qty / oldTotal) * newTotal;
    return { variantId: r.variantId, floor: Math.floor(exact), fraction: exact - Math.floor(exact) };
  });

  let remainder = newTotal - scaled.reduce((sum, r) => sum + r.floor, 0);
  const byFractionDesc = [...scaled].sort((a, b) => b.fraction - a.fraction);
  for (const row of byFractionDesc) {
    if (remainder <= 0) break;
    row.floor += 1;
    remainder--;
  }

  return scaled.map((r) => ({ variantId: r.variantId, newQty: r.floor }));
}

export async function adjustProductStock(warehouseId: string, productId: string, totalStock: number) {
  if (totalStock < 0) throw new HttpError(400, "totalStock cannot be negative");

  return prisma.$transaction(async (tx) => {
    const rows = await tx.inventory.findMany({
      where: { warehouseId, variant: { productId } },
      select: { variantId: true, quantityOnHand: true },
    });
    if (rows.length === 0) throw new HttpError(400, "This product has no variants stocked in this warehouse");

    const distribution = distributeTotal(
      rows.map((r) => ({ variantId: r.variantId, qty: r.quantityOnHand })),
      totalStock,
    );

    for (const { variantId, newQty } of distribution) {
      const previous = rows.find((r) => r.variantId === variantId)!.quantityOnHand;
      if (newQty === previous) continue;

      await tx.inventory.update({
        where: { variantId_warehouseId: { variantId, warehouseId } },
        data: { quantityOnHand: newQty },
      });
      await tx.stockMovement.create({
        data: {
          variantId,
          warehouseId,
          quantityDelta: newQty - previous,
          reason: "MANUAL_ADJUSTMENT",
          reference: "Adjust Stock",
        },
      });
    }

    const product = await tx.product.findUniqueOrThrow({ where: { id: productId }, include: ITEM_INCLUDE(warehouseId) });
    return toItem(product);
  });
}

export async function bulkAdjustStock(warehouseId: string, updates: { productId: string; totalStock: number }[]) {
  for (const update of updates) {
    await adjustProductStock(warehouseId, update.productId, update.totalStock);
  }
  return listItemsForWarehouse(warehouseId);
}

export async function getOrCreateOnlineWarehouse() {
  const existing = await prisma.warehouse.findFirst({ where: { type: "ONLINE" } });
  if (existing) return existing;
  return prisma.warehouse.create({ data: { name: "Online Fulfilment Center", type: "ONLINE" } });
}

export async function simulateOnlineOrder() {
  const online = await getOrCreateOnlineWarehouse();
  const inStock = await prisma.inventory.findMany({
    where: { warehouseId: online.id, quantityOnHand: { gt: 0 } },
    include: { variant: { include: { product: true } } },
  });
  if (inStock.length === 0) throw new HttpError(409, "No online stock available to simulate an order against");

  const row = inStock[Math.floor(Math.random() * inStock.length)];
  const amount = Math.min(row.quantityOnHand, 1 + Math.floor(Math.random() * 3));
  const orderNumber = `#MU-${4800 + Math.floor(Math.random() * 200)}`;

  return prisma.$transaction(async (tx) => {
    await tx.inventory.update({
      where: { variantId_warehouseId: { variantId: row.variantId, warehouseId: online.id } },
      data: { quantityOnHand: { decrement: amount } },
    });
    const movement = await tx.stockMovement.create({
      data: {
        variantId: row.variantId,
        warehouseId: online.id,
        quantityDelta: -amount,
        reason: "ORDER_DEDUCTION",
        reference: orderNumber,
      },
    });

    return {
      id: movement.id,
      product: row.variant.product.name,
      variantLabel: `${row.variant.color} · ${row.variant.size}`,
      orderNumber,
      amount: -amount,
      occurredAt: movement.occurredAt,
    };
  });
}

export async function listOnlineDeductions(limit = 20) {
  const online = await getOrCreateOnlineWarehouse();
  const movements = await prisma.stockMovement.findMany({
    where: { warehouseId: online.id, reason: "ORDER_DEDUCTION" },
    include: { variant: { include: { product: true } } },
    orderBy: { occurredAt: "desc" },
    take: limit,
  });

  return movements.map((m) => ({
    id: m.id,
    product: m.variant.product.name,
    variantLabel: `${m.variant.color} · ${m.variant.size}`,
    orderNumber: m.reference,
    amount: m.quantityDelta,
    occurredAt: m.occurredAt,
  }));
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

        const existing = await tx.inventory.findUnique({
          where: { variantId_warehouseId: { variantId: variant.id, warehouseId } },
        });

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

        const delta = Number(row.quantityOnHand) - (existing?.quantityOnHand ?? 0);
        if (delta !== 0) {
          await tx.stockMovement.create({
            data: {
              variantId: variant.id,
              warehouseId,
              quantityDelta: delta,
              reason: "CSV_IMPORT",
              reference: filePath,
            },
          });
        }

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
