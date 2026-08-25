# Munay

Online store monorepo: a public storefront and an admin dashboard, in one Vite app.

## Stack

- **Frontend:** Vite + React + TypeScript (`frontend`)
- **Backend:** Express + TypeScript (`backend`)
- **Database:** MariaDB via Prisma (MySQL provider)

## Frontend structure

One React Router app split into two independently themed sections:

- `frontend/src/web/` — the public storefront (`/`). Pages in `web/pages`, components in
  `web/components`, own Tailwind theme (`web/theme.css`) with the site's serif/ink/cream palette.
- `frontend/src/admin/` — the admin dashboard (`/admin/*`). Pages, components, and product context
  live here, with its own Tailwind theme (`admin/theme.css`).

Each theme is a separate Tailwind v4 CSS entry, code-split per route so a visitor only downloads
the theme for the section they're in.

## Prerequisites

- Node.js 20+
- Docker (for local MariaDB) — or your own running MariaDB/MySQL instance

## Setup

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# Edit DATABASE_URL in backend/.env to match your MariaDB credentials
docker compose up -d
npm install
npm run db:generate
npm run db:migrate
```

Prisma reads `DATABASE_URL` from `backend/.env`. The API also loads the repo-root `.env` if present.

## Local database (Docker)

MariaDB runs locally via `docker-compose.yml` in the repo root. Credentials come from the root `.env` (see `.env.example`) and are shared with `backend/.env`'s `DATABASE_URL`.

```bash
# Start the DB (detached) — data persists in the munay_db_data volume
docker compose up -d

# Check it's healthy
docker compose ps

# Stop the DB (keeps data)
docker compose stop

# Stop and remove the container (keeps the volume/data)
docker compose down

# Wipe the DB entirely (drops the volume too — you'll lose local data)
docker compose down -v
```

Once the DB is up, run migrations from `backend/`:

```bash
npm run db:migrate   # prisma migrate dev — creates/applies migrations
npm run db:generate  # prisma generate — regenerate the client after schema changes
npm run db:studio    # prisma studio — browse data in the browser
```

Note: the `MARIADB_USER` from `.env` only gets privileges scoped to `MARIADB_DATABASE` by default. `prisma migrate dev` needs broader privileges to create/drop its temporary shadow database, so for local dev the container grants that user global privileges after first start:

```bash
docker exec munay-db mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -e \
  "GRANT ALL PRIVILEGES ON *.* TO '$MARIADB_USER'@'%' WITH GRANT OPTION; FLUSH PRIVILEGES;"
```

This only needs to run once per fresh volume (i.e. after `docker compose down -v` or on first setup).

## Develop

```bash
# API on http://localhost:3001
npm run dev:backend

# Web on http://localhost:5173
npm run dev:frontend
```

Health check: `GET http://localhost:3001/api/health`

## Useful scripts

