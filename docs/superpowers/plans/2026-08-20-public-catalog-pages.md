# Public Catalog Pages (Category → Type → Product) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three public storefront page templates — category, product type, and product detail — driven entirely by the existing admin `Product` data, so any category/subcategory the admin creates gets a working page automatically.

**Architecture:** `ProductsContext` (already in the codebase) moves up to wrap the whole app instead of just `/admin/*`. All page reads go through a new `web/lib/catalog.ts` query layer instead of touching `products` directly, so swapping in a real backend later only touches that one file. Three new routes (`/category/:categorySlug`, `/category/:categorySlug/:subcategorySlug`, `/category/:categorySlug/:subcategorySlug/:productId`) render the three new pages, built from small shared components (`CategoryHero`, `ProductCard`, `Newsletter`) plus the existing `PublicHeader`/`Footer`.

**Tech Stack:** React 19, react-router-dom 7, Tailwind CSS v4 (via `@theme` tokens in `web/theme.css`), TypeScript (strict, `noUnusedLocals`/`noUnusedParameters`), Vite. No test runner exists in this repo (`frontend/package.json` has no jest/vitest) — do not add one for this feature. Verification per task is `npx tsc --noEmit` (from `frontend/`) for type safety, plus a manual check in the dev server (`npm run dev`) for visual/behavioral steps, exactly as described in each task.

## Global Constraints

- No new npm dependencies. Everything is buildable with what's already installed (`lucide-react`, `react-router-dom`, Tailwind v4).
- Follow existing token names: `text-ink`, `bg-cream`, `bg-gold`, `font-serif` (Cormorant Garamond), `font-sans` (Inter, default). Do not introduce new ad-hoc hex classes where a token exists.
- All new/edited files must pass `npx tsc --noEmit` (run from `frontend/`) with zero errors — this project's `noUnusedLocals`/`noUnusedParameters` are strict, so remove unused imports as you go.
- Category "group" headings (Knitwear/Outerwear/Accessories) are **out of scope** — flat grids only, per the approved spec.
- Sub-splitting a product-type page's grid by finer tags is **out of scope** — one flat grid per subcategory.
- Add to Cart / color selection is **visual only** — no cart state, no persistence.
- Reuse `web/assets/hero.png` as the one shared placeholder hero image for every category/type page (no per-category hero image field exists).

---

### Task 1: Extend the `Product` type with `colors`/`sizes`

**Files:**
- Modify: `frontend/src/admin/types/product.ts`

**Interfaces:**
- Produces: `Product.colors?: string[]`, `Product.sizes?: string[]` — consumed by the product detail page (Task 11) for color swatches.

- [ ] **Step 1: Add the fields to the `Product` type**

In `frontend/src/admin/types/product.ts`, find the `Product` type (currently ends with `rating?: number;`) and add two fields right after `collection?: string;`:

```ts
export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  subcategory: string;
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
  collection?: string;
  colors?: string[];
  sizes?: string[];
  rating?: number;
};
```

- [ ] **Step 2: Populate the fields when a product is created from the wizard**

In the same file, find `draftToProduct` and add `colors`/`sizes` to the returned object (after `origin: draft.origin,`):

```ts
export function draftToProduct(draft: ProductDraft): Product {
  const totalStock = Object.values(draft.stockByVariant).reduce(
    (sum, qty) => sum + (Number(qty) || 0),
    0,
  );
  const price = Number(draft.price) || 0;

  return {
    id: crypto.randomUUID(),
    name: draft.name,
    sku: draft.sku,
    category: draft.mainCategory,
    subcategory: draft.subcategory,
    price: `$${price.toFixed(2)}`,
    stock: String(totalStock),
    sold: "0",
    revenue: "$0",
    status: "Active",
    description: draft.description,
    images: draft.images,
    composition: draft.composition,
    weight: draft.weight,
    dimensions: draft.dimensions,
    origin: draft.origin,
    collection: draft.brand,
    colors: draft.colors,
    sizes: draft.sizes,
    rating: 4.8,
  };
}
```

