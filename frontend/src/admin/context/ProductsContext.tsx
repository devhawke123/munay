import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../types/product";
import scarfPachakuti from "../../web/assets/women-subcategories/scarfsshawls/scarf-pachakuti-red-300x375.jpg.png";
import scarfQuri from "../../web/assets/women-subcategories/scarfsshawls/scarf-quri-grey-300x375.jpg.png";
import scarfYachay from "../../web/assets/women-subcategories/scarfsshawls/scarf-yachay-coral-pink.png.png";
import shawlQuni from "../../web/assets/women-subcategories/scarfsshawls/shawl-quni-gray-300x375.jpg.png";
import shawlSinchi from "../../web/assets/women-subcategories/scarfsshawls/shawl-sinchi-fuchsia-300x375.jpg.png";
import shawlSumaq from "../../web/assets/women-subcategories/scarfsshawls/shawl-sumaq-lilac-300x375.jpg.png";

const initialProducts: Product[] = [
  {
    id: "seed-1",
    name: "Pachakuti Scarf",
    sku: "SC-001",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    group: "Accessories",
    section: "Scarfs",
    images: [{ id: "seed-1-img-1", url: scarfPachakuti }],
    price: "$140.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
    status: "Active",
  },
  {
    id: "seed-2",
    name: "Quri Scarf",
    sku: "SC-002",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    group: "Accessories",
    section: "Scarfs",
    images: [{ id: "seed-2-img-1", url: scarfQuri }],
    price: "$130.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
    status: "Active",
  },
  {
    id: "seed-3",
    name: "Yachay Scarf",
    sku: "SC-003",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    group: "Accessories",
    section: "Scarfs",
    images: [{ id: "seed-3-img-1", url: scarfYachay }],
    price: "$210.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
    status: "Active",
  },
  {
    id: "seed-4",
    name: "Q'uñi Shawl",
    sku: "SH-001",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    group: "Accessories",
    section: "Shawls",
    images: [{ id: "seed-4-img-1", url: shawlQuni }],
    price: "$190.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
    status: "Active",
  },
  {
    id: "seed-5",
    name: "Sinchi Shawl",
    sku: "SH-002",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    group: "Accessories",
    section: "Shawls",
    images: [{ id: "seed-5-img-1", url: shawlSinchi }],
    price: "$190.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
    status: "Active",
  },
  {
    id: "seed-5b",
    name: "Sumaq Shawl",
    sku: "SH-003",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    group: "Accessories",
    section: "Shawls",
    images: [{ id: "seed-5b-img-1", url: shawlSumaq }],
    price: "$170.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
    status: "Active",
  },
  {
    id: "seed-6",
    name: "Soft Pullover",
    sku: "PL-001",
    category: "Women",
    subcategory: "Pullovers",
    group: "Knitwears",
    price: "$210.00",
    stock: "80",
    sold: "220",
    revenue: "$46,200",
    status: "Active",
  },
  {
    id: "seed-7",
    name: "Cream Cardigan",
    sku: "CG-001",
    category: "Women",
    subcategory: "Cardigans",
    group: "Knitwears",
    price: "$240.00",
    stock: "60",
    sold: "175",
    revenue: "$42,000",
    status: "Active",
  },
  {
    id: "seed-8",
    name: "Alpaca Coat",
    sku: "CT-001",
    category: "Women",
    subcategory: "Coats",
    group: "Outerwear's",
    price: "$480.00",
    stock: "35",
    sold: "90",
    revenue: "$43,200",
    status: "Active",
  },
  {
    id: "seed-9",
    name: "Wool Cape",
    sku: "CP-001",
    category: "Women",
    subcategory: "Capes",
    group: "Outerwear's",
    price: "$320.00",
    stock: "42",
    sold: "60",
    revenue: "$19,200",
    status: "Active",
  },
  {
    id: "seed-10",
    name: "Knit Beanie",
    sku: "HW-001",
    category: "Women",
    subcategory: "Headwears",
    group: "Accessories",
    price: "$95.00",
    stock: "120",
    sold: "310",
    revenue: "$29,450",
    status: "Active",
  },
  {
    id: "seed-11",
    name: "Alpaca Mittens",
    sku: "GM-001",
    category: "Women",
    subcategory: "Gloves & Mittens",
    group: "Accessories",
    price: "$70.00",
    stock: "150",
    sold: "260",
    revenue: "$18,200",
    status: "Active",
  },
  {
    id: "seed-12",
    name: "Alpaca Snood",
    sku: "SH-001",
    category: "Women",
    subcategory: "Snoods & Hoods",
    group: "Accessories",
    price: "$110.00",
    stock: "70",
    sold: "140",
    revenue: "$15,400",
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
