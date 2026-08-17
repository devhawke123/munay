import { ShoppingBag, User, Package, CreditCard, UserPlus } from "lucide-react";

const activities = [
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
    <div className="bg-white border border-[#E8E6E1] rounded-xl p-4 min-h-[370px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900">Activity</h3>
        <a href="#" className="text-xs font-medium text-[#8B5A2B]">
          All →
        </a>
      </div>

      {/* List */}
      <div className="flex flex-col justify-between h-[250px]">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.bg}`}
            >
              <activity.icon size={14} className={activity.color} />
            </div>
            <div>
              <p className="text-sm text-gray-800">{activity.text}</p>
              <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
