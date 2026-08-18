# Add Product wizard — design

## Problem

The Products admin page has a "+ Add Product" button that does nothing (no `onClick`/route). We need a working 5-step "Add New Product" flow matching the Figma design:
- https://www.figma.com/design/354mOGQ3VC3WZmyGVp06kg/Paul?node-id=631-524 (Basic Info)
- https://www.figma.com/design/354mOGQ3VC3WZmyGVp06kg/Paul?node-id=631-825 (Media)
- Pricing step (node 631-1072, found via metadata search — not in the original link set)
- https://www.figma.com/design/354mOGQ3VC3WZmyGVp06kg/Paul?node-id=631-1309 (Variants)
- https://www.figma.com/design/354mOGQ3VC3WZmyGVp06kg/Paul?node-id=631-1588 (Review)

The Pricing step in Figma already shows a single "Retail Price ($)" field (no separate cost/tax fields) — confirms the user's ask to keep pricing to one price field.

## Scope

Frontend-only (per user decision): no backend Product model or API. The backend currently has no product persistence at all — out of scope for this feature.

- Client-side image preview only (`URL.createObjectURL`), no real upload/storage.
- Completed products are added to the existing (currently hardcoded) Products table via a small shared React context, in-memory only — resets on page refresh.

## Routing

- New route `/admin/products/new` → `ProductWizard` page, lazy-loaded like other routes in `App.tsx`.
- `Products.tsx`'s "+ Add Product" `PrimaryButton` becomes a `<Link to="/admin/products/new">`.

## State

- `ProductsContext` (`frontend/src/context/ProductsContext.tsx`): holds the product list (seeded with the current hardcoded rows) + `addProduct(product)`. Wraps `<App />` in `main.tsx` (or wraps `<Routes>` in `App.tsx`).
- `ProductWizard.tsx` owns the draft as one `useState` object (no reducer — 5 steps, moderate field count, doesn't need one) plus `currentStep: number`.

```ts
type ProductDraft = {
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
  images: { id: string; url: string; isMain: boolean }[];
  price: string;
  sku: string;
  barcode: string;
  sizes: string[];
  colors: string[];
  stockByVariant: Record<string, number>; // key `${color}|${size}`
};
```

## Components

New folder `frontend/src/components/products/`, following the existing `dashboard/`/`layout/`/`ui/` convention:

- `WizardStepper.tsx` — 5-pill header; per-step state is `done` (green check) / `active` (brand-dark) / `upcoming` (brand-soft), driven by validity functions below.
- `PreviewPanel.tsx` — right column: live preview card (name/category·sku/price, falls back to placeholders) + completion checklist + progress bar ("X/4 steps done", Review excluded from the denominator per Figma).
- `FormField.tsx` — shared label+input/textarea wrapper (uppercase label, existing input styling) reused across the 4 field-heavy steps to avoid repeating markup.
- `steps/BasicInfoStep.tsx`, `MediaStep.tsx`, `PricingStep.tsx`, `VariantsStep.tsx`, `ReviewStep.tsx`.

`pages/ProductWizard.tsx` renders `AdminLayout` → header ("Add New Product" + Cancel) → `WizardStepper` → two-column grid (active step card | `PreviewPanel`).

## Validation / step completion

A step is "done" once:
- Basic Info: `name` and `mainCategory` non-empty.
- Media: `images.length > 0`.
- Pricing: `price` parses to a number > 0.
- Variants: `sizes.length > 0 && colors.length > 0`.

"Publish Product" on the Review step is disabled until Basic Info, Media, Pricing, and Variants are all done. "Save Draft" navigates back to `/admin/products` without validation (no draft persistence — out of scope).

## Styling

Reuse existing Tailwind config tokens only (`brand-soft`, `brand-dark`, `brand-panel`, `brand-border`, `success`/`danger`/`warning`, `rounded-card`/`rounded-panel`, `surface-muted`/`surface-tan` added in the earlier cleanup pass) and the existing `PrimaryButton` component. No new arbitrary-value colors.

## Out of scope

- Backend persistence (Prisma model, API routes).
- Real file upload/storage.
- Draft persistence across sessions.
- Edit-existing-product flow (this spec is Add only).
