import type { Prisma } from "@prisma/client";
import { prisma } from "../../db.js";

function toLocation(customer: { city: string | null; state: string | null; country: string | null }) {
  return [customer.city, customer.state, customer.country].filter(Boolean).join(", ") || null;
}

export interface CustomerListFilters {
  search?: string;
}

export async function listCustomers(filters: CustomerListFilters = {}) {
  const { search } = filters;

  const customers = await prisma.customer.findMany({
    where: search
      ? { OR: [{ name: { contains: search } }, { email: { contains: search } }] }
      : undefined,
    orderBy: { createdAt: "desc" },
  });

  return customers.map((customer) => ({ ...customer, location: toLocation(customer) }));
}

const CUSTOMER_DETAIL_INCLUDE = {
  orders: {
    include: { items: true },
    orderBy: { createdAt: "desc" },
  },
} satisfies Prisma.CustomerInclude;

export async function getCustomer(id: string) {
  const customer = await prisma.customer.findUnique({ where: { id }, include: CUSTOMER_DETAIL_INCLUDE });
  if (!customer) return null;

  const { orders, ...rest } = customer;
  const nonCancelledOrders = orders.filter((order) => order.status !== "CANCELLED");
  const lifetimeValue = nonCancelledOrders.reduce((sum, order) => sum + Number(order.total), 0);
  const totalOrders = nonCancelledOrders.length;
  const avgOrder = totalOrders > 0 ? lifetimeValue / totalOrders : 0;
  const lastOrderAt = orders[0]?.createdAt ?? null;

  return {
    ...rest,
    location: toLocation(rest),
    lifetimeValue,
    totalOrders,
    avgOrder,
    lastOrderAt,
    orders: orders.map((order) => ({
      ...order,
      products: order.items.map((item) => item.productName).join(", "),
    })),
  };
}

interface CustomerWriteInput {
  email: string;
  name: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
}

export function createCustomer(data: CustomerWriteInput) {
  return prisma.customer.create({ data });
}

export function updateCustomer(id: string, data: Partial<CustomerWriteInput>) {
  return prisma.customer.update({ where: { id }, data });
}
