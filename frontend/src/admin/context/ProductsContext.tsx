import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../types/product";
import scarfPachakutiMain from "../../web/assets/women-subcategories/scarfsshawls/pachakuti-figma-main.png";
import scarfPachakutiThumb2 from "../../web/assets/women-subcategories/scarfsshawls/pachakuti-figma-thumb2.png";
import scarfPachakutiModel from "../../web/assets/women-subcategories/scarfsshawls/pachakuti-figma-model.png";
import scarfQuri from "../../web/assets/women-subcategories/scarfsshawls/scarf-quri-grey-300x375.jpg.png";
import scarfYachay from "../../web/assets/women-subcategories/scarfsshawls/scarf-yachay-coral-pink.png.png";
import scarfTikayMain from "../../web/assets/women-subcategories/scarfsshawls/tikay-main.png";
import scarfTikayDraped from "../../web/assets/women-subcategories/scarfsshawls/tikay-draped.png";
import scarfTikayModel from "../../web/assets/women-subcategories/scarfsshawls/tikay-model.png";
import scarfLianpu from "../../web/assets/women-subcategories/scarfsshawls/38.png";
import scarfTinkuy from "../../web/assets/women-subcategories/scarfsshawls/177.png";
import scarfTawa from "../../web/assets/women-subcategories/scarfsshawls/111.png";
import shawlQuni from "../../web/assets/women-subcategories/scarfsshawls/shawl-quni-gray-300x375.jpg.png";
import shawlSinchi from "../../web/assets/women-subcategories/scarfsshawls/shawl-sinchi-fuchsia-300x375.jpg.png";
import shawlSumaq from "../../web/assets/women-subcategories/scarfsshawls/shawl-sumaq-lilac-300x375.jpg.png";

// This mock list predates `categories`/`categorySummary` (each item only ever had one
// category), so those two fields are derived below rather than repeated on every entry.
type LegacyProductSeed = Omit<Product, "categories" | "categorySummary">;

