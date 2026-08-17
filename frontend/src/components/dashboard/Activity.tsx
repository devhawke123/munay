import { ShoppingBag, User, Package, CreditCard, UserPlus, type LucideIcon } from "lucide-react";

const activities: {
  icon: LucideIcon;
  text: string;
  time: string;
  bg: string;
  color: string;
}[] = [
  {
    icon: ShoppingBag,
    text: "New order #12345 received",
    time: "2 mins ago",
    bg: "bg-[#FEF2F2]",
    color: "text-[#DC2626]",
  },
  {
    icon: User,
    text: "John Smith placed an order",
    time: "15 mins ago",
    bg: "bg-[#EFF6FF]",
    color: "text-[#2563EB]",
  },
  {
    icon: Package,
    text: "'Linen Shirt' stock updated",
    time: "1 hour ago",
    bg: "bg-[#FDF4E7]",
    color: "text-[#8B5A2B]",
  },
  {
    icon: CreditCard,
    text: "Payment of $259.00 confirmed",
    time: "2 hours ago",
    bg: "bg-[#F0FDF4]",
    color: "text-[#16A34A]",
  },
  {
    icon: UserPlus,
    text: "New customer registered",
    time: "3 hours ago",
    bg: "bg-[#F5F3FF]",
    color: "text-[#7C3AED]",
  },
];

export function Activity() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-[#E8E6E1] bg-white p-3">
      <div className="mb-2 flex shrink-0 items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">Activity</h3>
        <a href="#" className="text-xs font-medium text-[#8B5A2B]">
          All →
        </a>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${activity.bg}`}
            >
              <activity.icon size={13} className={activity.color} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs text-gray-800">{activity.text}</p>
              <p className="text-[10px] text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
