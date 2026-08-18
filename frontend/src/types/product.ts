export type ProductImage = {
  id: string;
  url: string;
};

export type ProductDraft = {
  name: string;
  description: string;
  mainCategory: string;
  subcategory: string;
  brand: string;
  composition: string;
  weight: string;
  dimensions: string;
  origin: string;
  tags: string[];
  images: ProductImage[];
  price: string;
  sku: string;
  barcode: string;
  sizes: string[];
  colors: string[];
  stockByVariant: Record<string, string>;
};

export const emptyProductDraft: ProductDraft = {
  name: "",
  description: "",
  mainCategory: "",
  subcategory: "",
  brand: "",
  composition: "",
  weight: "",
  dimensions: "",
  origin: "",
  tags: [],
  images: [],
  price: "",
  sku: "",
  barcode: "",
  sizes: [],
  colors: [],
  stockByVariant: {},
};

export type ProductRow = {
  name: string;
  sku: string;
  category: string;
  subcategory: string;
  price: string;
  stock: string;
  sold: string;
  revenue: string;
  status: string;
};

export function variantKey(color: string, size: string) {
  return `${color}|${size}`;
}

export function draftToRow(draft: ProductDraft): ProductRow {
  const totalStock = Object.values(draft.stockByVariant).reduce(
    (sum, qty) => sum + (Number(qty) || 0),
    0,
  );
  const price = Number(draft.price) || 0;

  return {
    name: draft.name,
    sku: draft.sku,
    category: draft.mainCategory,
    subcategory: draft.subcategory,
    price: `$${price.toFixed(2)}`,
    stock: String(totalStock),
    sold: "0",
    revenue: "$0",
    status: "Active",
  };
}
