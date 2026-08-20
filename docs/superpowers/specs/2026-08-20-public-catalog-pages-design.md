# Public Catalog Pages (Category → Type → Product) — Design

## Context

The public site (`frontend/src/web`) currently only has a homepage. The admin
dashboard already manages products with `category` / `subcategory` fields
(e.g. `Women` / `Shawls / Scarfs`), a wizard for creating them
(`admin/pages/ProductWizard.tsx`), and an in-memory `ProductsContext`.

This adds three public page templates, driven entirely by that same product
data, so any category/subcategory the admin creates automatically gets a
working storefront page with zero extra code:

1. **Category page** — e.g. "Women" — grid of subcategory types.
2. **Product type page** — e.g. "Shawls / Scarfs" — grid of products in that
   subcategory.
3. **Product detail page** — single product, gallery + info + related
   products.

Three Figma frames were implemented as reference:
`node-id=645-306` (category), `node-id=645-489` (type), `node-id=645-43`
(product detail).

## Data layer

No backend exists yet. `ProductsContext` (in-memory React state) remains the
source of truth, but two changes make it a clean seam for a future API:

- **`ProductsProvider` moves up** to wrap the whole `<App>` in `App.tsx`
  (currently it only wraps `AdminRoutes`), so public pages and admin share
  one product list — products added via the wizard immediately appear on the
  public site.
- **New file `web/lib/catalog.ts`** exposes read functions — no page reads
  `products` from context directly:
  - `getCategories(products)`
  - `getSubcategories(products, category)`
  - `getProductsBySubcategory(products, category, subcategory)`
  - `getProduct(products, id)`
  - `getRelatedProducts(products, product, limit = 3)`

  When a real backend exists, only this file changes (context reads become
  `fetch` calls); no page component changes.
- **New file `web/lib/slug.ts`** — `slugify(value)` (kebab-case) and
  `findBySlug(values, slug)`. Category/subcategory slugs are derived on the
  fly, never stored, so any string the admin types works as a URL segment
  without a migration.

## Product model changes

`admin/types/product.ts`:

- Add `colors?: string[]` and `sizes?: string[]` to `Product` (already
  collected by the wizard's `VariantsStep` into `ProductDraft`, just not
  copied into `Product` by `draftToProduct` — closing that gap).
- No "Fiber" field — the Figma detail grid's Fiber row is dropped as
  redundant with the existing `composition` field.
- Color swatches render via a fixed name→hex lookup in the product page
  (`Ivory/Camel/Terracotta/Slate/Black`, matching `VariantsStep`'s fixed
  `COLORS` list) — no new admin input required.

## Routes

Added under a `/category` prefix in `App.tsx` (top-level, sibling to `/` and
`/admin/*`) to avoid clashing with any future public route:

- `/category/:categorySlug` → `CategoryPage`
- `/category/:categorySlug/:subcategorySlug` → `ProductTypePage`
- `/category/:categorySlug/:subcategorySlug/:productId` → `ProductPage`

`PublicHeader`'s "Women" / "Men" / "Home" links point at
`/category/women`, etc., instead of `#`.

## Pages and components

**`web/pages/CategoryPage.tsx`**
- Hero: full-bleed image (one shared placeholder asset, reused across all
  categories — no per-category hero image field exists yet) + category name
  as the heading, matching the existing `Announcement` + nav pattern from
  `Home`.
- Flat grid of subcategory cards (no thematic grouping headings — confirmed
  with user, add a `group` field later if needed). Each card: representative
  image (first product's first image, falling back to the shared placeholder
  if the subcategory has no images yet) + subcategory name, linking to the
  type page.
- Newsletter + Footer.

**`web/pages/ProductTypePage.tsx`**
- Hero: same pattern, heading = subcategory name.
- Flat 4-column grid of `ProductCard`s for every product in that
  category/subcategory (no Scarfs/Shawls sub-split — confirmed with user).
- Newsletter + Footer.

**`web/pages/ProductPage.tsx`**
- Image gallery: large image + thumbnail row, built from the product's real
  `images: ProductImage[]` (uploaded via the admin wizard) — not hardcoded
  count/assets. Falls back to a placeholder if a product has no images.
- Info column: category eyebrow, name, price, color swatches (from
  `product.colors`, using the fixed hex lookup), a "Product Details" grid
  (Composition / Weight / Dimensions / Origin — existing fields), a
  Description/Care accordion, and an Add to Cart button. Per user
  confirmation, this is **visual only** — selection state works, no cart
  state/count is wired up (matches the existing static "0" cart badge in
  `PublicHeader`).
- "You Might Also Like": 3 related products from `getRelatedProducts`
  (same subcategory, excluding the current product), rendered with
  `ProductCard`.
- Newsletter + Footer.

**`web/components/ProductCard.tsx`** — image, name, price; used by the type
page grid and "You Might Also Like". Extracted since the same card shape
appears in both places (and resembles `NewArrivals`' inline card, which stays
as-is since it's homepage-specific curated content, not catalog-driven).

**`web/components/Newsletter.tsx`** — the subscribe band, identical across
all three new pages, extracted once.

## Styling

Reuses existing tokens from `web/theme.css` (`--color-ink`, `--color-cream`,
`--color-gold`, `font-serif`, `font-sans`). The Figma frames' price/eyebrow
color `#84540c` isn't yet a token — added as `--color-gold-deep: #84540c` in
`theme.css` alongside the existing `--color-gold`. Font Awesome icon glyphs
in the Figma nav are ignored — `PublicHeader` already uses `lucide-react`
icons for the same purposes.

## Explicitly out of scope (per user confirmation)

- Category "group" headings (Knitwear/Outerwear/Accessories) — flat grid for
  now.
- Sub-splitting a type page's grid by finer product-type tags — flat grid for
  now.
- Real cart state — Add to Cart is visual only.
- Per-category/type hero images — one shared placeholder for all.
