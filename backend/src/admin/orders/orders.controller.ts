import { Carrier, OrderStatus, SalesChannel } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../shared/middleware/errorHandler.js";
import * as ordersService from "./orders.service.js";

function isOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === "string" && (Object.values(OrderStatus) as string[]).includes(value);
}

function isSalesChannel(value: unknown): value is SalesChannel {
  return typeof value === "string" && (Object.values(SalesChannel) as string[]).includes(value);
}

function isCarrier(value: unknown): value is Carrier {
  return typeof value === "string" && (Object.values(Carrier) as string[]).includes(value);
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { channel, status, search } = req.query;

    if (channel !== undefined && !isSalesChannel(channel)) throw new HttpError(400, "Invalid channel");
    if (status !== undefined && !isOrderStatus(status)) throw new HttpError(400, "Invalid status");

    res.json(
      await ordersService.listOrders({
        channel: channel as SalesChannel | undefined,
        status: status as OrderStatus | undefined,
        search: search as string | undefined,
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
    if (!isOrderStatus(status)) throw new HttpError(400, "A valid status is required");
    res.json(await ordersService.updateOrderStatus(req.params.id, status));
  } catch (err) {
    next(err);
  }
}

export async function updateShipping(req: Request, res: Response, next: NextFunction) {
  try {
    const { carrier, trackingId } = req.body;
    if (carrier !== undefined && !isCarrier(carrier)) throw new HttpError(400, "Invalid carrier");
    res.json(await ordersService.updateOrderShipping(req.params.id, { carrier, trackingId }));
  } catch (err) {
    next(err);
  }
}
