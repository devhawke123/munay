import { Router } from "express";
import * as salesController from "./sales.controller.js";

export const salesRouter = Router();

salesRouter.get("/summary", salesController.getSummary);
salesRouter.get("/revenue-overview", salesController.getRevenueOverview);
salesRouter.get("/channel-breakdown", salesController.getChannelBreakdown);
salesRouter.get("/top-products", salesController.getTopProducts);
salesRouter.get("/by-store", salesController.getSalesByStore);
salesRouter.post("/in-store/import", salesController.importInStoreSales);
