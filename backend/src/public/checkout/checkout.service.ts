import { prisma } from "../../db.js";
import { deductStock, getOrCreateOnlineWarehouse } from "../../admin/inventory/inventory.service.js";
import { HttpError } from "../../admin/shared/middleware/errorHandler.js";

export interface CheckoutItemInput {
  variantId: string;
  quantity: number;
}

export interface CheckoutInput {
  customer: { name: string; email: string; phone?: string };
  shipping: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  items: CheckoutItemInput[];
}

export async function createCheckoutOrder(input: CheckoutInput) {
  const { customer, shipping, items } = input;
  const onlineWarehouse = await getOrCreateOnlineWarehouse();

  return prisma.$transaction(async (tx) => {
    const variants = await tx.productVariant.findMany({
      where: { id: { in: items.map((i) => i.variantId) } },
      include: { product: true, inventory: { where: { warehouseId: onlineWarehouse.id } } },
    });
    const variantById = new Map(variants.map((v) => [v.id, v]));

    const insufficient: string[] = [];
    for (const item of items) {
      const variant = variantById.get(item.variantId);
      if (!variant) {
        insufficient.push(`${item.variantId} (not found)`);
        continue;
      }
      const available = variant.inventory[0]?.quantityOnHand ?? 0;
      if (available < item.quantity) {
        insufficient.push(`${variant.sku} (${available} available, ${item.quantity} requested)`);
      }
    }
    if (insufficient.length > 0) {
      throw new HttpError(409, `Not enough stock for: ${insufficient.join("; ")}`);
    }

    // Price/name are recomputed from the DB, never trusted from the request.
    const lines = items.map((item) => {
      const variant = variantById.get(item.variantId)!;
      const unitPrice = Number(variant.price);
      return {
        variantId: variant.id,
        productId: variant.productId,
        sku: variant.sku,
        productName: variant.product.name,
        variantLabel: [variant.size, variant.color].filter(Boolean).join(" / ") || null,
        unitPrice,
        quantity: item.quantity,
        lineTotal: unitPrice * item.quantity,
      };
    });

    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);

    const dbCustomer = await tx.customer.upsert({
      where: { email: customer.email },
      create: {
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
        city: shipping.city,
        state: shipping.state,
        country: shipping.country,
      },
      update: {
        name: customer.name,
        phone: customer.phone,
        city: shipping.city,
        state: shipping.state,
        country: shipping.country,
      },
    });

    const order = await tx.order.create({
      data: {
        customerId: dbCustomer.id,
        channel: "ONLINE",
        subtotal,
        shippingCost: 0,
        tax: 0,
        total: subtotal,
        shippingFullName: customer.name,
        shippingPhone: customer.phone,
        shippingLine1: shipping.line1,
        shippingLine2: shipping.line2,
        shippingCity: shipping.city,
        shippingState: shipping.state,
        shippingPostalCode: shipping.postalCode,
        shippingCountry: shipping.country,
        items: {
          create: lines.map((l) => ({
            variantId: l.variantId,
            productId: l.productId,
            sku: l.sku,
            productName: l.productName,
            variantLabel: l.variantLabel,
            unitPrice: l.unitPrice,
            quantity: l.quantity,
            lineTotal: l.lineTotal,
            warehouseId: onlineWarehouse.id,
          })),
        },
      },
      include: { items: true },
    });

    await deductStock(tx, {
      warehouseId: onlineWarehouse.id,
      reference: `#${order.orderNumber}`,
      lines: lines.map((l) => ({ variantId: l.variantId, quantity: l.quantity })),
    });

    return {
      orderId: order.id,
      orderNumber: order.orderNumber,
      total: Number(order.total),
      createdAt: order.createdAt,
      items: order.items.map((i) => ({
        sku: i.sku,
        productName: i.productName,
        variantLabel: i.variantLabel,
        unitPrice: Number(i.unitPrice),
        quantity: i.quantity,
        lineTotal: Number(i.lineTotal),
      })),
    };
  });
}
