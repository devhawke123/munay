# Munay

Online store monorepo (admin dashboard first, then customer site).

## Stack

- **Frontend:** Vite + React + TypeScript (`frontend`)
- **Backend:** Express + TypeScript (`backend`)
- **Database:** Postgres via Prisma

## Prerequisites

- Node.js 20+
- A running Postgres instance

## Setup

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# Edit DATABASE_URL in backend/.env to match your Postgres credentials
npm install
npm run db:generate
npm run db:migrate
```

Prisma reads `DATABASE_URL` from `backend/.env`. The API also loads the repo-root `.env` if present.

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