| Script | Description |
|--------|-------------|
| `npm run dev:backend` | Start API in watch mode |
| `npm run dev:frontend` | Start Vite dev server |
| `npm run build` | Build all workspaces |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:studio` | Open Prisma Studio |

## Dev Log

Track work-in-progress here so other developers know what's been touched, what's done, and what's pending. Add a new entry per session; don't delete old ones.

Format:
```
### <YYYY-MM-DD> — <dev name> — <module>
- Branch: <branch-name>
- Status: <in progress / done / blocked>
- Changes: <short summary>
- Next steps / notes for other devs: <anything they need to know>
```

<!-- Newest entries go on top -->

### 2026-08-25 — Fatima — Backend (products/orders/customers/inventory/sales/events admin APIs) + frontend API hooks (not wired in)
- Branch: `fatima/prisma-schema`
- Status: in progress (PR open against `main`)
- Changes: Built out full admin CRUD for all six admin dashboard modules against the Figma screens, extending `schema.prisma` as needed (8 new migrations — see `backend/prisma/migrations/`):
  - **Products** (`backend/src/admin/products/`): added `price`, `barcode`, `brand`, `composition`, `weight`, `dimensions`, `origin`, `tags` (Json) to `Product`, and `isMain` to `ProductImage`. `GET /` now returns SKU/Category/Price/Stock/Sold/Revenue/Status (Stock summed from `Inventory`, Sold/Revenue aggregated from non-cancelled `OrderItem`s), filterable by `mainCategory`/`subcategoryId`/`status`/`stockStatus`. `POST`/`PATCH` accept the full product-wizard payload (basic info, media, pricing, variants+stock) in one call; `DELETE` returns `409` instead of hard-failing when the product has order history.
  - **Orders** (`backend/src/admin/orders/`): `OrderStatus` enum replaced (`PENDING/PAID/FULFILLED/CANCELLED/REFUNDED` → `PENDING/PROCESSING/SHIPPED/DELIVERED/CANCELLED`, matching the actual UI, not the old placeholder values). Added `tax`, `carrier` (new `Carrier` enum: DHL/DPD/LA_POSTE), `trackingId`, `orderNumber` (autoincrement, human-facing `#12340` id), and a new `OrderStatusEvent` audit log backing the Order Timeline. New `PATCH /:id/shipping` for the Shipping Card.
  - **Customers** (`backend/src/admin/customers/`): added `city`/`state`/`country` — previously customers had no reusable location at all, only per-order shipping snapshots. `GET /:id` now returns computed `lifetimeValue`/`totalOrders`/`avgOrder`/`lastOrderAt` plus their orders.
  - **Inventory** (`backend/src/admin/inventory/`): added `Warehouse.type` (`PHYSICAL`/`ONLINE`) so the "Online Fulfilment Center" reuses the same `Inventory`/variant model instead of a parallel structure, and a new `StockMovement` audit log backing "Live Deductions" and every adjust/import action. New warehouse-scoped `items` endpoints support the "Adjust Stock" UI, which edits one aggregate number per product — since stock is actually tracked per-variant, adjustments distribute the new total across existing variants proportionally (largest-remainder method). New `/inventory/online` (auto-provisions the singleton warehouse), `/inventory/online/simulate-order`, `/inventory/online/deductions`. Removed the old unused flat `GET /` inventory list (nothing referenced it; superseded by the warehouse-scoped one).
  - **Sales** (`backend/src/admin/sales/`, new module): no new "Sale" model — In-Store and Website sales are both just `Order` rows via the existing `channel` field. Found and fixed a real schema bug: `Order.shippingFullName`/`shippingLine1`/etc. were `NOT NULL` even though `customerId` was already nullable for walk-in sales — an in-store order would've had to fabricate a fake address. Made them nullable, added `paymentMethod` and `posTransactionId` (unique — real cross-import dedup, not just within-file). `POST /in-store/import` parses the "Import CSV" flow's CSV (Date/Store/Transaction ID/Sales Amount/Payment Mode/Product Code) into real `Order`+`OrderItem` rows, resolving Product Code against real SKUs so it rolls into Top Products correctly. `GET /summary`, `/revenue-overview`, `/channel-breakdown`, `/top-products` (growth% only computed when a date range is given — no previous period to compare against otherwise), `/by-store`. Website Sales' order table reuses the existing `GET /orders?channel=ONLINE`, no duplicate endpoint.
  - **Events** (`backend/src/admin/events/`): added `EventType`, `EventStatus`, `standSubtitle`, `venueCallout`, `bulletPoints` (Json), and an `EventImage.role` enum (POSTER/HERO/GALLERY, previously just an undifferentiated flat list). Deliberately did **not** store `monthYear`/`dateRange` as free text like the frontend mock does — they're derived from `startsAt`/`endsAt` at query time so display can't drift out of sync with the real dates; verified this produces identical strings to the screenshots ("14 June 2025", "7 – 10 November 2025").
  - **Frontend** (`frontend/src/admin/hooks/`, new folder, **not wired into any page**): `lib/api.ts` (thin `fetch` wrapper — no axios/react-query in this project), `hooks/useApiResource.ts` (generic `{data,loading,error,refetch}` GET hook), and one hook file per domain (`useProductsApi`, `useOrdersApi`, `useCustomersApi`, `useInventoryApi`, `useSalesApi`, `useEventsApi`) mirroring every endpoint above, all named with an `Api` suffix to avoid colliding with the existing `useOrders`/`useProducts` from `OrdersContext`/`ProductsContext`. Every existing page still runs on its static mock data — confirmed via `git status` that no page/context/`data/*.ts` file was touched.