- [ ] **Step 3: Type-check**

Run (from `frontend/`): `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/admin/types/product.ts
git commit -m "feat: carry colors/sizes from product draft into Product"
```

---

### Task 2: Add the `gold-deep` color token

**Files:**
- Modify: `frontend/src/web/theme.css`

**Interfaces:**
- Produces: Tailwind utilities `text-gold-deep`, `bg-gold-deep` (and any other `*-gold-deep` variant) — consumed by `ProductCard` (Task 8) and `ProductPage` (Task 11).

- [ ] **Step 1: Add the token**

In `frontend/src/web/theme.css`, add `--color-gold-deep` next to the existing `--color-gold`:

```css
@theme {
  --color-ink: #2c2a28;
  --color-cream: #efe9e1;
  --color-gold: #b89b68;
  --color-gold-deep: #84540c;

  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Cormorant Garamond", ui-serif, serif;
  --font-serif-alt: "Playfair Display", ui-serif, serif;
}
```

- [ ] **Step 2: Verify the dev server still boots**

Run: `npm run dev` (from `frontend/`), open `http://localhost:5173/`, confirm the homepage renders unchanged. Stop the server (Ctrl+C).

- [ ] **Step 3: Commit**

```bash
git add frontend/src/web/theme.css
git commit -m "feat: add gold-deep color token for catalog price/eyebrow text"
```

---

### Task 3: `slugify` helper

**Files:**
- Create: `frontend/src/web/lib/slug.ts`

**Interfaces:**
- Produces: `slugify(value: string): string` — consumed by `catalog.ts` (Task 4), `ProductCard` (Task 8), `CategoryPage`/`ProductTypePage` (Tasks 9–10), and `PublicHeader` (Task 13).

- [ ] **Step 1: Write the helper**

```ts
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
```

- [ ] **Step 2: Verify by hand**

`slugify("Women")` → `"women"`, `slugify("Shawls / Scarfs")` → `"shawls-scarfs"`, `slugify("Home Essentials")` → `"home-essentials"`. Confirm these by reading the regex: non-alphanumeric runs become single hyphens, leading/trailing hyphens are stripped. (No test runner in this repo — this step is a manual trace, not an automated test.)

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/web/lib/slug.ts
git commit -m "feat: add slugify helper for catalog URLs"
```

---

### Task 4: Color swatch lookup

**Files:**
- Create: `frontend/src/web/lib/colorSwatches.ts`

**Interfaces:**
- Produces: `swatchColor(name: string): string` — consumed by `ProductPage` (Task 11).

- [ ] **Step 1: Write the lookup**

The fixed color list matches `frontend/src/admin/components/products/steps/VariantsStep.tsx`'s `COLORS` constant (`["Ivory", "Camel", "Terracotta", "Slate", "Black"]`):

```ts
const COLOR_SWATCHES: Record<string, string> = {
  Ivory: "#f1ece1",
  Camel: "#c19a6b",
  Terracotta: "#b1502f",
  Slate: "#5f6a72",
  Black: "#1a1a1a",
};

