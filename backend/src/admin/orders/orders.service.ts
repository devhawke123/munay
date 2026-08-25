import type { Carrier, OrderStatus, Prisma, SalesChannel } from "@prisma/client";
import { prisma } from "../../db.js";

const ORDER_LIST_INCLUDE = {
  customer: true,
  items: true,
} satisfies Prisma.OrderInclude;

const ORDER_DETAIL_INCLUDE = {
  customer: true,
  items: true,
  statusEvents: { orderBy: { occurredAt: "asc" } },
} satisfies Prisma.OrderInclude;

type OrderWithItems = Prisma.OrderGetPayload<{ include: typeof ORDER_LIST_INCLUDE }>;
type OrderWithDetail = Prisma.OrderGetPayload<{ include: typeof ORDER_DETAIL_INCLUDE }>;

function toSummary(order: OrderWithItems) {
  return {
    ...order,
    products: order.items.map((item) => item.productName).join(", "),
  };
}

const TIMELINE_LABELS: Record<OrderStatus, string> = {
  PENDING: "Order Placed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

function toDetail(order: OrderWithDetail) {
  const timeline = [
    { label: TIMELINE_LABELS.PENDING, status: "PENDING" as OrderStatus, occurredAt: order.createdAt },
    ...order.statusEvents.map((event) => ({
      label: TIMELINE_LABELS[event.status],
      status: event.status,
      occurredAt: event.occurredAt,
    })),
  ];

  const { statusEvents: _statusEvents, ...rest } = order;

  return {
    ...rest,
    products: order.items.map((item) => item.productName).join(", "),
    timeline,
  };
}

export interface OrderListFilters {
  channel?: SalesChannel;
  status?: OrderStatus;
  search?: string;
}

export async function listOrders(filters: OrderListFilters = {}) {
  const { channel, status, search } = filters;

  const orders = await prisma.order.findMany({
    where: {
      channel,
      status,
      OR: search
        ? [
            { customer: { name: { contains: search } } },
            { customer: { email: { contains: search } } },
            { shippingFullName: { contains: search } },
            Number.isNaN(Number(search)) ? undefined : { orderNumber: Number(search) },
          ].filter((clause): clause is NonNullable<typeof clause> => clause !== undefined)
        : undefined,
    },
    include: ORDER_LIST_INCLUDE,
    orderBy: { createdAt: "desc" },
  });

  return orders.map(toSummary);
}

export async function getOrder(id: string) {
  const order = await prisma.order.findUnique({ where: { id }, include: ORDER_DETAIL_INCLUDE });
  return order ? toDetail(order) : null;
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  return prisma.$transaction(async (tx) => {
    const updated = await tx.order.update({ where: { id }, data: { status } });
    await tx.orderStatusEvent.create({ data: { orderId: id, status } });
    return updated;
  });
}

interface UpdateShippingInput {
  carrier?: Carrier;
  trackingId?: string;
}

export function updateOrderShipping(id: string, data: UpdateShippingInput) {
  return prisma.order.update({ where: { id }, data });
}
