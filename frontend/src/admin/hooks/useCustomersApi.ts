import { useMemo } from "react";
import { api } from "../lib/api";
import { useApiResource } from "./useApiResource";
import type { ApiOrderSummary } from "./useOrdersApi";

export interface ApiCustomerSummary {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  createdAt: string;
  location: string | null;
}

export interface ApiCustomerDetail extends ApiCustomerSummary {
  lifetimeValue: number;
  totalOrders: number;
  avgOrder: number;
  lastOrderAt: string | null;
  orders: ApiOrderSummary[];
}

/** GET /api/admin/customers */
export function useCustomersApi(search?: string) {
  const path = useMemo(() => (search ? `/customers?search=${encodeURIComponent(search)}` : "/customers"), [search]);
  return useApiResource<ApiCustomerSummary[]>(path);
}

/** GET /api/admin/customers/:id */
export function useCustomerApi(id: string | null) {
  return useApiResource<ApiCustomerDetail>(id ? `/customers/${id}` : null);
}

export interface CustomerWriteInput {
  email: string;
  name: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
}

export const customersApi = {
  create: (data: CustomerWriteInput) => api.post<ApiCustomerSummary>("/customers", data),
  update: (id: string, data: Partial<CustomerWriteInput>) =>
    api.patch<ApiCustomerSummary>(`/customers/${id}`, data),
};