- All endpoints manually verified end-to-end against local MariaDB (create/list/filter/update/delete, proportional stock distribution, CSV import dedup across runs, timeline/status transitions, computed customer stats matching the screenshot numbers exactly) — test data cleaned up after. `tsc --noEmit` and `npm run build` clean on both `backend` and `frontend`.
- Next steps / notes for other devs: Still no auth/permissions on any admin route. Frontend hooks are ready but unintegrated — swapping a page from its `data/*.ts` mock to the matching `useXApi` hook is the next step, done one page at a time. `posTransactionId`/`paymentMethod` on `Order` only get populated by the in-store CSV import path — there's still no real payment gateway anywhere in this codebase, so nothing else fabricates payment data. `EventImage.role` is app-level-enforced (one POSTER/HERO per event), not a DB constraint — same relaxed-constraint pattern already used for `ProductImage.isMain`.

### 2026-08-21 — Fatima — Backend (inventory tracking schema + admin CRUD APIs)
- Branch: `fatima/prisma-schema`
- Status: in progress (PR #3 open against `main`)
- Changes: Extended `schema.prisma` — added `SalesChannel` enum plus `channel`/`storeLocation` on `Order` (and made `customerId` nullable, for anonymous in-store sales), added `reorderPoint` to `Inventory` (per-warehouse, derived stock status by design — no stored status column), added `location` to `Warehouse`, and a new `InventoryImport` model for CSV import audit history. Migration: `20260821080131_add_inventory_tracking`. Also scaffolded modular admin CRUD APIs under `backend/src/admin/` — one `routes/controller/service` triple per domain (`products`, `customers`, `orders`, `inventory`, `events`), mounted at `/api/admin/*` in `index.ts`, plus a shared `HttpError`/`errorHandler`.
- `inventory.service.ts` includes `importInventoryFromCsv(warehouseId, filePath, importedBy?)` — parses CSV via `csv-parse` (new dependency), upserts `Inventory` rows by SKU inside a `prisma.$transaction`, skips (not fails) unmatched SKUs, and writes an `InventoryImport` audit record (`completed`/`partial`/`failed`).
- All endpoints manually verified via curl (list/get/create/update, 404 and validation-error paths) against local MariaDB — no seed data yet, so lists currently return `[]` until real data exists.
- Next steps / notes for other devs: No auth/permissions on any admin route yet. Order creation (checkout-side, with totals/snapshot fields) intentionally not built here — this PR only covers admin-side read/status-update for orders. `POST /api/admin/inventory/import` currently takes a server-local `filePath` in the body, not a real file upload — will need multipart handling once the frontend Import CSV flow (see `fatima/sales-analytics` entry below) is wired to a real backend.

### 2026-08-20 — Fatima — Backend (MariaDB + initial Prisma schema)
- Branch: `fatima/prisma-schema`
- Status: in progress
- Changes: Set up local MariaDB via Docker Compose (`docker-compose.yml`, named volume `munay_db_data`) and switched `schema.prisma`'s datasource from the outdated Postgres example to `mysql` (MariaDB is MySQL-wire-compatible). Added the initial Prisma migration (`20260820142209_init`) covering `Product`, `ProductVariant`, `ProductImage`, `Warehouse`, `Inventory`, `Customer`, `Order`, `OrderItem`, `Event`, `EventImage`. Updated `.env.example`/`backend/.env.example` and README setup docs accordingly.
- Next steps / notes for other devs: `main`'s README previously documented Postgres — that was stale/incorrect even before this change, actual local dev DB has always been intended as MariaDB.

### 2026-08-19 — Fatima — Content Manager (real event images)
- Branch: `fatima/content-manager`
- Status: in progress
- Changes: Swapped the gradient placeholder for real photos on the 4 events that have a matching file in `frontend/src/web/assets/` (`Image (Les Automnales — Geneva).jpg`, `Image (An Evening of Empowerment & Elegance).jpg`, `Image (Munay Winter Collection Preview).jpg`, `Image (Alpaca Pop-up — Larco Mar).jpg`), imported directly in `data/events.ts` and used for both `posterImage` and `heroImage`.
- Note: this reaches across into `web/assets/` from `admin/data/` rather than duplicating the files into `admin/assets/` — pragmatic given they're the only real assets available, but worth moving to a shared assets location if the admin/web split is meant to be a hard boundary going forward.
- The other 2 dummy events ("Maison & Objet — Paris", "Munay Spring Showcase — Milan" — both invented by me to round out the counts, not from any screenshot) have no matching asset and still render the gradient placeholder.

### 2026-08-19 — Fatima — Content Manager (Event Management only)
- Branch: `fatima/content-manager`
- Status: in progress
- Changes: Implemented Content Manager scoped **only to events** — per explicit instruction, the Banners/Blogs tabs and their stat cards from the original Figma were deliberately left out; the page is just Event Management (title/subtitle changed to match: "Manage all events shown on the public-facing events page."). Built: `pages/ContentManager.tsx` (stat cards for Total/Live/Upcoming events, status filter pills, event card grid), `components/content/{EventCard,AddEventCard,EventDetailPanel,EventFormModal,EventBadges,EventImagePlaceholder}.tsx`, `types/event.ts`, `data/events.ts` (6 dummy events matching the reference screenshots' counts: 4 Published, 1 Scheduled, 1 Draft).
- Three real interactive pieces, not just static UI: (1) status filter pills actually filter the visible grid, with counts computed live from the events array; (2) "View Event Details" opens a slide-over panel reading live data for that event; (3) "Edit" (from the card or from within the detail panel) opens a full form modal that **actually mutates local state** on Save — add a new event via the "Add New Event" card or edit an existing one, and the grid/stat cards/detail panel all reflect it immediately (no page reload needed). This mirrors the `ProductsContext` add-flow pattern but as page-local `useState` since nothing else needs cross-page access to events.
- Image fields (Event Poster, Hero Image, Gallery Thumbnails) use real file pickers with `URL.createObjectURL` previews — pick a real image file and it actually renders in the form/card/detail panel. There's no upload persistence (no backend), so picks are lost on refresh; dummy events start with no images and render a gradient placeholder (same visual pattern Products uses for its "IMG" placeholder) until a real file is picked.
- Next steps / notes for other devs: Nothing is persisted past a page refresh — this is all in-memory `useState`, same caveat as `ProductsContext`. The small chevron button in the bottom-right of each card image (visible in the Figma) is currently a non-functional placeholder — no dropdown menu wired yet. Bullet-point drag handles are visual only (no real reordering).

### 2026-08-19 — Fatima — Sales & Analytics (Import In-Store Sales CSV flow)
- Branch: `fatima/sales-analytics`
- Status: in progress
- Changes: Implemented the "Import CSV" flow on the In-Store Sales tab as a 5-screen modal: Upload File → Map & Preview → Review & Confirm → Import complete (success) / Invalid entry (error). New folder `admin/components/sales/import-csv/` — `ImportCsvModal.tsx` (orchestrator + stepper header), `UploadStep.tsx`, `MappingStep.tsx`, `ReviewStep.tsx`, `ResultStep.tsx`, `csvUtils.ts`, `types.ts`. Wired to the "Import CSV" button in `SalesAnalytics.tsx` via a `showImportModal` state flag.
- **This is real, working client-side functionality, not just UI:** drag-and-drop or file-picker upload, `.csv` file-type validation (extension + MIME, rejects e.g. `.xlsx` with an inline error), an actual CSV parser (`csvUtils.ts`, handles quoted fields/commas), header-based auto-mapping to the app's target fields (fuzzy/exact name match, user-editable via dropdowns), and real per-row validation (missing required fields, invalid dates, non-numeric amounts) plus duplicate-transaction-ID detection. The Review step's summary stats (total/valid/invalid/duplicate rows, date range, store count, total sales amount) are computed live from the parsed file — nothing hardcoded. "Download Sample CSV" generates and downloads a real CSV via a Blob URL. Verified the parsing/validation/mapping logic directly with `npx tsx` against a deliberately messy sample CSV (missing ID, non-numeric amount, duplicate ID) — all four issue types were caught correctly.
- What's still just UI/simulated: there's no backend to actually persist imported rows — "Import Data" branches to the success or error screen based on the computed validation results, but nothing is written anywhere. "Review Flagged Rows" just navigates back to the Review step (no per-row flagging UI in the preview table beyond a red row tint for invalid rows).
- Reused a local `SalesStatusBadge`-style tone system for stepper/summary coloring rather than pulling in `StatusBadge` (still only on the unmerged `fatima/orders` branch — same situation as noted in the prior entry).
- Next steps / notes for other devs: `REQUIRED_FIELDS` (5 of the 6 target fields — `Product Code` is optional) drives both the "X of 5 columns mapped" gate on the Mapping step and the Review step's preview columns; if the real schema needs different required fields, update `types.ts`. Store/Event Exhibition Type toggle (Store/Event Exhibition/Both) is currently cosmetic only — not yet wired into validation or the summary.

### 2026-08-19 — Fatima — Sales & Analytics (In-Store + Website tabs)
- Branch: `fatima/sales-analytics`
- Status: in progress
- Changes: Implemented the In-Store Sales and Website Sales tabs (previously placeholders). Each tab now swaps the page title/subtitle, header action buttons (Overview & Website Sales get Filter+Export; In-Store Sales gets Export+Import CSV), and the two stat card labels/values via a `tabConfig` map in `SalesAnalytics.tsx`. Revenue Overview chart and Sales by Channel card are shared across all three tabs; the bottom table swaps per tab: Top Performing Products (Overview) / Sales by Store table (In-Store) / Recent Website Orders (Website). New files: `components/sales/{SalesByStoreTable,RecentWebsiteOrders,SalesStatusBadge}.tsx`, plus `StoreSalesRow`/`WebsiteOrderRow`/`WebsiteOrderStatus` types and matching dummy data.
- Fixed the tab-bar styling to match the reference design once all three tab states were visible: switched from a brand-dark-filled active pill to a light `bg-brand-bg` bar with a white/shadow active pill — the same visual pattern already used by the Daily/Weekly/Monthly/Yearly tabs inside `RevenueOverviewChart`, so it's now consistent both within the page and with `SalesOverview.tsx` on the Dashboard.
- Added `SalesStatusBadge` (In-Store/Website tabs) as its own small component scoped to `components/sales/` rather than reusing the shared `StatusBadge` from the Orders module — that component only exists on the not-yet-merged `fatima/orders` branch, unavailable here. **Note for whoever merges:** once `fatima/orders` lands, swap `SalesStatusBadge` for the shared `components/ui/StatusBadge.tsx` and delete the duplicate (same reconciliation already flagged for `CustomerDetail.tsx`'s local badge).
- Next steps / notes for other devs: Filter/Export/Import CSV buttons are all no-ops. All three tabs' stat/chart/table data is static dummy data, not derived from each other (e.g. Website Revenue and In-Store Revenue don't sum to Total Revenue).
- Follow-up: removed the trend text ("↑ X% vs last month") from `SalesStatCard` per feedback — same "no trend text on stat cards" preference already applied to the Customers module. `SalesStatCard` no longer accepts a `trend` prop at all.

### 2026-08-19 — Fatima — Sales & Analytics
- Branch: `fatima/sales-analytics`
- Status: in progress
- Changes: Implemented the Sales & Analytics page (`frontend/src/admin/pages/SalesAnalytics.tsx`) — Overview/In-Store Sales/Website Sales tabs (only Overview has real content, other two are placeholders), Total Revenue / Avg. Order Value stat cards with trend, a Revenue Overview chart, a Sales by Channel breakdown, and a Top Performing Products table. New files: `admin/types/sales.ts`, `admin/data/salesAnalytics.ts`, `admin/components/sales/{RevenueOverviewChart,ChannelBreakdown,TopPerformingProducts,SalesStatCard}.tsx`.
- **IMPORTANT — repo restructure landed on `main` while Customers/Orders work was in flight:** `frontend/src/{pages,components,types,context}` were all moved under a new `frontend/src/admin/` folder, plus a new `frontend/src/web/` public site was added, routing moved to relative paths mounted under `/admin/*` in `App.tsx`, `Header.tsx` is now actually implemented (page title + admin profile), `tailwind.config.js` was deleted in favor of Tailwind v4's CSS-based `@theme` in `admin/theme.css`, and `recharts` was added as a dependency. Color tokens are unchanged (same names), so existing className usage still works — only file locations and the config mechanism changed.
- Built this page fresh against the new `admin/` structure directly off updated `main`, so it's clean. **`fatima/customers` and `fatima/orders` are NOT yet updated for this restructure** — they still have pages/components/types/data at the old top-level `frontend/src/` paths and use absolute route definitions in `App.tsx`. Both branches need their files moved under `frontend/src/admin/` (and imports adjusted) before merging, or the merge will effectively re-create the old structure duplicated alongside the new one. Do this rebase before opening PRs for those two branches.
- Reused the existing `admin/components/dashboard/SalesOverview.tsx` recharts pattern (dual-line, tabbed) for the new `RevenueOverviewChart`, since that convention was already established. Deliberately did NOT add a trend prop to the shared `admin/components/ui/StatCard.tsx` (per earlier feedback that Customers' cards shouldn't show trend text) — built a page-local `SalesStatCard` instead, since this page's design does call for trend indicators.
- Next steps / notes for other devs: In-Store Sales / Website Sales tabs are unbuilt placeholders — no Figma given for those yet. Filter/Export buttons are no-ops. All chart/table data is dummy, hardcoded in `data/salesAnalytics.ts`.

### 2026-08-19 — Fatima — Orders (migrated to admin/ structure)
- Branch: `fatima/orders`
- Status: in progress
- Changes: Migrated the Orders list + detail pages onto the new `frontend/src/admin/` structure after another dev's restructure landed on `main` (see [[project-munay-folder-structure]] in memory). Files moved: `pages/{Orders,OrderDetail}.tsx`, `types/order.ts`, `data/orders.ts`, `components/ui/StatusBadge.tsx` all now under `frontend/src/admin/`. Pure relocation, no logic changes — relative imports resolve identically one level deeper under `admin/`. `App.tsx` updated to add the `OrderDetail` lazy import and a relative `/orders/:orderId` route inside `AdminRoutes`.
- Next steps / notes for other devs: same caveats as before the migration — Print Invoice/Update Status/Save Note are no-ops, filter/search/sort/pagination are visual-only, and "View Profile" on the order detail page still reuses the order id as a stand-in customer id.

### 2026-08-19 — Fatima — Customers (migrated to admin/ structure)
- Branch: `fatima/customers`
- Status: in progress
- Changes: Migrated the Customers list + detail pages onto the new `frontend/src/admin/` structure (see [[project-munay-folder-structure]] in memory, or ask Fatima) after another dev's restructure landed on `main`. Files moved: `pages/{Customers,CustomerDetail}.tsx`, `types/customer.ts`, `data/customers.ts` all now under `frontend/src/admin/`. No content/logic changes — pure relocation, since all relative imports (`../components/...`, `../data/...`) resolve identically one level deeper under `admin/`. `App.tsx` updated to add the `CustomerDetail` lazy import and a relative `/customers/:customerId` route inside `AdminRoutes` (previously an absolute `/admin/customers/:customerId` top-level route, back when `App.tsx` had no admin/web split).
- Original implementation notes (stat cards, table, detail page with timeline-less orders list, contact card, eye icon linking) carry over unchanged — see prior session for full rationale if needed.
- Next steps / notes for other devs: `CustomerDetail.tsx` still has its own local status-badge markup inline (not yet using the shared `admin/components/ui/StatusBadge.tsx` that the Orders module introduced) — swap it over once `fatima/orders` also merges. All customer ids still resolve to the same dummy detail content.
