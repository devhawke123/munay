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
