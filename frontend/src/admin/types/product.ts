export type ProductImage = {
  id: string;
  url: string;
};

export type ProductDraft = {
  name: string;
  description: string;
  mainCategory: string;
  subcategory: string;
  group: string;
  section: string;
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
  group: "",
  section: "",
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

const MAIN_CATEGORY_LABEL: Record<string, string> = { MEN: "Men", WOMEN: "Women", HOME: "Home" };
const PRODUCT_STATUS_LABEL: Record<string, string> = { ACTIVE: "Active", DRAFT: "Draft", ARCHIVED: "Archived" };

export function apiProductToProduct(api: import("../hooks/useProductsApi").ApiProductSummary): Product {
  const colors = [...new Set(api.variants.map((v) => v.color).filter((c) => c !== "Default"))];
  const sizes = [...new Set(api.variants.map((v) => v.size).filter((s) => s !== "One Size"))];

  return {
    id: api.id,
    name: api.name,
    sku: api.sku,
    category: MAIN_CATEGORY_LABEL[api.subcategory.mainCategory] ?? api.subcategory.mainCategory,
    subcategory: api.subcategory.name,
    group: api.subcategory.group ?? undefined,
    section: api.section ?? undefined,
    price: `$${Number(api.price).toFixed(2)}`,
    stock: String(api.stock),
    sold: String(api.sold),
    revenue: `$${Math.round(api.revenue).toLocaleString("en-US")}`,
    status: PRODUCT_STATUS_LABEL[api.status] ?? api.status,
    description: api.description ?? undefined,
    images: api.images.map((img) => ({ id: img.id, url: img.path })),
    composition: api.composition ?? undefined,
    weight: api.weight ?? undefined,
    dimensions: api.dimensions ?? undefined,
    origin: api.origin ?? undefined,
    collection: api.brand ?? undefined,
    colors,
    sizes,
  };
}

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  subcategory: string;
  // Groups subcategories under a heading on the public category page (e.g.
  // "Knitwears" containing "Pullovers"/"Cardigans"). Falls back to "More"
  // when unset, so older rows without a group still render.
  group?: string;
  // Splits a subcategory's product listing page into headed sub-sections
  // (e.g. "Shawls / Scarfs" showing separate "Scarfs" and "Shawls" grids).
  // Left unset, the listing page renders one flat grid.
  section?: string;
  price: string;
  stock: string;
  sold: string;
  revenue: string;
  status: string;
  // Detail-page-only fields — undefined for seed rows created before the
  // product detail page existed, so the detail page falls back to "—".
  description?: string;
  images?: ProductImage[];
  composition?: string;
  weight?: string;
  dimensions?: string;
  origin?: string;
  fiber?: string;
  collection?: string;
  colors?: string[];
  sizes?: string[];
  rating?: number;
};

export function variantKey(color: string, size: string) {
  return `${color}|${size}`;
}

export function productToDraft(product: Product): ProductDraft {
  const sizes = product.sizes ?? [];
  const colors = product.colors ?? [];
  const stockByVariant: Record<string, string> = {};
  const perVariantStock = colors.length && sizes.length
    ? String(Math.round((Number(product.stock) || 0) / (colors.length * sizes.length)))
    : product.stock;
  colors.forEach((color) => {
    sizes.forEach((size) => {
      stockByVariant[variantKey(color, size)] = perVariantStock;
    });
  });

  return {
    name: product.name,
    description: product.description ?? "",
    mainCategory: product.category,
    subcategory: product.subcategory,
    group: product.group ?? "",
    section: product.section ?? "",
    brand: product.collection ?? "",
    composition: product.composition ?? "",
    weight: product.weight ?? "",
    dimensions: product.dimensions ?? "",
    origin: product.origin ?? "",
    tags: [],
    images: product.images ?? [],
    price: product.price.replace(/[^0-9.]/g, ""),
    sku: product.sku,
    barcode: "",
    sizes,
    colors,
    stockByVariant,
  };
}
