import { EventStatus, EventType } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../shared/middleware/errorHandler.js";
import * as eventsService from "./events.service.js";

function isEventType(value: unknown): value is EventType {
  return typeof value === "string" && (Object.values(EventType) as string[]).includes(value);
}

function isEventStatus(value: unknown): value is EventStatus {
  return typeof value === "string" && (Object.values(EventStatus) as string[]).includes(value);
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { status } = req.query;
    if (status !== undefined && !isEventStatus(status)) throw new HttpError(400, "Invalid status");
    res.json(await eventsService.listEvents({ status: status as EventStatus | undefined }));
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const event = await eventsService.getEvent(req.params.id);
    if (!event) throw new HttpError(404, "Event not found");
    res.json(event);
  } catch (err) {
    next(err);
  }
}

function parseWritePayload(body: Record<string, unknown>) {
  const {
    title,
    description,
    location,
    standSubtitle,
    venueCallout,
    bulletPoints,
    type,
    status,
    startsAt,
    endsAt,
    posterImage,
    heroImage,
    galleryImages,
  } = body;

  if (type !== undefined && !isEventType(type)) throw new HttpError(400, "Invalid type");
  if (status !== undefined && !isEventStatus(status)) throw new HttpError(400, "Invalid status");

  return {
    title,
    description,
    location,
    standSubtitle,
    venueCallout,
    bulletPoints,
    type: type as EventType | undefined,
    status: status as EventStatus | undefined,
    startsAt: startsAt !== undefined ? new Date(startsAt as string) : undefined,
    endsAt: endsAt !== undefined ? (endsAt ? new Date(endsAt as string) : null) : undefined,
    posterImage,
    heroImage,
    galleryImages,
  } as eventsService.EventWriteInput;
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = parseWritePayload(req.body);
    if (!data.title || !data.startsAt || Number.isNaN(data.startsAt.getTime())) {
      throw new HttpError(400, "title and a valid startsAt are required");
    }
    res.status(201).json(await eventsService.createEvent(data));
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const data = parseWritePayload(req.body);
    if (data.startsAt && Number.isNaN(data.startsAt.getTime())) throw new HttpError(400, "Invalid startsAt");
    res.json(await eventsService.updateEvent(req.params.id, data));
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await eventsService.deleteEvent(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
