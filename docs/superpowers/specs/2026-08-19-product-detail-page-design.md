# Product detail page — design

## Problem

Clicking a product row on the Products page did nothing. Need an inner "detail" page per the Figma design (nodes 631-1854, 631-1853): header (back link, name/SKU/category, Edit/Delete), a 4-tab bar (Overview/Variants/Reviews/History), and an Overview tab with stat tiles, a monthly sales chart, quick actions, an image gallery, and Details/Product Details cards.

## Scope

Frontend-only, same as the Add Product wizard. Only the Overview tab has real content (matches the two linked Figma nodes); Variants/Reviews/History render a "coming soon" placeholder, consistent with the existing stub-page pattern elsewhere in the app.

- **Delete** is real: removes the product from `ProductsContext` and navigates back to `/admin/products`.
- **Edit** is a static button with no handler — building an edit flow is out of scope (would need a second wizard-like form); flagged to the user rather than silently left broken like the original "Add Product" button was.

## Data model change

`ProductRow` renamed to `Product` and extended with an `id` (used for routing) plus optional detail-only fields the table never needed: `description`, `images`, `composition`, `weight`, `dimensions`, `origin`, `collection`, `rating`. All optional so the 5 hardcoded seed rows don't need backfilling — the detail page falls back to "—" (or nothing, for rating) when absent.

`draftToRow` renamed `draftToProduct`, now carries the wizard draft's media/detail fields through instead of dropping them, so a product created via the wizard shows its real images and details; a mock `rating: 4.8` is assigned to every wizard-created product since there's no review system yet.

## Routing

`/admin/products/:id` → `ProductDetail`, lazy-loaded. Each row in the Products table is now a `<Link>` to its product's detail page.

## Out of scope

- Edit-product flow.
- Variants/Reviews/History tab content.
- Backend persistence (still frontend-only, per the wizard spec).
