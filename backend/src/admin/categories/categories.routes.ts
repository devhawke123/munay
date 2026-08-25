import { Router } from "express";
import * as categoriesController from "./categories.controller.js";

export const categoriesRouter = Router();

categoriesRouter.get("/main", categoriesController.listMain);
categoriesRouter.get("/", categoriesController.list);
categoriesRouter.get("/:id", categoriesController.getById);
categoriesRouter.post("/", categoriesController.create);
categoriesRouter.patch("/:id", categoriesController.update);
categoriesRouter.delete("/:id", categoriesController.remove);
