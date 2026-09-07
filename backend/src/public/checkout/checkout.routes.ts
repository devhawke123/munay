import { Router } from "express";
import * as checkoutController from "./checkout.controller.js";

export const checkoutRouter = Router();

checkoutRouter.post("/", checkoutController.checkout);
