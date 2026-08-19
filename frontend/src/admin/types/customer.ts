export type CustomerRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
};

export type OrderStatus = "Processing" | "Cancelled" | "Delivered" | "Shipped";

export type CustomerOrderRow = {
  id: string;
  items: string;
  status: OrderStatus;
  amount: string;
  date: string;
};

export type CustomerDetail = CustomerRow & {
  lifetimeValue: string;
  totalOrders: number;
  avgOrder: string;
  lastOrder: string;
  orders: CustomerOrderRow[];
};
