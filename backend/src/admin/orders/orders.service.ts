import type { OrderStatus, SalesChannel } from "@prisma/client";
import { prisma } from "../../db.js";

export function listOrders(filters: { channel?: SalesChannel; status?: OrderStatus } = {}) {
  return prisma.order.findMany({
    where: filters,
    include: { customer: true, items: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getOrder(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: { customer: true, items: true },
  });
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  return prisma.order.update({ where: { id }, data: { status } });
}
