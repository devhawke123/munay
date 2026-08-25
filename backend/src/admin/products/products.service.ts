import { Prisma } from "@prisma/client";
import type { MainCategory, ProductStatus } from "@prisma/client";
import { prisma } from "../../db.js";
import { HttpError } from "../shared/middleware/errorHandler.js";

const ACTIVE_ORDER_STATUSES: Prisma.OrderWhereInput = {
  status: { not: "CANCELLED" },
};

const PRODUCT_LIST_INCLUDE = {
  subcategory: true,
  images: true,
  variants: { include: { inventory: true } },
  orderItems: {
    where: { order: ACTIVE_ORDER_STATUSES },
    select: { quantity: true, lineTotal: true },
  },
} satisfies Prisma.ProductInclude;

type ProductWithComputeds = Prisma.ProductGetPayload<{ include: typeof PRODUCT_LIST_INCLUDE }>;

export type StockStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

function toSummary(product: ProductWithComputeds) {
  const inventory = product.variants.flatMap((variant) => variant.inventory);
  const stock = inventory.reduce((sum, row) => sum + row.quantityOnHand, 0);
  const isLowStock = inventory.some((row) => row.quantityOnHand > 0 && row.quantityOnHand <= row.reorderPoint);
  const stockStatus: StockStatus = stock === 0 ? "OUT_OF_STOCK" : isLowStock ? "LOW_STOCK" : "IN_STOCK";

  const sold = product.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const revenue = product.orderItems.reduce((sum, item) => sum + Number(item.lineTotal), 0);

  const { orderItems: _orderItems, ...rest } = product;

  return {
    ...rest,
    category: `${product.subcategory.mainCategory} / ${product.subcategory.name}`,
    stock,
    stockStatus,
    sold,
    revenue,
  };
}

export interface ProductListFilters {
  mainCategory?: MainCategory;
  subcategoryId?: string;
  status?: ProductStatus;
  stockStatus?: StockStatus;
  search?: string;
}

export async function listProducts(filters: ProductListFilters = {}) {
  const { mainCategory, subcategoryId, status, stockStatus, search } = filters;

  const products = await prisma.product.findMany({
    where: {
      status,
      subcategoryId,
      subcategory: mainCategory ? { mainCategory } : undefined,
      name: search ? { contains: search } : undefined,
    },
    include: PRODUCT_LIST_INCLUDE,
    orderBy: { createdAt: "desc" },
  });

  const rows = products.map(toSummary);
  return stockStatus ? rows.filter((row) => row.stockStatus === stockStatus) : rows;
}

export async function getProduct(id: string) {
  const product = await prisma.product.findUnique({ where: { id }, include: PRODUCT_LIST_INCLUDE });
  return product ? toSummary(product) : null;
}

interface ProductImageInput {
  path: string;
  isMain?: boolean;
  sortOrder?: number;
}

interface ProductVariantStockInput {
  color: string;
  size: string;
  quantityOnHand: number;
}

export interface ProductWriteInput {
  name: string;
  description?: string;
  subcategoryId: string;
  section?: string;
  price: number;
  sku: string;
  barcode?: string;
  brand?: string;
  composition?: string;
  weight?: string;
  dimensions?: string;
  origin?: string;
  tags?: string[];
  status?: ProductStatus;
  images?: ProductImageInput[];
  stock?: ProductVariantStockInput[];
  warehouseId?: string;
}

function slugifySkuPart(value: string) {
  return value.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "-");
}

async function replaceVariantsAndImages(tx: Prisma.TransactionClient, productId: string, data: ProductWriteInput) {
  await tx.productImage.deleteMany({ where: { productId } });
  if (data.images?.length) {
    await tx.productImage.createMany({
      data: data.images.map((image, index) => ({
        productId,
        path: image.path,
        isMain: image.isMain ?? index === 0,
        sortOrder: image.sortOrder ?? index,
      })),
    });
  }

  if (data.stock?.length) {
    if (!data.warehouseId) throw new HttpError(400, "warehouseId is required to record variant stock");

    const existingVariants = await tx.productVariant.findMany({ where: { productId }, select: { id: true } });
    if (existingVariants.length) {
      await tx.inventory.deleteMany({ where: { variantId: { in: existingVariants.map((v) => v.id) } } });
      await tx.productVariant.deleteMany({ where: { productId } });
    }

    for (const variant of data.stock) {
      const created = await tx.productVariant.create({
        data: {
          productId,
          sku: `${data.sku}-${slugifySkuPart(variant.color)}-${slugifySkuPart(variant.size)}`,
          color: variant.color,
          size: variant.size,
          price: data.price,
          status: data.status,
        },
      });

      await tx.inventory.create({
        data: {
          variantId: created.id,
          warehouseId: data.warehouseId,
          quantityOnHand: variant.quantityOnHand,
        },
      });
    }
  }
}

export async function createProduct(data: ProductWriteInput) {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        name: data.name,
        description: data.description,
        sku: data.sku,
        subcategoryId: data.subcategoryId,
        section: data.section,
        price: data.price,
        barcode: data.barcode,
        brand: data.brand,
        composition: data.composition,
        weight: data.weight,
        dimensions: data.dimensions,
        origin: data.origin,
        tags: data.tags ?? undefined,
        status: data.status,
      },
    });

    await replaceVariantsAndImages(tx, product.id, data);

    return tx.product.findUniqueOrThrow({ where: { id: product.id }, include: PRODUCT_LIST_INCLUDE });
  });
}

export async function updateProduct(id: string, data: Partial<ProductWriteInput>) {
  return prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        sku: data.sku,
        subcategoryId: data.subcategoryId,
        section: data.section,
        price: data.price,
        barcode: data.barcode,
        brand: data.brand,
        composition: data.composition,
        weight: data.weight,
        dimensions: data.dimensions,
        origin: data.origin,
        tags: data.tags ?? undefined,
        status: data.status,
      },
    });

    if (data.images !== undefined || data.stock !== undefined) {
      const current = await tx.product.findUniqueOrThrow({ where: { id }, select: { sku: true, price: true } });
      await replaceVariantsAndImages(tx, id, {
        ...(data as ProductWriteInput),
        sku: data.sku ?? current.sku,
        price: data.price ?? Number(current.price),
      });
    }

    return tx.product.findUniqueOrThrow({ where: { id }, include: PRODUCT_LIST_INCLUDE });
  });
}

export async function deleteProduct(id: string) {
  try {
    await prisma.$transaction(async (tx) => {
      const variants = await tx.productVariant.findMany({ where: { productId: id }, select: { id: true } });
      await tx.inventory.deleteMany({ where: { variantId: { in: variants.map((v) => v.id) } } });
      await tx.productImage.deleteMany({ where: { productId: id } });
      await tx.productVariant.deleteMany({ where: { productId: id } });
      await tx.product.delete({ where: { id } });
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2003") {
      throw new HttpError(409, "Cannot delete a product with order history — archive it instead");
    }
    throw err;
  }
}
