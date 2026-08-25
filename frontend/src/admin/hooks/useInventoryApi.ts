import { useMemo } from "react";
import { api } from "../lib/api";
import { useApiResource } from "./useApiResource";

export type ApiWarehouseType = "PHYSICAL" | "ONLINE";

export interface ApiInventoryVariant {
  id: string;
  color: string;
  size: string;
  qty: number;
}

export interface ApiInventoryItem {
  id: string;
  product: string;
  sku: string;
  category: string;
  subcategory: string;
  totalStock: number;
  reorderPoint: number;
  variants: ApiInventoryVariant[];
}

export interface ApiWarehouse {
  id: string;
  name: string;
  type: ApiWarehouseType;
  location: string | null;
  address: string | null;
  isActive: boolean;
  lastImportAt: string | null;
  items: ApiInventoryItem[];
}

/** GET /api/admin/inventory/warehouses?type=PHYSICAL */
export function useWarehousesApi(type?: ApiWarehouseType) {
  const path = useMemo(() => (type ? `/inventory/warehouses?type=${type}` : "/inventory/warehouses"), [type]);
  return useApiResource<ApiWarehouse[]>(path);
}

/** GET /api/admin/inventory/warehouses/:warehouseId */
export function useWarehouseApi(warehouseId: string | null) {
  return useApiResource<ApiWarehouse>(warehouseId ? `/inventory/warehouses/${warehouseId}` : null);
}

/** GET /api/admin/inventory/online — the singleton online fulfilment center */
export function useOnlineInventoryApi() {
  return useApiResource<ApiWarehouse>("/inventory/online");
}

export interface ApiLiveDeduction {
  id: string;
  product: string;
  variantLabel: string;
  orderNumber: string | null;
  amount: number;
  occurredAt: string;
}

/** GET /api/admin/inventory/online/deductions */
export function useOnlineDeductionsApi(limit?: number) {
  const path = useMemo(
    () => (limit ? `/inventory/online/deductions?limit=${limit}` : "/inventory/online/deductions"),
    [limit],
  );
  return useApiResource<ApiLiveDeduction[]>(path);
}

export const inventoryApi = {
  adjustProductStock: (warehouseId: string, productId: string, totalStock: number) =>
    api.patch<ApiInventoryItem>(`/inventory/warehouses/${warehouseId}/items/${productId}`, { totalStock }),
  bulkAdjustStock: (warehouseId: string, updates: { productId: string; totalStock: number }[]) =>
    api.patch<ApiInventoryItem[]>(`/inventory/warehouses/${warehouseId}/items`, { updates }),
  simulateOnlineOrder: () => api.post<ApiLiveDeduction>("/inventory/online/simulate-order"),
  createWarehouse: (data: { name: string; type?: ApiWarehouseType; location?: string; address?: string }) =>
    api.post<ApiWarehouse>("/inventory/warehouses", data),
  importCsv: (data: { warehouseId: string; filePath: string; importedBy?: string }) =>
    api.post<{ imported: number; skipped: string[]; status: "completed" | "partial" | "failed" }>(
      "/inventory/import",
      data,
    ),
};
