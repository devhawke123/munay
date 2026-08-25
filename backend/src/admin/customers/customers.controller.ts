import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../shared/middleware/errorHandler.js";
import * as customersService from "./customers.service.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { search } = req.query;
    res.json(await customersService.listCustomers({ search: search as string | undefined }));
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
    const { email, name, phone, city, state, country } = req.body;
    if (!email || !name) throw new HttpError(400, "email and name are required");
    res.status(201).json(await customersService.createCustomer({ email, name, phone, city, state, country }));
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, name, phone, city, state, country } = req.body;
    res.json(await customersService.updateCustomer(req.params.id, { email, name, phone, city, state, country }));
  } catch (err) {
    next(err);
  }
}
