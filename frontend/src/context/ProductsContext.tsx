import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { ProductRow } from "../types/product";

const initialProducts: ProductRow[] = [
  {
    name: "Linen Shirt",
    sku: "LS-001",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    price: "$89.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
    status: "Active",
  },
  {
    name: "Linen Shirt",
    sku: "LS-001",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    price: "$89.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
    status: "Active",
  },
  {
    name: "Linen Shirt",
    sku: "LS-001",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    price: "$89.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
    status: "Active",
  },
  {
    name: "Linen Shirt",
    sku: "LS-001",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    price: "$89.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
    status: "Active",
  },
  {
    name: "Linen Shirt",
    sku: "LS-001",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    price: "$89.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
    status: "Active",
  },
];

type ProductsContextValue = {
  products: ProductRow[];
  addProduct: (product: ProductRow) => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ProductRow[]>(initialProducts);

  const value = useMemo(
    () => ({
      products,
      addProduct: (product: ProductRow) =>
        setProducts((prev) => [product, ...prev]),
    }),
    [products],
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within a ProductsProvider");
  return ctx;
}
