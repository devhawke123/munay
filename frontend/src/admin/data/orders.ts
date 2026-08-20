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
  number: "#12344",
  customerName: "Michael Brown",
  customerEmail: "michael@example.com",
  products: "Oversized Coat",
  status,
  amount: "$189.50",
  date: "24 May, 2025",
}));

export const orderFilters = [
  { label: "All", count: orders.length },
  { label: "Processing", count: orders.filter((o) => o.status === "Processing").length },
  { label: "Shipped", count: orders.filter((o) => o.status === "Shipped").length },
  { label: "Delivered", count: orders.filter((o) => o.status === "Delivered").length },
  { label: "Pending", count: orders.filter((o) => o.status === "Pending").length },
  { label: "Cancelled", count: orders.filter((o) => o.status === "Cancelled").length },
];

const timeline: OrderTimelineStep[] = [
  { label: "Order Placed", timestamp: "Jun 14, 10:24 AM", tone: "brand" },
  { label: "Payment Confirmed", timestamp: "Jun 14, 10:25 AM", tone: "info" },
  { label: "Processing", timestamp: "Jun 14, 2:00 PM", tone: "warning" },
  { label: "Shipped", timestamp: "Jun 15, 9:00 AM", tone: "neutral" },
  { label: "Delivered", timestamp: "Estimated Jun 18", tone: "neutral" },
];

const items: OrderItemRow[] = [
  { name: "Linen Shirt", variant: "Size: M  Color: Ivory", sku: "LS-001", qty: 1, unitPrice: "$89.00", total: "$89.00" },
  { name: "Linen Shirt", variant: "Size: M  Color: Ivory", sku: "LS-001", qty: 1, unitPrice: "$89.00", total: "$89.00" },
];

export function getOrderDetail(id: string): OrderDetail {
  const order = orders.find((o) => o.id === id) ?? orders[0];

  return {
    ...order,
    paymentMethod: "Mastercard",
    paymentLast4: "8821",
    paymentConfirmedDate: "24 May, 2025",
    shippingAddress: "456 Maple Ave, Austin, TX 78701",
    timeline,
    items,
    subtotal: "$89.00",
    shippingCost: "$9.99",
    tax: "$7.12",
    total: "$106.11",
  };
}
