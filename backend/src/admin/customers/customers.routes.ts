import { Router } from "express";
import * as customersController from "./customers.controller.js";

export const customersRouter = Router();

customersRouter.get("/", customersController.list);
customersRouter.get("/:id", customersController.getById);
customersRouter.post("/", customersController.create);
customersRouter.patch("/:id", customersController.update);
