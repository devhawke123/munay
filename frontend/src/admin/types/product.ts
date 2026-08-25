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

export function draftToProduct(draft: ProductDraft, existing?: Product): Product {
  const totalStock = Object.values(draft.stockByVariant).reduce(
    (sum, qty) => sum + (Number(qty) || 0),
    0,
  );
  const price = Number(draft.price) || 0;

  return {
    id: existing?.id ?? crypto.randomUUID(),
    name: draft.name,
    sku: draft.sku,
    category: draft.mainCategory,
    subcategory: draft.subcategory,
    group: draft.group || undefined,
    section: draft.section || undefined,
    price: `$${price.toFixed(2)}`,
    stock: String(totalStock),
    sold: existing?.sold ?? "0",
    revenue: existing?.revenue ?? "$0",
    status: existing?.status ?? "Active",
    description: draft.description,
    images: draft.images,
    composition: draft.composition,
    weight: draft.weight,
    dimensions: draft.dimensions,
    origin: draft.origin,
    collection: draft.brand,
    colors: draft.colors,
    sizes: draft.sizes,
    rating: existing?.rating ?? 4.8,
  };
}
