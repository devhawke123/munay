import { DollarSign, ShoppingBag, FileText, Users, Box } from "lucide-react";
import { StatCard } from "../ui/StatCard";
import { useProducts } from "../../context/ProductsContext";
import { orders } from "../../data/orders";
import { customers } from "../../data/customers";
import { revenueByDay } from "../../data/salesAnalytics";
import { formatCurrency } from "../../lib/money";

export function StatsCards() {
  const { products } = useProducts();

  const totalRevenue = revenueByDay.reduce((sum, d) => sum + d.revenue, 0);
  const todaysSales = revenueByDay[revenueByDay.length - 1]?.revenue ?? 0;
  const activeProducts = products.filter((p) => p.status === "Active").length;

  const stats = [
    {
      label: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
    },
    {
      label: "Today's Sales",
      value: formatCurrency(todaysSales),
      icon: ShoppingBag,
    },
    {
      label: "Total Orders",
      value: String(orders.length),
      icon: FileText,
    },
    {
      label: "Customers",
      value: String(customers.length),
      icon: Users,
    },
    {
      label: "Active Products",
      value: String(activeProducts),
      icon: Box,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
