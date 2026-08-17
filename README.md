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