const rawInitialProducts: LegacyProductSeed[] = [
  {
    id: "seed-1",
    name: "Pachakuti Scarf",
    sku: "SC-001",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    group: "Accessories",
    section: "Scarfs",
    images: [
      { id: "seed-1-img-1", url: scarfPachakutiMain },
      { id: "seed-1-img-2", url: scarfPachakutiThumb2 },
      { id: "seed-1-img-3", url: scarfPachakutiModel },
    ],
    price: "CHF 140.00",
    stock: "145",
    sold: "512",
    revenue: "CHF 18,450",
    status: "Active",
    collection: "Baby Alpaca & Silk",
    composition: "70% Baby Alpaca 30% Silk",
    weight: "130 g",
    dimensions: "180 x 30 cm",
    origin: "Made in Peru",
    fiber: "Alpaca",
    colors: ["Fuchsia & Blue", "Coral & Red", "Stone Gray"],
    description:
      "PACHAKUTI takes its name from the Quechua word for transformation, a scarf woven to move easily between seasons and settings. Cut long and finished with a soft fringe, it drapes with the same easy elegance whether folded at the collar or wrapped as a wrap.",
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
    price: "CHF 130.00",
    stock: "145",
    sold: "512",
    revenue: "CHF 18,450",
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
    price: "CHF 210.00",
    stock: "145",
    sold: "512",
    revenue: "CHF 18,450",
    status: "Active",
  },
  {
    id: "seed-3b",
    name: "Scarf T'ikay",
    sku: "SC-004",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    group: "Accessories",
    section: "Scarfs",
    images: [
      { id: "seed-3b-img-1", url: scarfTikayMain },
      { id: "seed-3b-img-2", url: scarfTikayModel },
      { id: "seed-3b-img-3", url: scarfTikayDraped },
      { id: "seed-3b-img-4", url: scarfTikayDraped },
    ],
    price: "CHF 190.00",
    stock: "145",
    sold: "512",
    revenue: "CHF 18,450",
    status: "Active",
    collection: "Baby Alpaca & Silk",
    composition: "70% Baby Alpaca 30% Silk",
    weight: "100 g",
    dimensions: "180 x 30 cm",
    origin: "Peru",
    fiber: "Alpaca",
    colors: ["Fuchsia & Blue", "Coral & Red", "Stone Gray"],
    description:
      "There's a certain kind of luxury that doesn't shout, it whispers. T'IKAY is that quiet elegance.\n\n" +
      "• Exquisite blend of baby alpaca and silk for a refined finish\n" +
      "• Meticulously crafted with an obsessive attention to detail\n" +
      "• Infused with a subtle allure and captivating charm\n" +
      "• Named after the Quechua word for \"to blossom\" or \"to flower\"\n\n" +
      "A timeless statement piece that exudes sophistication from every angle.\n\n" +
      "It's the kind of piece you will reach for again and again—draped over your shoulders to elevate a casual ensemble, or styled with effortless finesse as the perfect accessory for a formal evening out.",
  },
  {
    id: "seed-3c",
    name: "Lianpu Scarf",
    sku: "SC-005",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    group: "Accessories",
    section: "Scarfs",
    images: [{ id: "seed-3c-img-1", url: scarfLianpu }],
    price: "CHF 130.00",
    stock: "145",
    sold: "512",
    revenue: "CHF 18,450",
    status: "Active",
  },
  {
    id: "seed-3d",
    name: "Tinkuy Scarf",
    sku: "SC-006",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    group: "Accessories",
    section: "Scarfs",
    images: [{ id: "seed-3d-img-1", url: scarfTinkuy }],
    price: "CHF 149.00",
    stock: "145",
    sold: "512",
    revenue: "CHF 18,450",
    status: "Active",
  },
  {
    id: "seed-3e",
    name: "Tawa Scarf",
    sku: "SC-007",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    group: "Accessories",
    section: "Scarfs",
    images: [{ id: "seed-3e-img-1", url: scarfTawa }],
    price: "CHF 190.00",
    stock: "145",
    sold: "512",
    revenue: "CHF 18,450",
    status: "Active",
  },
  {
    id: "seed-3f",
    name: "Ñahua Scarf",
    sku: "SC-008",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    group: "Accessories",
    section: "Scarfs",
    price: "CHF 500.00",
    stock: "145",
    sold: "512",
    revenue: "CHF 18,450",
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
    price: "CHF 190.00",
    stock: "145",
    sold: "512",
    revenue: "CHF 18,450",
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
    price: "CHF 190.00",
    stock: "145",
    sold: "512",
    revenue: "CHF 18,450",
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
    price: "CHF 170.00",
    stock: "145",
    sold: "512",
    revenue: "CHF 18,450",
    status: "Active",
  },
  {
    id: "seed-5c",
    name: "Sayri Shawl",
    sku: "SH-004",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    group: "Accessories",
    section: "Shawls",
    price: "CHF 160.00",
    stock: "145",
    sold: "512",
    revenue: "CHF 18,450",
    status: "Active",
  },
  {
    id: "seed-6",
    name: "Soft Pullover",
    sku: "PL-001",
    category: "Women",
    subcategory: "Pullovers",
    group: "Ready to Wear",
    price: "CHF 210.00",
    stock: "80",
    sold: "220",
    revenue: "CHF 46,200",
    status: "Active",
  },
  {
    id: "seed-7",
    name: "Cream Cardigan",
    sku: "CG-001",
    category: "Women",
    subcategory: "Cardigans",
    group: "Ready to Wear",
    price: "CHF 240.00",
    stock: "60",
    sold: "175",
    revenue: "CHF 42,000",
    status: "Active",
  },
  {
    id: "seed-8",
    name: "Alpaca Coat",
    sku: "CT-001",
    category: "Women",
    subcategory: "Coats",
    group: "Ready to Wear",
    price: "CHF 480.00",
    stock: "35",
    sold: "90",
    revenue: "CHF 43,200",
    status: "Active",
  },
  {
    id: "seed-9",
    name: "Wool Cape",
    sku: "CP-001",
    category: "Women",
    subcategory: "Capes",
    group: "Ready to Wear",
    price: "CHF 320.00",
    stock: "42",
    sold: "60",
    revenue: "CHF 19,200",
    status: "Active",
  },
  {
    id: "seed-10",
    name: "Knit Beanie",
    sku: "HW-001",
    category: "Women",
    subcategory: "Headwears",
    group: "Accessories",
    price: "CHF 95.00",
    stock: "120",
    sold: "310",
    revenue: "CHF 29,450",
    status: "Active",
  },
  {
    id: "seed-11",
    name: "Alpaca Mittens",
    sku: "GM-001",
    category: "Women",
    subcategory: "Gloves & Mittens",
    group: "Accessories",
    price: "CHF 70.00",
    stock: "150",
    sold: "260",
    revenue: "CHF 18,200",
    status: "Active",
  },
  {
    id: "seed-12",
    name: "Alpaca Snood",
    sku: "SH-001",
    category: "Women",
    subcategory: "Snoods & Hoods",
    group: "Accessories",
    price: "CHF 110.00",
    stock: "70",
    sold: "140",
    revenue: "CHF 15,400",
    status: "Active",
  },
];

const initialProducts: Product[] = rawInitialProducts.map((p) => ({
  ...p,
  categories: [{ mainCategory: p.category, subcategory: p.subcategory, group: p.group }],
  categorySummary: `${p.category} / ${p.subcategory}`,
}));

type ProductsContextValue = {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const value = useMemo(
    () => ({
      products,
      addProduct: (product: Product) => setProducts((prev) => [product, ...prev]),
      updateProduct: (updated: Product) =>
        setProducts((prev) => prev.map((product) => (product.id === updated.id ? updated : product))),
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
