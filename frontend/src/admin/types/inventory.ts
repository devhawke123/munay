export type InventoryVariant = {
  label: string;
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
