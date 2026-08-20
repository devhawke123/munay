import type { Product } from "../../admin/types/product";
import { slugify } from "./slug";

export function getCategories(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.category)));
}

export function getSubcategories(products: Product[], category: string): string[] {
  return Array.from(
    new Set(products.filter((p) => p.category === category).map((p) => p.subcategory)),
  );
}

const UNGROUPED = "More";

export function getGroups(products: Product[], category: string): string[] {
  return Array.from(
    new Set(products.filter((p) => p.category === category).map((p) => p.group || UNGROUPED)),
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
        .filter((p) => p.category === category && (p.group || UNGROUPED) === group)
        .map((p) => p.subcategory),
    ),
  );
}

export function getProductsBySubcategory(
  products: Product[],
  category: string,
  subcategory: string,
): Product[] {
  return products.filter((p) => p.category === category && p.subcategory === subcategory);
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
        p.category === product.category &&
        p.subcategory === product.subcategory,
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
