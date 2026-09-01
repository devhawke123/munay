import type { Product } from "../../admin/types/product";
import { slugify } from "./slug";

function belongsTo(product: Product, category: string): boolean {
  return product.categories.some((c) => c.mainCategory === category);
}

function belongsToSubcategory(product: Product, category: string, subcategory: string): boolean {
  return product.categories.some((c) => c.mainCategory === category && c.subcategory === subcategory);
}

export function getCategories(products: Product[]): string[] {
  return Array.from(new Set(products.flatMap((p) => p.categories.map((c) => c.mainCategory))));
}

export function getSubcategories(products: Product[], category: string): string[] {
  return Array.from(
    new Set(
      products
        .flatMap((p) => p.categories)
        .filter((c) => c.mainCategory === category)
        .map((c) => c.subcategory),
    ),
  );
}

const UNGROUPED = "More";

export function getGroups(products: Product[], category: string): string[] {
  return Array.from(
    new Set(
      products
        .flatMap((p) => p.categories)
        .filter((c) => c.mainCategory === category)
        .map((c) => c.group || UNGROUPED),
    ),
  );
}

export function getSubcategoriesByGroup(
  products: Product[],
  category: string,
  group: string,
): string[] {
  return Array.from(
    new Set(
      products
        .flatMap((p) => p.categories)
        .filter((c) => c.mainCategory === category && (c.group || UNGROUPED) === group)
        .map((c) => c.subcategory),
    ),
  );
}

export function getProductsBySubcategory(
  products: Product[],
  category: string,
  subcategory: string,
): Product[] {
  return products.filter((p) => belongsToSubcategory(p, category, subcategory));
}

export function getSections(products: Product[], category: string, subcategory: string): string[] {
  const items = getProductsBySubcategory(products, category, subcategory);
  return Array.from(new Set(items.filter((p) => p.section).map((p) => p.section as string)));
}

export function getProductsBySection(
  products: Product[],
  category: string,
  subcategory: string,
  section: string,
): Product[] {
  return getProductsBySubcategory(products, category, subcategory).filter(
    (p) => p.section === section,
  );
}

export function getProduct(products: Product[], id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(products: Product[], product: Product, limit = 3): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        product.categories.some((c) => belongsToSubcategory(p, c.mainCategory, c.subcategory)),
    )
    .slice(0, limit);
}

export function findCategoryBySlug(products: Product[], slug: string): string | undefined {
  return getCategories(products).find((category) => slugify(category) === slug);
}

export function findSubcategoryBySlug(
  products: Product[],
  category: string,
  slug: string,
): string | undefined {
  return getSubcategories(products, category).find((sub) => slugify(sub) === slug);
}

export { belongsTo, belongsToSubcategory };
