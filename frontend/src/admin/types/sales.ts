export type RevenuePoint = {
  day: string;
  revenue: number;
  orders: number;
};

export type SalesChannelRow = {
  label: string;
  amount: string;
  percent: number;
  barClassName: string;
};

export type TopProductRow = {
  rank: number;
  name: string;
  revenue: string;
  units: number;
  growth: string;
  growthPositive: boolean;
  share: number;
};

export type StoreSalesRow = {
  store: string;
  transactions: number;
  revenue: string;
  avgOrderValue: string;
  share: number;
};

export type WebsiteOrderStatus = "Delivered" | "Shipped" | "Processing";

export type WebsiteOrderRow = {
  orderId: string;
  customer: string;
  items: number;
  total: string;
  status: WebsiteOrderStatus;
  date: string;
};
