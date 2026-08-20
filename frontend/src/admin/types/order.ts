import type { StatusTone } from "../components/ui/StatusBadge";

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Pending" | "Cancelled";

export const orderStatusTone: Record<OrderStatus, StatusTone> = {
  Processing: "warning",
  Shipped: "info",
  Delivered: "success",
  Pending: "neutral",
  Cancelled: "danger",
};

export type OrderRow = {
  id: string;
  number: string;
  customerName: string;
  customerEmail: string;
  products: string;
  status: OrderStatus;
  amount: string;
  date: string;
};

export type OrderTimelineTone = "brand" | "info" | "warning" | "neutral";

export type OrderTimelineStep = {
  label: string;
  timestamp: string;
  tone: OrderTimelineTone;
};

export type OrderItemRow = {
  name: string;
  variant: string;
  sku: string;
  qty: number;
  unitPrice: string;
  total: string;
};

export type OrderDetail = OrderRow & {
  paymentMethod: string;
  paymentLast4: string;
  paymentConfirmedDate: string;
  shippingAddress: string;
  timeline: OrderTimelineStep[];
  items: OrderItemRow[];
  subtotal: string;
  shippingCost: string;
  tax: string;
  total: string;
};
