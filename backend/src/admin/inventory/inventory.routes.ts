import { Router } from "express";
import * as inventoryController from "./inventory.controller.js";

export const inventoryRouter = Router();

inventoryRouter.get("/warehouses", inventoryController.listWarehouses);
inventoryRouter.post("/warehouses", inventoryController.createWarehouse);
inventoryRouter.get("/warehouses/:warehouseId", inventoryController.getWarehouse);
inventoryRouter.get("/warehouses/:warehouseId/imports", inventoryController.listImports);
inventoryRouter.patch("/warehouses/:warehouseId/items", inventoryController.bulkAdjustStock);
inventoryRouter.patch("/warehouses/:warehouseId/items/:productId", inventoryController.adjustProductStock);

inventoryRouter.get("/online", inventoryController.getOnlineWarehouse);
inventoryRouter.post("/online/simulate-order", inventoryController.simulateOnlineOrder);
inventoryRouter.get("/online/deductions", inventoryController.listOnlineDeductions);

inventoryRouter.post("/import", inventoryController.importCsv);
