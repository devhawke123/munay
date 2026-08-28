import { useMemo } from "react";
import { api } from "../lib/api";
import { useApiResource } from "./useApiResource";
import type { ApiSalesChannel } from "./useOrdersApi";

export type ApiGranularity = "daily" | "weekly" | "monthly" | "yearly";

export interface SalesDateFilters {
  channel?: ApiSalesChannel;
  start?: string;
  end?: string;
}

function buildQuery<T extends object>(filters: T) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined) search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

export interface ApiSalesSummary {
  revenue: number;
  orderCount: number;
  avgOrderValue: number;
}

/** GET /api/admin/sales/summary */
export function useSalesSummaryApi(filters: SalesDateFilters = {}) {
  const path = useMemo(() => `/sales/summary${buildQuery(filters)}`, [filters.channel, filters.start, filters.end]);
  return useApiResource<ApiSalesSummary>(path);
}

export interface ApiRevenuePoint {
  periodStart: string;
  revenue: number;
  orders: number;
}

/** GET /api/admin/sales/revenue-overview */
export function useRevenueOverviewApi(filters: SalesDateFilters & { granularity?: ApiGranularity } = {}) {
  const path = useMemo(
    () => `/sales/revenue-overview${buildQuery(filters)}`,
    [filters.channel, filters.start, filters.end, filters.granularity],
  );
  return useApiResource<ApiRevenuePoint[]>(path);
}

export interface ApiChannelBreakdownRow {
  channel: ApiSalesChannel;
  revenue: number;
  percent: number;
}

/** GET /api/admin/sales/channel-breakdown */
export function useChannelBreakdownApi(filters: Pick<SalesDateFilters, "start" | "end"> = {}) {
  const path = useMemo(() => `/sales/channel-breakdown${buildQuery(filters)}`, [filters.start, filters.end]);
  return useApiResource<ApiChannelBreakdownRow[]>(path);
}

export interface ApiTopProductRow {
  rank: number;
  name: string;
  revenue: number;
  units: number;
  share: number;
  growthPercent: number | null;
}

/** GET /api/admin/sales/top-products */
export function useTopProductsApi(filters: Pick<SalesDateFilters, "start" | "end"> & { limit?: number } = {}) {
  const path = useMemo(() => `/sales/top-products${buildQuery(filters)}`, [filters.start, filters.end, filters.limit]);
  return useApiResource<ApiTopProductRow[]>(path);
}

export interface ApiStoreSalesRow {
  store: string;
  transactions: number;
  revenue: number;
  avgOrderValue: number;
  share: number;
}

/** GET /api/admin/sales/by-store */
export function useSalesByStoreApi(filters: Pick<SalesDateFilters, "start" | "end"> = {}) {
  const path = useMemo(() => `/sales/by-store${buildQuery(filters)}`, [filters.start, filters.end]);
  return useApiResource<ApiStoreSalesRow[]>(path);
}

export interface ApiInStoreImportSummary {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicateRows: number;
  dateRangeStart: string | null;
  dateRangeEnd: string | null;
  storeCount: number;
  totalSalesAmount: number;
  rows: { rowIndex: number; isValid: boolean; isDuplicate: boolean; errors: string[] }[];
}

export const salesApi = {
  importInStoreSales: (csv: string) =>
    api.post<ApiInStoreImportSummary>("/sales/in-store/import", { csv }),
};
