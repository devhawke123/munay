import { prisma } from "../../db.js";

export function listEvents() {
  return prisma.event.findMany({
    include: { images: true },
    orderBy: { startsAt: "desc" },
  });
}

export function getEvent(id: string) {
  return prisma.event.findUnique({
    where: { id },
    include: { images: true },
  });
}

interface CreateEventInput {
  title: string;
  description?: string;
  location?: string;
  startsAt: Date;
  endsAt?: Date;
}

export function createEvent(data: CreateEventInput) {
  return prisma.event.create({ data });
}

interface UpdateEventInput {
  title?: string;
  description?: string;
  location?: string;
  startsAt?: Date;
  endsAt?: Date;
}

export function updateEvent(id: string, data: UpdateEventInput) {
  return prisma.event.update({ where: { id }, data });
}

export function deleteEvent(id: string) {
  return prisma.event.delete({ where: { id } });
}
