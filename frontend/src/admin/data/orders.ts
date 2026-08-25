import { formatCurrency, parseCurrency } from "../lib/money";
import { customers } from "./customers";
import type { OrderDetail, OrderItemRow, OrderRow, OrderStatus, OrderTimelineStep } from "../types/order";

const statusSequence: OrderStatus[] = [
  "Shipped",
  "Pending",
  "Shipped",
  "Delivered",
  "Processing",
  "Cancelled",
  "Delivered",
  "Delivered",
];

const PRODUCTS = [
  "Oversized Coat",
  "Alpaca Silk Scarf",
  "Alpaca Overcoat",
  "Alpaca Knit Sweater",
  "Women's Alpaca Cardigan",
];

const AMOUNTS = [189.5, 259.0, 342.0, 120.0, 258.5, 85.0, 510.0, 149.0];

const DATES = [
  "24 May, 2025",
  "22 May, 2025",
  "19 May, 2025",
  "19 May, 2025",
  "18 May, 2025",
  "18 May, 2025",
  "17 May, 2025",
  "15 May, 2025",
];

export const orders: OrderRow[] = statusSequence.map((status, index) => {
  const customer = customers[index % customers.length];
  return {
    id: String(index + 1),
    number: `#${12340 + index}`,
    customerName: customer.name,
    customerEmail: customer.email,
    products: PRODUCTS[index % PRODUCTS.length],
    status,
    amount: formatCurrency(AMOUNTS[index % AMOUNTS.length]),
    date: DATES[index % DATES.length],
  };
});

const CARRIERS = ["DHL", "DPD", "La Poste"];

const shippingStatusByOrderStatus: Record<OrderStatus, string> = {
  Pending: "Awaiting Fulfillment",
  Processing: "Preparing to Ship",
  Shipped: "In Transit",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
};

export const orderFilters = [
  { label: "All", count: orders.length },
  { label: "Processing", count: orders.filter((o) => o.status === "Processing").length },
  { label: "Shipped", count: orders.filter((o) => o.status === "Shipped").length },
  { label: "Delivered", count: orders.filter((o) => o.status === "Delivered").length },
  { label: "Pending", count: orders.filter((o) => o.status === "Pending").length },
  { label: "Cancelled", count: orders.filter((o) => o.status === "Cancelled").length },
];

function buildTimeline(status: OrderStatus, date: string): OrderTimelineStep[] {
  if (status === "Cancelled") {
    return [
      { label: "Order Placed", timestamp: date, tone: "brand" },
      { label: "Cancelled", timestamp: date, tone: "danger" },
    ];
  }

  const steps: OrderTimelineStep[] = [
    { label: "Order Placed", timestamp: date, tone: "brand" },
  ];

  if (status === "Pending") return steps;

  steps.push({ label: "Payment Confirmed", timestamp: date, tone: "info" });
  steps.push({ label: "Processing", timestamp: date, tone: "warning" });

  if (status === "Processing") return steps;

  steps.push({ label: "Shipped", timestamp: date, tone: "neutral" });

  if (status === "Shipped") return steps;

  steps.push({ label: "Delivered", timestamp: date, tone: "neutral" });
  return steps;
}

const SHIPPING_COST = 9.99;
const TAX_RATE = 0.08;
const PAYMENT_METHODS = ["Visa", "Mastercard", "Amex"];

function buildItems(order: OrderRow): OrderItemRow[] {
  const unitPrice = parseCurrency(order.amount);
  return [
    {
      name: order.products,
      variant: "Size: M  Color: Ivory",
      sku: `${order.products.slice(0, 2).toUpperCase()}-${order.id.padStart(3, "0")}`,
      qty: 1,
      unitPrice: formatCurrency(unitPrice),
      total: formatCurrency(unitPrice),
    },
  ];
}

export const TAX_RATE_LABEL = `${Math.round(TAX_RATE * 100)}%`;

export function buildOrderDetail(order: OrderRow): OrderDetail {
  const orderIndex = orders.findIndex((o) => o.id === order.id);
  const customer = customers.find((c) => c.email === order.customerEmail);

  const items = buildItems(order);
  const subtotal = items.reduce((sum, item) => sum + parseCurrency(item.unitPrice) * item.qty, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING_COST + tax;

  const carrier = CARRIERS[orderIndex >= 0 ? orderIndex % CARRIERS.length : 0];
  const trackingId = `${carrier.slice(0, 2).toUpperCase()}${order.id.padStart(9, "0")}CH`;
  const paymentMethod = PAYMENT_METHODS[orderIndex >= 0 ? orderIndex % PAYMENT_METHODS.length : 0];
  const paymentLast4 = order.id.padStart(4, "0").slice(-4);

  return {
    ...order,
    customerId: customer?.id ?? "1",
    paymentMethod,
    paymentLast4,
    paymentConfirmedDate: order.date,
    shippingAddress: customer?.location ?? "—",
    shippingCarrier: carrier,
    trackingId,
    shippingStatus: shippingStatusByOrderStatus[order.status],
    shippingStatusUpdatedAt: order.date,
    timeline: buildTimeline(order.status, order.date),
    items,
    subtotal: formatCurrency(subtotal),
    shippingCost: formatCurrency(SHIPPING_COST),
    tax: formatCurrency(tax),
    total: formatCurrency(total),
  };
}
