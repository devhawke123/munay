# Catalogue field alignment

## Context

The client provided a product catalogue spreadsheet (SKU, Name Product, Trad,
Category, Price, Composition, Colors, Size, Fiber, Product Description, Care
Instructions, plus an Active flag to filter out inactive rows). Comparing its
columns against the existing product schema and admin/public product UI
surfaced two gaps and one modeling change:

- `Fiber` and `Care Instructions` have no backing database column. The public
  Product Page already has a UI slot for Fiber (unpopulated) and a
  hardcoded, identical Care Instructions string for every product.
- `Trad` maps to the existing `tags` field (confirmed with the client: it's
  an extra descriptive tag, not a new concept). `Active` maps to the existing
  `ProductStatus` enum (`ACTIVE`/`ARCHIVED`/`DRAFT`) already used throughout
  the admin. Neither needs a schema change.
- Today `Product.sku` is the unique key and `Product.name` is not. The client
  wants a "product" to be identified by its name — the same name can have
  many color/size variants (each with its own SKU, which already carries the
  real uniqueness via `ProductVariant.sku`), but `sku` at the product level
  is for inventory/style tracking, not identity. Uniqueness moves from `sku`
  to `name`.

This spec covers wiring `fiber` and `careInstructions` end-to-end and
switching the Product unique key from `sku` to `name`. A bulk import of the
client's actual spreadsheet is a separate follow-up once the file is
provided.

## Non-goals

- CSV/XLSX bulk import tooling for the catalogue file itself.
- Per-variant fiber or care instructions (confirmed per-product is
  sufficient — these values repeat identically across every variant row in
  the client's sheet).
- Any change to how `Active`/status or `Trad`/tags are modeled — both already
  exist and already work.

## Schema changes (`backend/prisma/schema.prisma`)

On `model Product`:

- `name String` → `name String @unique`
- `sku String @unique` → `sku String` (drop uniqueness; stays required,
  still used to seed each `ProductVariant.sku` as `{sku}-{color}-{size}`)
- Add `fiber String?` and `careInstructions String?`, positioned alongside
  the existing `composition`/`weight`/`dimensions`/`origin` fields.

One new Prisma migration covering all three changes.

## Backend

`ProductWriteInput` (`products.service.ts`) gains `fiber?: string` and
`careInstructions?: string`, passed through in both `createProduct` and
`updateProduct`'s `data:` blocks alongside the other optional string fields.

`parseWritePayload` (`products.controller.ts`) destructures and forwards
`fiber` and `careInstructions` the same way it does `composition`.

Duplicate-name handling: `createProduct` and `updateProduct` catch
`Prisma.PrismaClientKnownRequestError` with code `P2002` and throw
`HttpError(409, "A product with this name already exists")` — the same
try/catch pattern `deleteProduct` already uses for `P2003`.

## Admin frontend

- `frontend/src/admin/types/product.ts`: add `fiber` and `careInstructions`
  to `ProductDraft`, `emptyProductDraft`, and `Product`; map both through
  `apiProductToProduct` and `productToDraft`.
- `frontend/src/admin/hooks/useProductsApi.ts`: add `fiber` and
  `careInstructions` (`string | null`) to `ApiProductSummary`, and
  `fiber?`/`careInstructions?` to `ProductWriteInput`.
- `BasicInfoStep.tsx`: add a "Fiber" text input to the existing "Product
  Details" grid (next to Composition/Weight/Dimensions/Origin) and a "Care
  Instructions" textarea below it, matching the Description field's style.
- `OverviewTab.tsx`: add Fiber and Care Instructions rows to the existing
  "Product Details" card (`detailRows`), same `label`/`value` pattern as
  Composition/Weight/Origin/Collection.

## Public site

`frontend/src/web/pages/ProductPage.tsx`:

- `DETAIL_FIELDS` already includes `fiber` — no change needed there beyond
  the type/data now being populated.
- Replace the hardcoded Care Instructions string in the accordion body with
  `product.careInstructions || "Hand wash cold with a gentle detergent. Lay
  flat to dry, away from direct sunlight."` (existing text becomes the
  fallback for products that don't set one).

## Error handling

Duplicate product name on create/update now returns a `409` with a clear
message instead of an unhandled 500, matching the existing pattern for the
"can't delete a product with order history" case.

## Testing

- Backend: exercise `createProduct`/`updateProduct` with a duplicate `name`
  and confirm the `409`/message; confirm `fiber`/`careInstructions` persist
  and round-trip through `getProduct`.
- Admin: create/edit a product through the wizard, confirm Fiber and Care
  Instructions save and display in the Overview tab.
- Public site: confirm a product with `fiber`/`careInstructions` set shows
  real values on the Product Page, and one without falls back to "—" /
  the default care text respectively.
