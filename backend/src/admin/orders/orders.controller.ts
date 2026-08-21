import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../shared/middleware/errorHandler.js";
import * as ordersService from "./orders.service.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { channel, status } = req.query;
    res.json(
      await ordersService.listOrders({
        channel: channel as never,
        status: status as never,
      }),
    );
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await ordersService.getOrder(req.params.id);
    if (!order) throw new HttpError(404, "Order not found");
    res.json(order);
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { status } = req.body;
    if (!status) throw new HttpError(400, "status is required");
    res.json(await ordersService.updateOrderStatus(req.params.id, status));
  } catch (err) {
    next(err);
  }
}
