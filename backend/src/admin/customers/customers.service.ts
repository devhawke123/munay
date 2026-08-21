import { prisma } from "../../db.js";

export function listCustomers() {
  return prisma.customer.findMany({ orderBy: { createdAt: "desc" } });
}

export function getCustomer(id: string) {
  return prisma.customer.findUnique({
    where: { id },
    include: { orders: true },
  });
}

interface CreateCustomerInput {
  email: string;
  name: string;
  phone?: string;
}

export function createCustomer(data: CreateCustomerInput) {
  return prisma.customer.create({ data });
}

interface UpdateCustomerInput {
  email?: string;
  name?: string;
  phone?: string;
}

export function updateCustomer(id: string, data: UpdateCustomerInput) {
  return prisma.customer.update({ where: { id }, data });
}
