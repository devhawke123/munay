import { Router } from "express";
import * as eventsController from "./events.controller.js";

export const eventsRouter = Router();

eventsRouter.get("/", eventsController.list);
eventsRouter.get("/:id", eventsController.getById);
eventsRouter.post("/", eventsController.create);
eventsRouter.patch("/:id", eventsController.update);
eventsRouter.delete("/:id", eventsController.remove);
