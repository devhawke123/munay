import type {
  RevenuePoint,
  SalesChannelRow,
  StoreSalesRow,
  TopProductRow,
  WebsiteOrderRow,
} from "../types/sales";

export const revenueByDay: RevenuePoint[] = [
  { day: "18 May", revenue: 12000, orders: 200 },
  { day: "19 May", revenue: 18000, orders: 350 },
  { day: "20 May", revenue: 22000, orders: 400 },
  { day: "21 May", revenue: 38000, orders: 750 },
  { day: "22 May", revenue: 25000, orders: 420 },
  { day: "23 May", revenue: 30000, orders: 500 },
  { day: "24 May", revenue: 20000, orders: 380 },
];

export const salesByChannel: SalesChannelRow[] = [
  { label: "Website Sales", amount: "$77,767 (62%)", percent: 62, barClassName: "bg-brand-dark" },
  { label: "In-Store Sales", amount: "$47,663 (38%)", percent: 38, barClassName: "bg-brand-accent" },
];

export const topPerformingProducts: TopProductRow[] = [
  { rank: 1, name: "Linen Shirt", revenue: "$18,450", units: 512, growth: "12.4%", growthPositive: true, share: 27 },
  { rank: 2, name: "Oversized Coat", revenue: "$15,680", units: 392, growth: "8.1%", growthPositive: true, share: 23 },
  { rank: 3, name: "Wide Leg Pants", revenue: "$11,240", units: 356, growth: "15.3%", growthPositive: true, share: 17 },
  { rank: 4, name: "Cashmere Scarf", revenue: "$12,450", units: 445, growth: "22.1%", growthPositive: true, share: 16 },
  { rank: 5, name: "Knitted Sweater", revenue: "$9,850", units: 298, growth: "3.2%", growthPositive: false, share: 15 },
];

export const storeSales: StoreSalesRow[] = [
  { store: "Downtown Store", transactions: 412, revenue: "$49,440", avgOrderValue: "$120.00", share: 36 },
  { store: "Mall Store", transactions: 358, revenue: "$38,664", avgOrderValue: "$108.00", share: 28 },
  { store: "Airport Store", transactions: 298, revenue: "$25,830", avgOrderValue: "$86.67", share: 19 },
  { store: "Pop-up — Geneva", transactions: 104, revenue: "$13,520", avgOrderValue: "$130.00", share: 10 },
  { store: "Pop-up — Paris", transactions: 62, revenue: "$9,982", avgOrderValue: "$161.00", share: 7 },
];

export const websiteOrders: WebsiteOrderRow[] = [
  { orderId: "#ORD-1042", customer: "Sofia Mendez", items: 3, total: "$342.00", status: "Delivered", date: "May 19" },
  { orderId: "#ORD-1041", customer: "Marie Dupont", items: 1, total: "$120.00", status: "Shipped", date: "May 19" },
  { orderId: "#ORD-1048", customer: "Yuki Tanaka", items: 2, total: "$258.50", status: "Processing", date: "May 18" },
  { orderId: "#ORD-1039", customer: "Clara Hoffmann", items: 1, total: "$85.00", status: "Delivered", date: "May 18" },
  { orderId: "#ORD-1038", customer: "Amara Osei", items: 4, total: "$510.00", status: "Delivered", date: "May 17" },
];
