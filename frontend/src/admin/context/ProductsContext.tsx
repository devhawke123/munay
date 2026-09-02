import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useProductsApi } from "../hooks/useProductsApi";
import { apiProductToProduct, type Product } from "../types/product";

type ProductsContextValue = {
  products: Product[];
  loading: boolean;
  error: Error | null;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const { data, loading, error } = useProductsApi({ status: "ACTIVE" });

  const value = useMemo(
    () => ({
      products: (data ?? []).map(apiProductToProduct),
      loading,
      error,
    }),
    [data, loading, error],
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within a ProductsProvider");
  return ctx;
}
