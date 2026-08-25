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
import { errorHandler } from "./admin/shared/middleware/errorHandler.js";
import { prisma } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  }),
);
app.use(express.json());

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

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Munay API listening on http://localhost:${port}`);
});
