import { DollarSign, ShoppingBag, FileText, Users, Box, type LucideIcon } from "lucide-react";

const stats: { label: string; value: string; icon: LucideIcon }[] = [
  { label: "Total Revenue", value: "$125,430", icon: DollarSign },
  { label: "Today's Sales", value: "$8,645", icon: ShoppingBag },
  { label: "Total Orders", value: "$125,430", icon: FileText },
  { label: "Customers", value: "$125,430", icon: Users },
  { label: "Active Products", value: "$125,430", icon: Box },
];

export function StatsCards() {
  return (
    <div className="grid shrink-0 grid-cols-5 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-[#E8E6E1] bg-white px-3 py-2"
        >
          <div className="mb-1 flex h-6 w-6 items-center justify-center rounded-lg bg-[#F3E4D0]">
            <stat.icon size={13} className="text-[#8B5A2B]" />
          </div>
          <p className="text-xs text-gray-500">{stat.label}</p>
          <p className="text-sm font-semibold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
