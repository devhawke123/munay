import { DollarSign, ShoppingBag, FileText, Clock, Users, Box } from "lucide-react";

function StatsCards() {
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
    <div className="grid grid-cols-5 gap-3 mb-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-[#E8E6E1] rounded-xl p-2.5"
        >
          <div className="w-6 h-6 rounded-lg bg-[#F3E4D0] flex items-center justify-center mb-1.5">
            <stat.icon size={13} className="text-[#8B5A2B]" />
          </div>
          <p className="text-xs text-gray-500 mb-0.5">{stat.label}</p>
          <p className="text-base font-semibold text-gray-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;