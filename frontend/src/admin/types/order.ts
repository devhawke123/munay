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
