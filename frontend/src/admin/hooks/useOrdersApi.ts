import { useMemo } from "react";
import { api } from "../lib/api";
import { useApiResource } from "./useApiResource";

export type ApiOrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
export type ApiSalesChannel = "ONLINE" | "IN_STORE";
export type ApiCarrier = "DHL" | "DPD" | "LA_POSTE";

export interface ApiOrderItem {
  id: string;
  sku: string;
  productName: string;
  variantLabel: string | null;
  unitPrice: string;
  quantity: number;
  lineTotal: string;
}

export interface ApiOrderSummary {
  id: string;
  orderNumber: number;
  status: ApiOrderStatus;
  channel: ApiSalesChannel;
  storeLocation: string | null;
  subtotal: string;
  shippingCost: string;
  tax: string;
  total: string;
  createdAt: string;
  customer: { id: string; name: string; email: string } | null;
  items: ApiOrderItem[];
  products: string;
}

export interface ApiOrderTimelineStep {
  label: string;
  status: ApiOrderStatus;
  occurredAt: string;
}

export interface ApiOrderDetail extends Omit<ApiOrderSummary, "items"> {
  items: ApiOrderItem[];
  carrier: ApiCarrier | null;
  trackingId: string | null;
  shippingFullName: string | null;
  shippingLine1: string | null;
  shippingLine2: string | null;
  shippingCity: string | null;
  shippingState: string | null;
  shippingPostalCode: string | null;
  shippingCountry: string | null;
  timeline: ApiOrderTimelineStep[];
}

export interface OrderListFilters {
  channel?: ApiSalesChannel;
  status?: ApiOrderStatus;
  search?: string;
}

/** GET /api/admin/orders */
export function useOrdersApi(filters: OrderListFilters = {}) {
  const path = useMemo(() => {
    const search = new URLSearchParams();
    if (filters.channel) search.set("channel", filters.channel);
    if (filters.status) search.set("status", filters.status);
    if (filters.search) search.set("search", filters.search);
    const query = search.toString();
    return `/orders${query ? `?${query}` : ""}`;
  }, [filters.channel, filters.status, filters.search]);

  return useApiResource<ApiOrderSummary[]>(path);
}

/** GET /api/admin/orders/:id */
export function useOrderApi(id: string | null) {
  return useApiResource<ApiOrderDetail>(id ? `/orders/${id}` : null);
}

export const ordersApi = {
  updateStatus: (id: string, status: ApiOrderStatus) =>
    api.patch<ApiOrderDetail>(`/orders/${id}/status`, { status }),
  updateShipping: (id: string, data: { carrier?: ApiCarrier; trackingId?: string }) =>
    api.patch<ApiOrderDetail>(`/orders/${id}/shipping`, data),
};
