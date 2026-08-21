import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../shared/middleware/errorHandler.js";
import * as inventoryService from "./inventory.service.js";

export async function listWarehouses(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await inventoryService.listWarehouses());
  } catch (err) {
    next(err);
  }
}

export async function createWarehouse(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, location, address } = req.body;
    if (!name) throw new HttpError(400, "name is required");
    res.status(201).json(await inventoryService.createWarehouse({ name, location, address }));
  } catch (err) {
    next(err);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { warehouseId } = req.query;
    res.json(await inventoryService.listInventory(warehouseId as string | undefined));
  } catch (err) {
    next(err);
  }
}

export async function listImports(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await inventoryService.listImportsForWarehouse(req.params.warehouseId));
  } catch (err) {
    next(err);
  }
}

export async function importCsv(req: Request, res: Response, next: NextFunction) {
  try {
    const { warehouseId, filePath, importedBy } = req.body;
    if (!warehouseId || !filePath) throw new HttpError(400, "warehouseId and filePath are required");
    res.json(await inventoryService.importInventoryFromCsv(warehouseId, filePath, importedBy));
  } catch (err) {
    next(err);
  }
}
