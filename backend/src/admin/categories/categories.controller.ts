import { MainCategory } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../shared/middleware/errorHandler.js";
import * as categoriesService from "./categories.service.js";

function isMainCategory(value: unknown): value is MainCategory {
  return typeof value === "string" && (Object.values(MainCategory) as string[]).includes(value);
}

export async function listMain(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(categoriesService.listMainCategories());
  } catch (err) {
    next(err);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { mainCategory } = req.query;
    if (mainCategory !== undefined && !isMainCategory(mainCategory)) {
      throw new HttpError(400, "Invalid mainCategory");
    }
    res.json(await categoriesService.listSubcategories(mainCategory as MainCategory | undefined));
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const subcategory = await categoriesService.getSubcategory(req.params.id);
    if (!subcategory) throw new HttpError(404, "Subcategory not found");
    res.json(subcategory);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { mainCategory, name, group, sortOrder } = req.body;
    if (!name || !isMainCategory(mainCategory)) {
      throw new HttpError(400, "name and a valid mainCategory are required");
    }
    res.status(201).json(await categoriesService.createSubcategory({ mainCategory, name, group, sortOrder }));
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { mainCategory, name, group, sortOrder } = req.body;
    if (mainCategory !== undefined && !isMainCategory(mainCategory)) {
      throw new HttpError(400, "Invalid mainCategory");
    }
    res.json(await categoriesService.updateSubcategory(req.params.id, { mainCategory, name, group, sortOrder }));
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await categoriesService.deleteSubcategory(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
