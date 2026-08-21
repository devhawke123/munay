import { Router } from "express";
import * as ordersController from "./orders.controller.js";

export const ordersRouter = Router();

ordersRouter.get("/", ordersController.list);
ordersRouter.get("/:id", ordersController.getById);
ordersRouter.patch("/:id/status", ordersController.updateStatus);
