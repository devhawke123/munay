import { MainCategory, ProductStatus } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../shared/middleware/errorHandler.js";
import * as productsService from "./products.service.js";
import type { StockStatus } from "./products.service.js";

function isMainCategory(value: unknown): value is MainCategory {
  return typeof value === "string" && (Object.values(MainCategory) as string[]).includes(value);
}

function isProductStatus(value: unknown): value is ProductStatus {
  return typeof value === "string" && (Object.values(ProductStatus) as string[]).includes(value);
}

const STOCK_STATUSES: StockStatus[] = ["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"];
function isStockStatus(value: unknown): value is StockStatus {
  return typeof value === "string" && (STOCK_STATUSES as string[]).includes(value);
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { mainCategory, subcategoryId, status, stockStatus, search } = req.query;

    if (mainCategory !== undefined && !isMainCategory(mainCategory)) throw new HttpError(400, "Invalid mainCategory");
    if (status !== undefined && !isProductStatus(status)) throw new HttpError(400, "Invalid status");
    if (stockStatus !== undefined && !isStockStatus(stockStatus)) throw new HttpError(400, "Invalid stockStatus");

    res.json(
      await productsService.listProducts({
        mainCategory: mainCategory as MainCategory | undefined,
        subcategoryId: subcategoryId as string | undefined,
        status: status as ProductStatus | undefined,
        stockStatus: stockStatus as StockStatus | undefined,
        search: search as string | undefined,
      }),
    );
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

function parseWritePayload(body: Record<string, unknown>) {
  const {
    name,
    description,
    subcategoryIds,
    section,
    price,
    sku,
    barcode,
    brand,
    composition,
    weight,
    dimensions,
    origin,
    fiber,
    careInstructions,
    tags,
    status,
    images,
    stock,
    warehouseId,
  } = body;

  if (status !== undefined && !isProductStatus(status)) throw new HttpError(400, "Invalid status");
  if (subcategoryIds !== undefined && !Array.isArray(subcategoryIds)) {
    throw new HttpError(400, "subcategoryIds must be an array");
  }

  return {
    name,
    description,
    subcategoryIds,
    section,
    price: price !== undefined ? Number(price) : undefined,
    sku,
    barcode,
    brand,
    composition,
    weight,
    dimensions,
    origin,
    fiber,
    careInstructions,
    tags,
    status: status as ProductStatus | undefined,
    images,
    stock,
    warehouseId,
  } as productsService.ProductWriteInput;
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = parseWritePayload(req.body);
    if (!data.name || !data.sku || !data.subcategoryIds?.length || data.price === undefined) {
      throw new HttpError(400, "name, sku, subcategoryIds and price are required");
    }
    res.status(201).json(await productsService.createProduct(data));
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const data = parseWritePayload(req.body);
    res.json(await productsService.updateProduct(req.params.id, data));
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
