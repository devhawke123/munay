import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../../admin/shared/middleware/errorHandler.js";
import * as checkoutService from "./checkout.service.js";

export async function checkout(req: Request, res: Response, next: NextFunction) {
  try {
    const { customer, shipping, items } = req.body ?? {};

    if (!customer?.name || !customer?.email) {
      throw new HttpError(400, "customer.name and customer.email are required");
    }
    if (!shipping?.line1 || !shipping?.city || !shipping?.postalCode || !shipping?.country) {
      throw new HttpError(400, "shipping.line1, city, postalCode, and country are required");
    }
    if (!Array.isArray(items) || items.length === 0) {
      throw new HttpError(400, "items must be a non-empty array");
    }
    for (const item of items) {
      if (!item.variantId || typeof item.quantity !== "number" || item.quantity <= 0) {
        throw new HttpError(400, "Each item requires a variantId and a positive quantity");
      }
    }

    const result = await checkoutService.createCheckoutOrder({ customer, shipping, items });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}
