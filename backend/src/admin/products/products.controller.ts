import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../shared/middleware/errorHandler.js";
import * as productsService from "./products.service.js";

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await productsService.listProducts());
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await productsService.getProduct(req.params.id);
    if (!product) throw new HttpError(404, "Product not found");
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, description, sku, subcategoryId, section, status } = req.body;
    if (!name || !sku || !subcategoryId) throw new HttpError(400, "name, sku and subcategoryId are required");
    res
      .status(201)
      .json(await productsService.createProduct({ name, description, sku, subcategoryId, section, status }));
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, description, sku, subcategoryId, section, status } = req.body;
    res.json(
      await productsService.updateProduct(req.params.id, { name, description, sku, subcategoryId, section, status }),
    );
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await productsService.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
