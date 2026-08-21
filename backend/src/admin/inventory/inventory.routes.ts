import { Router } from "express";
import * as inventoryController from "./inventory.controller.js";

export const inventoryRouter = Router();

inventoryRouter.get("/warehouses", inventoryController.listWarehouses);
inventoryRouter.post("/warehouses", inventoryController.createWarehouse);
inventoryRouter.get("/warehouses/:warehouseId/imports", inventoryController.listImports);
inventoryRouter.get("/", inventoryController.list);
inventoryRouter.post("/import", inventoryController.importCsv);
