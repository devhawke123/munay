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
