import { DollarSign, ShoppingBag, FileText, Users, Box } from "lucide-react";
import { StatCard } from "../ui/StatCard";

export function StatsCards() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$125,430",
      icon: DollarSign,
    },
    {
      label: "Today's Sales",
      value: "$8,645",
      icon: ShoppingBag,
    },
    {
      label: "Total Orders",
      value: "$125,430",
      icon: FileText,
    },
    {
      label: "Customers",
      value: "$125,430",
      icon: Users,
    },
    {
      label: "Active Products",
      value: "$125,430",
      icon: Box,
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-2.5">
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