export function swatchColor(name: string): string {
  return COLOR_SWATCHES[name] ?? "#cfc9c0";
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/web/lib/colorSwatches.ts
git commit -m "feat: add color name to swatch hex lookup"
```

---

### Task 5: Catalog query layer

**Files:**
- Create: `frontend/src/web/lib/catalog.ts`

**Interfaces:**
- Consumes: `Product` type from `frontend/src/admin/types/product.ts`, `slugify` from `frontend/src/web/lib/slug.ts`.
- Produces: `getCategories(products)`, `getSubcategories(products, category)`, `getProductsBySubcategory(products, category, subcategory)`, `getProduct(products, id)`, `getRelatedProducts(products, product, limit?)`, `findCategoryBySlug(products, slug)`, `findSubcategoryBySlug(products, category, slug)` — consumed by `CategoryPage`, `ProductTypePage`, `ProductPage` (Tasks 9–11).

- [ ] **Step 1: Write the query functions**

```ts
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

export function getProductsBySubcategory(
  products: Product[],
  category: string,
  subcategory: string,
): Product[] {
  return products.filter((p) => p.category === category && p.subcategory === subcategory);
}

export function getProduct(products: Product[], id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(products: Product[], product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.subcategory === product.subcategory)
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
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/web/lib/catalog.ts
git commit -m "feat: add catalog query layer over ProductsContext"
```

---

### Task 6: `CategoryHero` component

**Files:**
- Create: `frontend/src/web/components/CategoryHero.tsx`

**Interfaces:**
- Produces: `<CategoryHero title={string} image={string} />` — consumed by `CategoryPage` and `ProductTypePage` (Tasks 9–10).

- [ ] **Step 1: Write the component**

```tsx
type CategoryHeroProps = {
  title: string;
  image: string;
};

export function CategoryHero({ title, image }: CategoryHeroProps) {
  return (
    <div className="relative flex h-[420px] items-end justify-center overflow-hidden pb-10 sm:h-[600px] sm:pb-16 lg:h-[843px] lg:pb-24">
      <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-black/20" />
      <h1 className="relative px-4 text-center font-serif text-4xl text-white drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.05)] sm:text-6xl lg:text-[92px] lg:leading-[80px]">
        {title}
      </h1>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/web/components/CategoryHero.tsx
git commit -m "feat: add CategoryHero banner component"
```

---

### Task 7: `Newsletter` component

**Files:**
- Create: `frontend/src/web/components/Newsletter.tsx`

**Interfaces:**
- Produces: `<Newsletter />` — consumed by `CategoryPage`, `ProductTypePage`, `ProductPage` (Tasks 9–11).

- [ ] **Step 1: Write the component**

```tsx
export function Newsletter() {
  return (
    <div className="flex flex-col items-center gap-4 bg-gold-deep/[0.06] px-4 py-16 text-center sm:gap-6 sm:py-24">
      <h2 className="font-serif text-2xl text-ink sm:text-4xl">Subscribe to our Newsletter</h2>
      <p className="max-w-[400px] text-sm text-ink/55">
        Receive new collections and stories from the Peruvian highlands.
      </p>
      <form className="flex w-full max-w-[440px] flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-ink px-8 py-3 text-xs uppercase tracking-[1.4px] text-white"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/web/components/Newsletter.tsx
git commit -m "feat: add Newsletter subscribe band component"
```

---

### Task 8: `ProductCard` component

**Files:**
- Create: `frontend/src/web/components/ProductCard.tsx`

**Interfaces:**
- Consumes: `Product` type, `slugify` from `../lib/slug`.
- Produces: `<ProductCard product={Product} />` — consumed by `ProductTypePage` (Task 10) and `ProductPage`'s related section (Task 11).

- [ ] **Step 1: Write the component**

```tsx
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../admin/types/product";
import placeholder from "../assets/product-1.png";
import { slugify } from "../lib/slug";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images?.[0]?.url ?? placeholder;
  const href = `/category/${slugify(product.category)}/${slugify(product.subcategory)}/${product.id}`;

  return (
    <Link to={href} className="group flex flex-col gap-4">
      <div className="relative aspect-[308/352] w-full overflow-hidden bg-cream">
        <img src={image} alt={product.name} className="size-full object-cover" />
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={(event) => event.preventDefault()}
          className="absolute right-4 top-4 text-ink/50"
        >
          <Heart size={18} />
        </button>
      </div>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] uppercase tracking-[1.5px] text-ink">{product.name}</p>
        <p className="text-[13px] text-gold-deep">{product.price}</p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/web/components/ProductCard.tsx
git commit -m "feat: add ProductCard component"
```

---

### Task 9: `CategoryPage`

**Files:**
- Create: `frontend/src/web/pages/CategoryPage.tsx`

**Interfaces:**
- Consumes: `useProducts` from `../../admin/context/ProductsContext`, `findCategoryBySlug`/`getSubcategories`/`getProductsBySubcategory` from `../lib/catalog`, `slugify` from `../lib/slug`, `CategoryHero`, `Newsletter`, existing `Announcement`/`PublicHeader`/`Footer`.
- Produces: `CategoryPage` component — routed at `/category/:categorySlug` (wired in Task 12).

- [ ] **Step 1: Write the page**

```tsx
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../admin/context/ProductsContext";
import heroImage from "../assets/hero.png";
import placeholderImage from "../assets/product-2.png";
import { Announcement } from "../components/Announcement";
import { CategoryHero } from "../components/CategoryHero";
import { Footer } from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import { PublicHeader } from "../components/PublicHeader";
import { findCategoryBySlug, getProductsBySubcategory, getSubcategories } from "../lib/catalog";
import { slugify } from "../lib/slug";

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { products } = useProducts();
  const category = categorySlug ? findCategoryBySlug(products, categorySlug) : undefined;

  if (!category) {
    return (
      <div className="bg-white">
        <Announcement />
        <PublicHeader />
        <div className="flex flex-col items-center gap-4 px-4 py-24 text-center">
          <p className="text-ink/60">This category doesn&apos;t exist yet.</p>
          <Link to="/" className="text-sm uppercase tracking-[1.2px] text-ink underline">
            Back home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const subcategories = getSubcategories(products, category);

  return (
    <div className="bg-white">
      <Announcement />
      <PublicHeader />
      <CategoryHero title={category} image={heroImage} />

      <div className="mx-auto flex max-w-[1304px] flex-col gap-16 px-4 py-16 sm:px-8 sm:py-24 lg:px-0">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6">
          {subcategories.map((subcategory) => {
            const subProducts = getProductsBySubcategory(products, category, subcategory);
            const image = subProducts[0]?.images?.[0]?.url ?? placeholderImage;
            return (
              <Link
                key={subcategory}
                to={`/category/${slugify(category)}/${slugify(subcategory)}`}
                className="group flex flex-col gap-5"
              >
                <div className="aspect-[640/853] w-full overflow-hidden bg-cream">
                  <img
                    src={image}
                    alt={subcategory}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg uppercase tracking-[2.5px] text-ink">{subcategory}</p>
                  <div className="h-px w-16 bg-ink" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/web/pages/CategoryPage.tsx
git commit -m "feat: add CategoryPage"
```

---

### Task 10: `ProductTypePage`

**Files:**
- Create: `frontend/src/web/pages/ProductTypePage.tsx`

**Interfaces:**
- Consumes: `useProducts`, `findCategoryBySlug`/`findSubcategoryBySlug`/`getProductsBySubcategory` from `../lib/catalog`, `CategoryHero`, `ProductCard`, `Newsletter`, existing `Announcement`/`PublicHeader`/`Footer`.
- Produces: `ProductTypePage` component — routed at `/category/:categorySlug/:subcategorySlug` (wired in Task 12).

- [ ] **Step 1: Write the page**

```tsx
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../admin/context/ProductsContext";
import heroImage from "../assets/hero.png";
import { Announcement } from "../components/Announcement";
import { CategoryHero } from "../components/CategoryHero";
import { Footer } from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import { ProductCard } from "../components/ProductCard";
import { PublicHeader } from "../components/PublicHeader";
import {
  findCategoryBySlug,
  findSubcategoryBySlug,
  getProductsBySubcategory,
} from "../lib/catalog";

export function ProductTypePage() {
  const { categorySlug, subcategorySlug } = useParams<{
    categorySlug: string;
    subcategorySlug: string;
  }>();
  const { products } = useProducts();
  const category = categorySlug ? findCategoryBySlug(products, categorySlug) : undefined;
  const subcategory =
    category && subcategorySlug
      ? findSubcategoryBySlug(products, category, subcategorySlug)
      : undefined;

  if (!category || !subcategory) {
    return (
      <div className="bg-white">
        <Announcement />
        <PublicHeader />
        <div className="flex flex-col items-center gap-4 px-4 py-24 text-center">
          <p className="text-ink/60">This collection doesn&apos;t exist yet.</p>
          <Link to="/" className="text-sm uppercase tracking-[1.2px] text-ink underline">
            Back home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const items = getProductsBySubcategory(products, category, subcategory);

  return (
    <div className="bg-white">
      <Announcement />
      <PublicHeader />
      <CategoryHero title={subcategory} image={heroImage} />

      <div className="mx-auto flex max-w-[1304px] flex-col gap-16 px-4 py-16 sm:px-8 sm:py-24 lg:px-0">
        {items.length === 0 ? (
          <p className="text-center text-ink/60">No products in this collection yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/web/pages/ProductTypePage.tsx
git commit -m "feat: add ProductTypePage"
```

---

### Task 11: `ProductPage`

**Files:**
- Create: `frontend/src/web/pages/ProductPage.tsx`

**Interfaces:**
- Consumes: `useProducts`, `findCategoryBySlug`/`findSubcategoryBySlug`/`getProduct`/`getRelatedProducts` from `../lib/catalog`, `swatchColor` from `../lib/colorSwatches`, `ProductCard`, `Newsletter`, existing `Announcement`/`PublicHeader`/`Footer`.
- Produces: `ProductPage` component — routed at `/category/:categorySlug/:subcategorySlug/:productId` (wired in Task 12).

- [ ] **Step 1: Write the page**

```tsx
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../admin/context/ProductsContext";
import placeholderImage from "../assets/product-1.png";
import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import { ProductCard } from "../components/ProductCard";
import { PublicHeader } from "../components/PublicHeader";
import {
  findCategoryBySlug,
  findSubcategoryBySlug,
  getProduct,
  getRelatedProducts,
} from "../lib/catalog";
import { swatchColor } from "../lib/colorSwatches";

const DETAIL_FIELDS: Array<{
  label: string;
  key: "composition" | "weight" | "dimensions" | "origin";
}> = [
  { label: "Composition", key: "composition" },
  { label: "Weight", key: "weight" },
  { label: "Dimensions", key: "dimensions" },
  { label: "Origin", key: "origin" },
];

export function ProductPage() {
  const { categorySlug, subcategorySlug, productId } = useParams<{
    categorySlug: string;
    subcategorySlug: string;
    productId: string;
  }>();
  const { products } = useProducts();
  const category = categorySlug ? findCategoryBySlug(products, categorySlug) : undefined;
  const subcategory =
    category && subcategorySlug
      ? findSubcategoryBySlug(products, category, subcategorySlug)
      : undefined;
  const product = productId ? getProduct(products, productId) : undefined;

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors?.[0]);
  const [openSection, setOpenSection] = useState<"description" | "care" | null>("description");

  if (!category || !subcategory || !product) {
    return (
      <div className="bg-white">
        <Announcement />
        <PublicHeader />
        <div className="flex flex-col items-center gap-4 px-4 py-24 text-center">
          <p className="text-ink/60">This product doesn&apos;t exist yet.</p>
          <Link to="/" className="text-sm uppercase tracking-[1.2px] text-ink underline">
            Back home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [{ id: "placeholder", url: placeholderImage }];
  const related = getRelatedProducts(products, product);

  return (
    <div className="bg-white">
      <Announcement />
      <PublicHeader />

      <div className="mx-auto flex max-w-[1344px] flex-col gap-12 px-4 py-12 sm:px-8 sm:py-16 lg:flex-row lg:gap-20 lg:px-0">
        <div className="flex flex-col gap-4 lg:w-[632px] lg:shrink-0">
          <div className="aspect-[632/606] w-full overflow-hidden bg-cream">
            <img
              src={images[activeImage].url}
              alt={product.name}
              className="size-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`size-20 shrink-0 overflow-hidden bg-cream sm:size-24 lg:size-[144px] ${
                    index === activeImage ? "ring-1 ring-ink" : "opacity-80"
                  }`}
                >
                  <img src={image.url} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[2px] text-gold-deep">
              {product.composition || product.collection || product.category}
            </p>
            <h1 className="font-serif text-4xl text-ink sm:text-5xl">{product.name}</h1>
            <p className="font-serif text-2xl text-ink">{product.price}</p>
            {product.origin && (
              <p className="text-sm font-semibold tracking-[0.4px] text-gold-deep">
                Made in {product.origin}
              </p>
            )}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[2px] text-ink/60">
                Color — <span className="text-ink">{selectedColor}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    aria-label={color}
                    onClick={() => setSelectedColor(color)}
                    className={`size-9 rounded-full ${
                      selectedColor === color ? "ring-2 ring-ink ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: swatchColor(color) }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 border-t border-ink/10 pt-6">
            <p className="text-sm font-medium uppercase tracking-[0.16px] text-ink">
              Product Details
            </p>
            <div className="grid grid-cols-2 gap-x-10 gap-y-6">
              {DETAIL_FIELDS.map(({ label, key }) => (
                <div key={key} className="flex flex-col gap-1">
                  <p className="text-[11px] font-medium uppercase tracking-[1.6px] text-ink">
                    {label}
                  </p>
                  <p className="text-sm font-light text-ink/80">{product[key] || "—"}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col border-t border-ink/10">
            {(["description", "care"] as const).map((section) => (
              <div key={section} className="border-b border-ink/10 py-5">
                <button
                  type="button"
                  onClick={() => setOpenSection(openSection === section ? null : section)}
                  className="flex w-full items-center justify-between text-left text-sm font-medium uppercase tracking-[1px] text-ink"
                >
                  {section === "description" ? "Description" : "Care Instructions"}
                  <span
                    className={`transition-transform ${openSection === section ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {openSection === section && (
                  <p className="mt-4 text-[15px] font-light leading-6 text-ink/70">
                    {section === "description"
                      ? product.description || "No description yet."
                      : "Hand wash cold with a gentle detergent. Lay flat to dry, away from direct sunlight."}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="w-full bg-ink py-4 text-xs font-semibold uppercase tracking-[1.6px] text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto flex max-w-[1304px] flex-col items-center gap-12 px-4 py-16 sm:px-8 sm:py-24 lg:px-0">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-xs uppercase tracking-[3.6px] text-ink">Curated Selection</p>
            <h2 className="font-serif text-4xl text-ink sm:text-5xl">You Might Also Like</h2>
          </div>
          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}

      <Newsletter />
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/web/pages/ProductPage.tsx
git commit -m "feat: add ProductPage"
```

---

### Task 12: Wire routes and move `ProductsProvider`

**Files:**
- Modify: `frontend/src/App.tsx`

**Interfaces:**
- Consumes: `CategoryPage`, `ProductTypePage`, `ProductPage` (Tasks 9–11), existing `ProductsProvider`, existing `Home`/`AdminRoutes`.

- [ ] **Step 1: Add lazy imports and move the provider**

Replace the full contents of `frontend/src/App.tsx` with:

```tsx
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProductsProvider } from "./admin/context/ProductsContext";

const Home = lazy(() =>
  import("./web/theme.css").then(() =>
    import("./web/pages/Home").then((m) => ({ default: m.Home })),
  ),
);
const CategoryPage = lazy(() =>
  import("./web/theme.css").then(() =>
    import("./web/pages/CategoryPage").then((m) => ({ default: m.CategoryPage })),
  ),
);
const ProductTypePage = lazy(() =>
  import("./web/theme.css").then(() =>
    import("./web/pages/ProductTypePage").then((m) => ({ default: m.ProductTypePage })),
  ),
);
const ProductPage = lazy(() =>
  import("./web/theme.css").then(() =>
    import("./web/pages/ProductPage").then((m) => ({ default: m.ProductPage })),
  ),
);

const Dashboard = lazy(() =>
  import("./admin/pages/Dashboard").then((m) => ({ default: m.Dashboard })),
);
const Products = lazy(() =>
  import("./admin/pages/Products").then((m) => ({ default: m.Products })),
);
const ProductWizard = lazy(() =>
  import("./admin/pages/ProductWizard").then((m) => ({ default: m.ProductWizard })),
);
const ProductDetail = lazy(() =>
  import("./admin/pages/ProductDetail").then((m) => ({ default: m.ProductDetail })),
);
const Orders = lazy(() => import("./admin/pages/Orders").then((m) => ({ default: m.Orders })));
const OrderDetail = lazy(() =>
  import("./admin/pages/OrderDetail").then((m) => ({ default: m.OrderDetail })),
);
const Customers = lazy(() =>
  import("./admin/pages/Customers").then((m) => ({ default: m.Customers })),
);
const CustomerDetail = lazy(() =>
  import("./admin/pages/CustomerDetail").then((m) => ({ default: m.CustomerDetail })),
);
const SalesAnalytics = lazy(() =>
  import("./admin/pages/SalesAnalytics").then((m) => ({ default: m.SalesAnalytics })),
);
const Inventory = lazy(() =>
  import("./admin/pages/Inventory").then((m) => ({ default: m.Inventory })),
);
const ContentManager = lazy(() =>
  import("./admin/pages/ContentManager").then((m) => ({ default: m.ContentManager })),
);
const Reviews = lazy(() => import("./admin/pages/Reviews").then((m) => ({ default: m.Reviews })));
const Settings = lazy(() =>
  import("./admin/pages/Settings").then((m) => ({ default: m.Settings })),
);

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/new" element={<ProductWizard />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:orderId" element={<OrderDetail />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/customers/:customerId" element={<CustomerDetail />} />
      <Route path="/sales-analytics" element={<SalesAnalytics />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/content-manager" element={<ContentManager />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export function App() {
  return (
    <ProductsProvider>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route
            path="/category/:categorySlug/:subcategorySlug"
            element={<ProductTypePage />}
          />
          <Route
            path="/category/:categorySlug/:subcategorySlug/:productId"
            element={<ProductPage />}
          />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ProductsProvider>
  );
}
```

Note `ProductsProvider` no longer wraps `AdminRoutes` directly — it now wraps everything in `App`, so `AdminRoutes` lost its own `<ProductsProvider>` wrapper (removed).

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual check — admin still works**

Run: `npm run dev`, open `http://localhost:5173/admin/products`. Confirm the seeded products (5x "Linen Shirt") still list. This confirms moving the provider didn't break admin's access to product state.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/App.tsx
git commit -m "feat: wire /category routes and share ProductsProvider app-wide"
```

---

### Task 13: Wire `PublicHeader` nav links

**Files:**
- Modify: `frontend/src/web/components/PublicHeader.tsx`

- [ ] **Step 1: Replace the plain-string nav with linked entries**

Replace the top of the file (imports and `primaryLinks`) and the two places `primaryLinks`/`secondaryLinks` are rendered:

```tsx
import { Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const primaryLinks = [
  { label: "Women", href: "/category/women" },
  { label: "Men", href: "/category/men" },
  { label: "Home", href: "/category/home-essentials" },
  { label: "Our Story", href: "#" },
  { label: "Vicuna", href: "#" },
];
const secondaryLinks = ["Fiber", "Community"];
```

This keeps the same `lucide-react` icons the file already imports and adds only `Link` from `react-router-dom`.

Then update the desktop nav render (replace the `<nav className="hidden items-center gap-6 lg:flex">...</nav>` block):

```tsx
<nav className="hidden items-center gap-6 lg:flex">
  {primaryLinks.map((link) => (
    <Link key={link.label} to={link.href} className="text-sm tracking-[0.35px] text-ink">
      {link.label}
    </Link>
  ))}
</nav>
```

And update the mobile nav render (replace the `{menuOpen && (...)}` block's `[...primaryLinks, ...secondaryLinks].map` list — primary links now carry `href`, secondary links stay plain strings, so render them as two mapped groups):

```tsx
{menuOpen && (
  <nav className="flex flex-col gap-1 border-t border-ink/10 bg-white px-4 py-4 lg:hidden">
    {primaryLinks.map((link) => (
      <Link
        key={link.label}
        to={link.href}
        className="py-2 text-sm tracking-[0.35px] text-ink"
        onClick={() => setMenuOpen(false)}
      >
        {link.label}
      </Link>
    ))}
    {secondaryLinks.map((label) => (
      <a
        key={label}
        href="#"
        className="py-2 text-sm tracking-[0.35px] text-ink"
        onClick={() => setMenuOpen(false)}
      >
        {label}
      </a>
    ))}
  </nav>
)}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (`noUnusedLocals` is on — don't leave any unused import behind).

- [ ] **Step 3: Manual check**

Run: `npm run dev`, open `http://localhost:5173/`, click "Women" in the nav. Confirm it navigates to `/category/women` and renders `CategoryPage` with the "Women" hero and the "Shawls / Scarfs" card (from the seeded products).

- [ ] **Step 4: Commit**

```bash
git add frontend/src/web/components/PublicHeader.tsx
git commit -m "feat: link PublicHeader nav to category pages"
```

---

### Task 14: End-to-end smoke test (admin → public)

**Files:** none (verification only)

- [ ] **Step 1: Full production build**

Run (from `frontend/`): `npm run build`
Expected: completes with no TypeScript or Vite errors.

- [ ] **Step 2: Browse the seeded catalog**

Run: `npm run dev`. In a browser:
- Visit `http://localhost:5173/category/women` → confirm hero says "Women" and a "Shawls / Scarfs" card is shown.
- Click it → confirm you land on `http://localhost:5173/category/women/shawls-scarfs` showing 5 "Linen Shirt" product cards at $89.00.
- Click one → confirm you land on a product detail page at `/category/women/shawls-scarfs/<id>` showing the product name, price, and a placeholder image (seed products have no uploaded images), with "Product Details" fields showing "—" (seed products have no composition/weight/etc.).

- [ ] **Step 3: Add a real product via the admin wizard and confirm it appears publicly**

In the browser, go to `http://localhost:5173/admin/products/new`. Fill in a product with:
- Name: `Test Alpaca Scarf`
- Category: `Women`, Subcategory: `Shawls / Scarfs` (or any values — confirm the resulting page picks them up)
- Add at least one image, a description, composition, weight, dimensions, origin, and select at least one color and one size in the Variants step.

Submit the wizard. Then visit `http://localhost:5173/category/women/shawls-scarfs` and confirm "Test Alpaca Scarf" now appears in the grid alongside the seed products. Click into it and confirm: the uploaded image shows in the gallery, the color swatch you picked renders and is clickable, and the Composition/Weight/Dimensions/Origin fields show your entered values instead of "—".

- [ ] **Step 4: Confirm no regressions on existing pages**

Visit `http://localhost:5173/` (homepage) and `http://localhost:5173/admin` (dashboard) — confirm both render exactly as before this feature (no visual or console errors).

This task has no commit — it's a verification checkpoint confirming Tasks 1–13 integrate correctly.
