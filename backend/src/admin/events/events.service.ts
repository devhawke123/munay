import type { EventStatus, EventType, Prisma } from "@prisma/client";
import { prisma } from "../../db.js";

const EVENT_INCLUDE = { images: true } satisfies Prisma.EventInclude;
type EventWithImages = Prisma.EventGetPayload<{ include: typeof EVENT_INCLUDE }>;

function isSameDay(a: Date, b: Date) {
  return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate();
}

function formatMonthYear(date: Date): string {
  return date.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

function formatDateRange(startsAt: Date, endsAt: Date | null): string {
  const startDay = startsAt.getUTCDate();
  const startMonth = startsAt.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const startYear = startsAt.getUTCFullYear();

  if (!endsAt || isSameDay(startsAt, endsAt)) {
    return `${startDay} ${startMonth} ${startYear}`;
  }

  const endDay = endsAt.getUTCDate();
  const sameMonth = startsAt.getUTCMonth() === endsAt.getUTCMonth() && startYear === endsAt.getUTCFullYear();
  if (sameMonth) return `${startDay} – ${endDay} ${startMonth} ${startYear}`;

  const endMonth = endsAt.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  return `${startDay} ${startMonth} ${startYear} – ${endDay} ${endMonth} ${endsAt.getUTCFullYear()}`;
}

function toSummary(event: EventWithImages) {
  const { images, ...rest } = event;
  const poster = images.find((i) => i.role === "POSTER") ?? null;
  const hero = images.find((i) => i.role === "HERO") ?? null;
  const gallery = images.filter((i) => i.role === "GALLERY").sort((a, b) => a.sortOrder - b.sortOrder);

  return {
    ...rest,
    bulletPoints: (rest.bulletPoints as string[] | null) ?? [],
    monthYear: formatMonthYear(event.startsAt),
    dateRange: formatDateRange(event.startsAt, event.endsAt),
    posterImage: poster?.path ?? null,
    heroImage: hero?.path ?? poster?.path ?? null,
    galleryImages: gallery.map((g) => g.path),
  };
}

export interface EventListFilters {
  status?: EventStatus;
}

export async function listEvents(filters: EventListFilters = {}) {
  const events = await prisma.event.findMany({
    where: { status: filters.status },
    include: EVENT_INCLUDE,
    orderBy: { startsAt: "desc" },
  });
  return events.map(toSummary);
}

export async function getEvent(id: string) {
  const event = await prisma.event.findUnique({ where: { id }, include: EVENT_INCLUDE });
  return event ? toSummary(event) : null;
}

export interface EventWriteInput {
  title: string;
  description?: string;
  location?: string;
  standSubtitle?: string;
  venueCallout?: string;
  bulletPoints?: string[];
  type?: EventType;
  status?: EventStatus;
  startsAt: Date;
  endsAt?: Date | null;
  posterImage?: string;
  heroImage?: string;
  galleryImages?: string[];
}

async function setImages(tx: Prisma.TransactionClient, eventId: string, data: Partial<EventWriteInput>) {
  if (data.posterImage !== undefined) {
    await tx.eventImage.deleteMany({ where: { eventId, role: "POSTER" } });
    if (data.posterImage) await tx.eventImage.create({ data: { eventId, role: "POSTER", path: data.posterImage } });
  }
  if (data.heroImage !== undefined) {
    await tx.eventImage.deleteMany({ where: { eventId, role: "HERO" } });
    if (data.heroImage) await tx.eventImage.create({ data: { eventId, role: "HERO", path: data.heroImage } });
  }
  if (data.galleryImages !== undefined) {
    await tx.eventImage.deleteMany({ where: { eventId, role: "GALLERY" } });
    if (data.galleryImages.length) {
      await tx.eventImage.createMany({
        data: data.galleryImages.map((path, index) => ({ eventId, role: "GALLERY" as const, path, sortOrder: index })),
      });
    }
  }
}

export async function createEvent(data: EventWriteInput) {
  return prisma.$transaction(async (tx) => {
    const event = await tx.event.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        standSubtitle: data.standSubtitle,
        venueCallout: data.venueCallout,
        bulletPoints: data.bulletPoints ?? undefined,
        type: data.type,
        status: data.status,
        startsAt: data.startsAt,
        endsAt: data.endsAt,
      },
    });
    await setImages(tx, event.id, data);
    const full = await tx.event.findUniqueOrThrow({ where: { id: event.id }, include: EVENT_INCLUDE });
    return toSummary(full);
  });
}

export async function updateEvent(id: string, data: Partial<EventWriteInput>) {
  return prisma.$transaction(async (tx) => {
    await tx.event.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        standSubtitle: data.standSubtitle,
        venueCallout: data.venueCallout,
        bulletPoints: data.bulletPoints ?? undefined,
        type: data.type,
        status: data.status,
        startsAt: data.startsAt,
        endsAt: data.endsAt,
      },
    });
    await setImages(tx, id, data);
    const full = await tx.event.findUniqueOrThrow({ where: { id }, include: EVENT_INCLUDE });
    return toSummary(full);
  });
}

export async function deleteEvent(id: string) {
  await prisma.eventImage.deleteMany({ where: { eventId: id } });
  await prisma.event.delete({ where: { id } });
}
