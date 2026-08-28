import { SalesChannel } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../shared/middleware/errorHandler.js";
import * as salesService from "./sales.service.js";
import type { Granularity } from "./sales.service.js";

function isSalesChannel(value: unknown): value is SalesChannel {
  return typeof value === "string" && (Object.values(SalesChannel) as string[]).includes(value);
}

const GRANULARITIES: Granularity[] = ["daily", "weekly", "monthly", "yearly"];
function isGranularity(value: unknown): value is Granularity {
  return typeof value === "string" && (GRANULARITIES as string[]).includes(value);
}

function parseDateRange(query: Request["query"]) {
  const { start, end } = query;
  const startDate = start ? new Date(start as string) : undefined;
  const endDate = end ? new Date(end as string) : undefined;
  if (start && Number.isNaN(startDate?.getTime())) throw new HttpError(400, "Invalid start date");
  if (end && Number.isNaN(endDate?.getTime())) throw new HttpError(400, "Invalid end date");
  return { start: startDate, end: endDate };
}

export async function getSummary(req: Request, res: Response, next: NextFunction) {
  try {
    const { channel } = req.query;
    if (channel !== undefined && !isSalesChannel(channel)) throw new HttpError(400, "Invalid channel");
    res.json(
      await salesService.getSummary({ channel: channel as SalesChannel | undefined, ...parseDateRange(req.query) }),
    );
  } catch (err) {
    next(err);
  }
}

export async function getRevenueOverview(req: Request, res: Response, next: NextFunction) {
  try {
    const { channel, granularity } = req.query;
    if (channel !== undefined && !isSalesChannel(channel)) throw new HttpError(400, "Invalid channel");
    if (granularity !== undefined && !isGranularity(granularity)) throw new HttpError(400, "Invalid granularity");
    res.json(
      await salesService.getRevenueOverview({
        channel: channel as SalesChannel | undefined,
        granularity: (granularity as Granularity | undefined) ?? "daily",
        ...parseDateRange(req.query),
      }),
    );
  } catch (err) {
    next(err);
  }
}

export async function getChannelBreakdown(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await salesService.getChannelBreakdown(parseDateRange(req.query)));
  } catch (err) {
    next(err);
  }
}

export async function getTopProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const { limit } = req.query;
    res.json(
      await salesService.getTopProducts({ limit: limit ? Number(limit) : undefined, ...parseDateRange(req.query) }),
    );
  } catch (err) {
    next(err);
  }
}

export async function getSalesByStore(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await salesService.getSalesByStore(parseDateRange(req.query)));
  } catch (err) {
    next(err);
  }
}

export async function importInStoreSales(req: Request, res: Response, next: NextFunction) {
  try {
    const { csv } = req.body;
    if (!csv) throw new HttpError(400, "csv is required");
    res.json(await salesService.importInStoreSalesFromCsv(csv));
  } catch (err) {
    next(err);
  }
}
