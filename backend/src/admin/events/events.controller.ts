import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../shared/middleware/errorHandler.js";
import * as eventsService from "./events.service.js";

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await eventsService.listEvents());
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

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, location, startsAt, endsAt } = req.body;
    if (!title || !startsAt) throw new HttpError(400, "title and startsAt are required");
    res.status(201).json(
      await eventsService.createEvent({
        title,
        description,
        location,
        startsAt: new Date(startsAt),
        endsAt: endsAt ? new Date(endsAt) : undefined,
      }),
    );
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, location, startsAt, endsAt } = req.body;
    res.json(
      await eventsService.updateEvent(req.params.id, {
        title,
        description,
        location,
        startsAt: startsAt ? new Date(startsAt) : undefined,
        endsAt: endsAt ? new Date(endsAt) : undefined,
      }),
    );
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
