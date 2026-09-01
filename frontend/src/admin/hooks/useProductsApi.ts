import { useMemo } from "react";
import { api } from "../lib/api";
import { useApiResource } from "./useApiResource";

export type ApiProductStatus = "ACTIVE" | "ARCHIVED" | "DRAFT";
export type ApiStockStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
export type ApiMainCategory = "MEN" | "WOMEN" | "HOME";

export interface ApiProductImage {
  id: string;
  path: string;
  isMain: boolean;
  sortOrder: number;
}

export interface ApiProductVariantInventory {
  variantId: string;
  warehouseId: string;
  quantityOnHand: number;
  quantityReserved: number;
  reorderPoint: number;
}

export interface ApiProductVariant {
  id: string;
  sku: string;
  color: string;
  size: string;
  price: string;
  compareAtPrice: string | null;
  status: ApiProductStatus;
  inventory: ApiProductVariantInventory[];
}

export interface ApiSubcategory {
  id: string;
  mainCategory: ApiMainCategory;
  name: string;
  group: string | null;
}

export interface ApiProductSummary {
  id: string;
  name: string;
  sku: string;
  description: string | null;
  subcategoryId: string;
  section: string | null;
  price: string;
  barcode: string | null;
  brand: string | null;
  composition: string | null;
  weight: string | null;
  dimensions: string | null;
  origin: string | null;
  fiber: string | null;
  careInstructions: string | null;
  tags: string[] | null;
  category: string;
  stock: number;
  stockStatus: ApiStockStatus;
  sold: number;
  revenue: number;
  status: ApiProductStatus;
  images: ApiProductImage[];
  variants: ApiProductVariant[];
  subcategory: ApiSubcategory;
}

export interface ProductListFilters {
  mainCategory?: ApiMainCategory;
  subcategoryId?: string;
  status?: ApiProductStatus;
  stockStatus?: ApiStockStatus;
  search?: string;
}

/** GET /api/admin/products */
export function useProductsApi(filters: ProductListFilters = {}) {
  const path = useMemo(() => {
    const search = new URLSearchParams();
    if (filters.mainCategory) search.set("mainCategory", filters.mainCategory);
    if (filters.subcategoryId) search.set("subcategoryId", filters.subcategoryId);
    if (filters.status) search.set("status", filters.status);
    if (filters.stockStatus) search.set("stockStatus", filters.stockStatus);
    if (filters.search) search.set("search", filters.search);
    const query = search.toString();
    return `/products${query ? `?${query}` : ""}`;
  }, [filters.mainCategory, filters.subcategoryId, filters.status, filters.stockStatus, filters.search]);

  return useApiResource<ApiProductSummary[]>(path);
}

/** GET /api/admin/products/:id */
export function useProductApi(id: string | null) {
  return useApiResource<ApiProductSummary>(id ? `/products/${id}` : null);
}

export interface ProductImageInput {
  path: string;
  isMain?: boolean;
  sortOrder?: number;
}

export interface ProductVariantStockInput {
  color: string;
  size: string;
  quantityOnHand: number;
}

export interface ProductWriteInput {
  name: string;
  description?: string;
  subcategoryId: string;
  section?: string;
  price: number;
  sku: string;
  barcode?: string;
  brand?: string;
  composition?: string;
  weight?: string;
  dimensions?: string;
  origin?: string;
  fiber?: string;
  careInstructions?: string;
  tags?: string[];
  status?: ApiProductStatus;
  images?: ProductImageInput[];
  stock?: ProductVariantStockInput[];
  warehouseId?: string;
}

export const productsApi = {
  create: (data: ProductWriteInput) => api.post<ApiProductSummary>("/products", data),
  update: (id: string, data: Partial<ProductWriteInput>) => api.patch<ApiProductSummary>(`/products/${id}`, data),
  remove: (id: string) => api.delete<void>(`/products/${id}`),
};
