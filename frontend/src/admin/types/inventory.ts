export type InventoryVariant = {
  color: string;
  size: string;
  qty: number;
};

export type InventoryItem = {
  id: string;
  product: string;
  sku: string;
  category: string;
  subcategory: string;
  totalStock: number;
  reorderPoint: number;
  variants: InventoryVariant[];
};

export type Warehouse = {
  id: string;
  name: string;
  location: string;
  lastImport: string;
  items: InventoryItem[];
};

export type InventoryStatus = "In Stock" | "Low Stock" | "Out of Stock";

export function getInventoryStatus(item: { totalStock: number; reorderPoint: number }): InventoryStatus {
  if (item.totalStock === 0) return "Out of Stock";
  if (item.totalStock < item.reorderPoint) return "Low Stock";
  return "In Stock";
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
