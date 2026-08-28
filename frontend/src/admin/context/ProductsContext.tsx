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
import menSweater from "../../web/assets/category-men.png";
import menScarfMain from "../../web/assets/men.png";
import menScarfForest from "../../web/assets/quni-shawl-men.jpg";

const initialProducts: Product[] = [
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
    price: "$140.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
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
    price: "$190.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
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
    price: "$130.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
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
    price: "$149.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
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
    price: "$190.00",
    stock: "145",
    sold: "512",
    revenue: "$18,450",
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
    price: "$500.00",
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
    id: "seed-5c",
    name: "Sayri Shawl",
    sku: "SH-004",
    category: "Women",
    subcategory: "Shawls / Scarfs",
    group: "Accessories",
    section: "Shawls",
    price: "$160.00",
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
    group: "Ready to Wear",
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
    group: "Ready to Wear",
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
    group: "Ready to Wear",
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
    group: "Ready to Wear",
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
  {
    id: "seed-men-1",
    name: "Cable Knit Sweater",
    sku: "MW-001",
    category: "Men",
    subcategory: "Sweaters",
    group: "Ready to Wear",
    images: [{ id: "seed-men-1-img-1", url: menSweater }],
    price: "$210.00",
    stock: "90",
    sold: "180",
    revenue: "$37,800",
    status: "Active",
    collection: "Baby Alpaca",
    composition: "100% Baby Alpaca",
    weight: "420 g",
    origin: "Made in Peru",
    fiber: "Alpaca",
    colors: ["Stone Grey"],
    description:
      "A cable-knit sweater in soft baby alpaca, cut for a relaxed, everyday fit. Understated texture meets quiet warmth.",
  },
  {
    id: "seed-men-2",
    name: "Ñahua Scarf",
    sku: "MS-001",
    category: "Men",
    subcategory: "Scarves",
    group: "Accessories",
    images: [
      { id: "seed-men-2-img-1", url: menScarfMain },
      { id: "seed-men-2-img-2", url: menScarfForest },
    ],
    price: "$140.00",
    stock: "130",
    sold: "240",
    revenue: "$33,600",
    status: "Active",
    collection: "Baby Alpaca",
    composition: "100% Baby Alpaca",
    weight: "180 g",
    dimensions: "180 x 30 cm",
    origin: "Made in Peru",
    fiber: "Alpaca",
    colors: ["Camel"],
    description:
      "Essential forms, elevated by exceptional fibre. A finely woven scarf in pure baby alpaca, understated and built to last.",
  },
];

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
