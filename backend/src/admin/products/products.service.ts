import type { ProductStatus } from "@prisma/client";
import { prisma } from "../../db.js";

export function listProducts() {
  return prisma.product.findMany({
    include: { variants: true, images: true, subcategory: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { variants: true, images: true, subcategory: true },
  });
}

interface CreateProductInput {
  name: string;
  description?: string;
  sku: string;
  subcategoryId: string;
  section?: string;
  status?: ProductStatus;
}

export function createProduct(data: CreateProductInput) {
  return prisma.product.create({ data });
}

interface UpdateProductInput {
  name?: string;
  description?: string;
  sku?: string;
  subcategoryId?: string;
  section?: string;
  status?: ProductStatus;
}

export function updateProduct(id: string, data: UpdateProductInput) {
  return prisma.product.update({ where: { id }, data });
}

export function deleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}
