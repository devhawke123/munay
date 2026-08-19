import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../types/product";

const initialProducts: Product[] = [
  {
    id: "seed-1",
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
    id: "seed-2",
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
    id: "seed-3",
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
    id: "seed-4",
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
    id: "seed-5",
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
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const value = useMemo(
    () => ({
      products,
      addProduct: (product: Product) => setProducts((prev) => [product, ...prev]),
      removeProduct: (id: string) =>
        setProducts((prev) => prev.filter((product) => product.id !== id)),
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
