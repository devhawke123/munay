import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { categoriesRouter } from "./admin/categories/categories.routes.js";
import { customersRouter } from "./admin/customers/customers.routes.js";
import { eventsRouter } from "./admin/events/events.routes.js";
import { inventoryRouter } from "./admin/inventory/inventory.routes.js";
import { ordersRouter } from "./admin/orders/orders.routes.js";
import { productsRouter } from "./admin/products/products.routes.js";
import { salesRouter } from "./admin/sales/sales.routes.js";
import { errorHandler } from "./admin/shared/middleware/errorHandler.js";
import { uploadsRouter } from "./admin/uploads/upload.routes.js";
import { prisma } from "./db.js";
import { checkoutRouter } from "./public/checkout/checkout.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const app = express();

function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return true; // same-origin / curl / server-to-server
  if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return true;
  try {
    const host = new URL(origin).hostname;
    if (host.endsWith(".vercel.app")) return true;
  } catch {
    return false;
  }
  const allowed = (process.env.FRONTEND_URL ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return allowed.includes(origin);
}

app.use(
  cors({
    origin(origin, callback) {
      callback(null, isAllowedOrigin(origin));
    },
  }),
);
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true, db: "up" });
  } catch {
    res.status(503).json({ ok: false, db: "down" });
  }
});

app.use("/api/admin/categories", categoriesRouter);
app.use("/api/admin/products", productsRouter);
app.use("/api/admin/customers", customersRouter);
app.use("/api/admin/orders", ordersRouter);
app.use("/api/admin/inventory", inventoryRouter);
app.use("/api/admin/events", eventsRouter);
app.use("/api/admin/sales", salesRouter);
app.use("/api/admin/uploads", uploadsRouter);

// First public (unauthenticated-by-design) route group — everything else above is admin-only.
app.use("/api/public/checkout", checkoutRouter);

app.use(errorHandler);
