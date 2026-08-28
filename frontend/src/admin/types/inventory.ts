import type { ApiInventoryItem, ApiInventoryVariant, ApiStockStatus } from "../hooks/useInventoryApi";

export type InventoryVariant = ApiInventoryVariant;
export type InventoryItem = ApiInventoryItem;

export type InventoryStatus = "In Stock" | "Low Stock" | "Out of Stock";

const STATUS_LABEL: Record<ApiStockStatus, InventoryStatus> = {
  IN_STOCK: "In Stock",
  LOW_STOCK: "Low Stock",
  OUT_OF_STOCK: "Out of Stock",
};

export function getInventoryStatus(item: { status: ApiStockStatus }): InventoryStatus {
  return STATUS_LABEL[item.status];
}

export function getItemColors(item: InventoryItem): string[] {
  return Array.from(new Set(item.variants.map((v) => v.color)));
}

export function getItemSizes(item: InventoryItem): string[] {
  return Array.from(new Set(item.variants.map((v) => v.size)));
}

export function getVariantQty(item: InventoryItem, color: string, size: string): number | undefined {
  return item.variants.find((v) => v.color === color && v.size === size)?.qty;
}

export type VariantCellStatus = "healthy" | "running-low" | "out-of-stock" | "not-offered";

const RUNNING_LOW_THRESHOLD = 5;

export function getVariantCellStatus(qty: number | undefined): VariantCellStatus {
  if (qty === undefined) return "not-offered";
  if (qty === 0) return "out-of-stock";
  if (qty <= RUNNING_LOW_THRESHOLD) return "running-low";
  return "healthy";
}

export function getVariantsInStockCount(item: InventoryItem): { inStock: number; total: number } {
  const colors = getItemColors(item);
  const sizes = getItemSizes(item);
  const total = colors.length * sizes.length;
  const inStock = item.variants.filter((v) => v.qty > 0).length;
  return { inStock, total };
}
