import { WarehouseType } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../shared/middleware/errorHandler.js";
import * as inventoryService from "./inventory.service.js";

function isWarehouseType(value: unknown): value is WarehouseType {
  return typeof value === "string" && (Object.values(WarehouseType) as string[]).includes(value);
}

export async function listWarehouses(req: Request, res: Response, next: NextFunction) {
  try {
    const { type } = req.query;
    if (type !== undefined && !isWarehouseType(type)) throw new HttpError(400, "Invalid type");
    res.json(await inventoryService.listWarehousesWithItems(type as WarehouseType | undefined));
  } catch (err) {
    next(err);
  }
}

export async function createWarehouse(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, type, location, address } = req.body;
    if (!name) throw new HttpError(400, "name is required");
    if (type !== undefined && !isWarehouseType(type)) throw new HttpError(400, "Invalid type");
    res.status(201).json(await inventoryService.createWarehouse({ name, type, location, address }));
  } catch (err) {
    next(err);
  }
}

export async function getWarehouse(req: Request, res: Response, next: NextFunction) {
  try {
    const warehouse = await inventoryService.getWarehouseWithItems(req.params.warehouseId);
    if (!warehouse) throw new HttpError(404, "Warehouse not found");
    res.json(warehouse);
  } catch (err) {
    next(err);
  }
}

export async function adjustProductStock(req: Request, res: Response, next: NextFunction) {
  try {
    const { totalStock } = req.body;
    if (typeof totalStock !== "number") throw new HttpError(400, "totalStock is required");
    res.json(
      await inventoryService.adjustProductStock(req.params.warehouseId, req.params.productId, totalStock),
    );
  } catch (err) {
    next(err);
  }
}

export async function bulkAdjustStock(req: Request, res: Response, next: NextFunction) {
  try {
    const { updates } = req.body;
    if (!Array.isArray(updates) || updates.length === 0) {
      throw new HttpError(400, "updates must be a non-empty array");
    }
    for (const update of updates) {
      if (!update.productId || typeof update.totalStock !== "number") {
        throw new HttpError(400, "Each update requires productId and totalStock");
      }
    }
    res.json(await inventoryService.bulkAdjustStock(req.params.warehouseId, updates));
  } catch (err) {
    next(err);
  }
}

export async function getOnlineWarehouse(_req: Request, res: Response, next: NextFunction) {
  try {
    const warehouse = await inventoryService.getOrCreateOnlineWarehouse();
    const full = await inventoryService.getWarehouseWithItems(warehouse.id);
    res.json(full);
  } catch (err) {
    next(err);
  }
}

export async function simulateOnlineOrder(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await inventoryService.simulateOnlineOrder());
  } catch (err) {
    next(err);
  }
}

export async function listOnlineDeductions(req: Request, res: Response, next: NextFunction) {
  try {
    const { limit } = req.query;
    res.json(await inventoryService.listOnlineDeductions(limit ? Number(limit) : undefined));
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
    const { warehouseId, csv, fileName, importedBy } = req.body;
    if (!warehouseId || !csv) throw new HttpError(400, "warehouseId and csv are required");
    res.json(await inventoryService.importInventoryFromCsv(warehouseId, csv, fileName, importedBy));
  } catch (err) {
    next(err);
  }
}
