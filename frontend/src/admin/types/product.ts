export type ProductImage = {
  id: string;
  url: string;
};

export type ProductDraft = {
  name: string;
  description: string;
  mainCategory: string;
  subcategory: string;
  // Cross-lists this product under the other gender's identically-named subcategory
  // (Women <-> Men only — Home never cross-lists). See ProductWizard's handlePublish.
  alsoListUnderOtherGender: boolean;
  group: string;
  section: string;
  brand: string;
  composition: string;
  weight: string;
  dimensions: string;
  origin: string;
  fiber: string;
  careInstructions: string;
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
  alsoListUnderOtherGender: false,
  group: "",
  section: "",
  brand: "",
  composition: "",
  weight: "",
  dimensions: "",
  origin: "",
  fiber: "",
  careInstructions: "",
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

  // No membership is "primary" (see backend products.service.ts's formatCategory) — every
  // subcategory a product belongs to is an equal peer. `categories` is the source of truth for
  // storefront routing/matching (catalog.ts) and admin filtering; `category`/`subcategory`
  // (singular) are a first-membership convenience for dense display contexts that only have
  // room for one line (SKU cell, inventory row) — not for matching logic.
  const categories = api.subcategories.map((ps) => ({
    mainCategory: MAIN_CATEGORY_LABEL[ps.subcategory.mainCategory] ?? ps.subcategory.mainCategory,
    subcategory: ps.subcategory.name,
    group: ps.subcategory.group ?? undefined,
  }));
  const primary = categories[0];

  return {
    id: api.id,
    name: api.name,
    sku: api.sku,
    categories,
    categorySummary: api.category,
    category: primary?.mainCategory ?? "",
    subcategory: primary?.subcategory ?? "",
    group: primary?.group,
    section: api.section ?? undefined,
    price: `CHF ${Number(api.price).toFixed(2)}`,
    stock: String(api.stock),
    stockStatus: api.stockStatus,
    sold: String(api.sold),
    revenue: `CHF ${Math.round(api.revenue).toLocaleString("en-US")}`,
    status: PRODUCT_STATUS_LABEL[api.status] ?? api.status,
    description: api.description ?? undefined,
    images: api.images.map((img) => ({ id: img.id, url: img.path })),
    composition: api.composition ?? undefined,
    weight: api.weight ?? undefined,
    dimensions: api.dimensions ?? undefined,
    origin: api.origin ?? undefined,
    fiber: api.fiber ?? undefined,
    careInstructions: api.careInstructions ?? undefined,
    collection: api.brand ?? undefined,
    colors,
    sizes,
    variantStocks: api.variants.map((v) => ({
      id: v.id,
      sku: v.sku,
      color: v.color,
      size: v.size,
      price: `CHF ${Number(v.price).toFixed(2)}`,
      qty: v.inventory.reduce((sum, row) => sum + row.quantityOnHand, 0),
      status: PRODUCT_STATUS_LABEL[v.status] ?? v.status,
    })),
  };
}

export type Product = {
  id: string;
  name: string;
  sku: string;
  // Every category/subcategory this product belongs to — a product can belong to more than one
  // (e.g. a unisex item cross-listed under both Women and Men). Source of truth for storefront
  // routing/matching and admin category filtering.
  categories: { mainCategory: string; subcategory: string; group?: string }[];
  // Pre-formatted display string covering every membership, e.g. "Women & Men / Pullovers" —
  // use this (not category/subcategory below) anywhere the full membership set should be shown.
  categorySummary: string;
  // First-membership convenience for dense single-line display contexts. Not for matching —
  // use `categories` for that.
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
  // Server-computed; unset for storefront mock rows that don't carry warehouse inventory.
  stockStatus?: import("../hooks/useProductsApi").ApiStockStatus;
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
  careInstructions?: string;
  collection?: string;
  colors?: string[];
  sizes?: string[];
  rating?: number;
  // Each variant's real on-hand quantity (summed across warehouses), straight from
  // Inventory — not a synthesized even split of the product-level `stock` total.
  variantStocks?: {
    id: string;
    sku: string;
    color: string;
    size: string;
    price: string;
    qty: number;
    status: string;
  }[];
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

  // The checkbox reflects whether a second, other-gender membership with the same
  // subcategory name currently exists alongside the primary (first) one.
  const alsoListUnderOtherGender = product.categories
    .slice(1)
    .some((c) => c.mainCategory !== product.category && c.subcategory === product.subcategory);

  return {
    name: product.name,
    description: product.description ?? "",
    mainCategory: product.category,
    subcategory: product.subcategory,
    alsoListUnderOtherGender,
    group: product.group ?? "",
    section: product.section ?? "",
    brand: product.collection ?? "",
    composition: product.composition ?? "",
    weight: product.weight ?? "",
    dimensions: product.dimensions ?? "",
    origin: product.origin ?? "",
    fiber: product.fiber ?? "",
    careInstructions: product.careInstructions ?? "",
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
