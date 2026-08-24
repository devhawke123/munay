import { formatCurrency, parseCurrency } from "../lib/money";
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

export const orders: OrderRow[] = statusSequence.map((status, index) => ({
  id: String(index + 1),
  number: `#${12340 + index}`,
  customerName: "Michael Brown",
  customerEmail: "michael@example.com",
  products: "Oversized Coat",
  status,
  amount: "$189.50",
  date: "24 May, 2025",
}));

const CARRIERS = ["DHL", "FedEx", "UPS", "USPS"];

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

const items: OrderItemRow[] = [
  { name: "Linen Shirt", variant: "Size: M  Color: Ivory", sku: "LS-001", qty: 1, unitPrice: "$89.00", total: "$89.00" },
  { name: "Linen Shirt", variant: "Size: M  Color: Ivory", sku: "LS-001", qty: 1, unitPrice: "$89.00", total: "$89.00" },
];

const SHIPPING_COST = 9.99;
const TAX_RATE = 0.08;

export function buildOrderDetail(order: OrderRow): OrderDetail {
  const subtotal = items.reduce((sum, item) => sum + parseCurrency(item.unitPrice) * item.qty, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING_COST + tax;

  const orderIndex = orders.findIndex((o) => o.id === order.id);
  const carrier = CARRIERS[orderIndex >= 0 ? orderIndex % CARRIERS.length : 0];
  const trackingId = `${carrier.slice(0, 2).toUpperCase()}${order.id.padStart(9, "0")}CH`;

  return {
    ...order,
    paymentMethod: "Mastercard",
    paymentLast4: "8821",
    paymentConfirmedDate: "24 May, 2025",
    shippingAddress: "456 Maple Ave, Austin, TX 78701",
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
