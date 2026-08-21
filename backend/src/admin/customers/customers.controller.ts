import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../shared/middleware/errorHandler.js";
import * as customersService from "./customers.service.js";

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await customersService.listCustomers());
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const customer = await customersService.getCustomer(req.params.id);
    if (!customer) throw new HttpError(404, "Customer not found");
    res.json(customer);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, name, phone } = req.body;
    if (!email || !name) throw new HttpError(400, "email and name are required");
    res.status(201).json(await customersService.createCustomer({ email, name, phone }));
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, name, phone } = req.body;
    res.json(await customersService.updateCustomer(req.params.id, { email, name, phone }));
  } catch (err) {
    next(err);
  }
}
