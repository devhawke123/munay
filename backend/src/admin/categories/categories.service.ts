import { MainCategory } from "@prisma/client";
import { prisma } from "../../db.js";

// Fixed by the site's structure — not stored in the DB. Keep in sync with the MainCategory enum.
export function listMainCategories(): MainCategory[] {
  return Object.values(MainCategory);
}

export function listSubcategories(mainCategory?: MainCategory) {
  return prisma.subcategory.findMany({
    where: mainCategory ? { mainCategory } : undefined,
    orderBy: [{ mainCategory: "asc" }, { sortOrder: "asc" }],
  });
}

export function getSubcategory(id: string) {
  return prisma.subcategory.findUnique({ where: { id } });
}

interface CreateSubcategoryInput {
  mainCategory: MainCategory;
  name: string;
  group?: string;
  sortOrder?: number;
}

export function createSubcategory(data: CreateSubcategoryInput) {
  return prisma.subcategory.create({ data });
}

interface UpdateSubcategoryInput {
  mainCategory?: MainCategory;
  name?: string;
  group?: string;
  sortOrder?: number;
}

export function updateSubcategory(id: string, data: UpdateSubcategoryInput) {
  return prisma.subcategory.update({ where: { id }, data });
}

export function deleteSubcategory(id: string) {
  return prisma.subcategory.delete({ where: { id } });
}
