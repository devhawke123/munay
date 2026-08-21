import { formatCurrency, parseCurrency } from "../lib/money";
import type { CustomerDetail, CustomerOrderRow, CustomerRow } from "../types/customer";

export const customers: CustomerRow[] = Array.from({ length: 7 }, (_, index) => ({
  id: String(index + 1),
  name: "Michael Brown",
  email: "michael@example.com",
  phone: "12345676762",
  location: "abc street#03 karachi ,Pakistan",
}));

const sampleOrders: CustomerOrderRow[] = [
  { id: "#12345", items: "Alpaca Silk Scarf", status: "Processing", amount: "$259.00", date: "24 May, 2025" },
  { id: "#12345", items: "Alpaca Silk Scarf", status: "Cancelled", amount: "$259.00", date: "24 May, 2025" },
  { id: "#12345", items: "Alpaca Silk Scarf", status: "Processing", amount: "$259.00", date: "24 May, 2025" },
  { id: "#12345", items: "Alpaca Silk Scarf", status: "Delivered", amount: "$259.00", date: "24 May, 2025" },
  { id: "#12345", items: "Alpaca Silk Scarf", status: "Shipped", amount: "$259.00", date: "24 May, 2025" },
];

export function getCustomerDetail(id: string): CustomerDetail {
  const customer = customers.find((c) => c.id === id) ?? customers[0];

  const totalOrders = sampleOrders.length;
  const lifetimeValue = sampleOrders.reduce((sum, order) => sum + parseCurrency(order.amount), 0);
  const avgOrder = totalOrders > 0 ? lifetimeValue / totalOrders : 0;

  return {
    ...customer,
    lifetimeValue: formatCurrency(lifetimeValue),
    totalOrders,
    avgOrder: formatCurrency(avgOrder),
    lastOrder: sampleOrders[0]?.date ?? "—",
    orders: sampleOrders,
  };
}
