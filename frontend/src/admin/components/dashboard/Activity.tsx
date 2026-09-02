import { ShoppingBag, User, Package, CreditCard, UserPlus } from "lucide-react";

const activities = [
  {
    icon: ShoppingBag,
    text: "New order #12345 received",
    time: "2 mins ago",
    bg: "bg-brand-accent/[0.07]",
    color: "text-brand-accent",
  },
  {
    icon: User,
    text: "John Smith placed an order",
    time: "15 mins ago",
    bg: "bg-brand/[0.07]",
    color: "text-brand",
  },
  {
    icon: Package,
    text: "'Linen Shirt' stock updated",
    time: "1 hour ago",
    bg: "bg-success/[0.07]",
    color: "text-success",
  },
  {
    icon: CreditCard,
    text: "Payment of CHF 259.00 confirmed",
    time: "2 hours ago",
    bg: "bg-info/[0.07]",
    color: "text-info",
  },
  {
    icon: UserPlus,
    text: "New customer registered",
    time: "3 hours ago",
    bg: "bg-accent-purple/[0.07]",
    color: "text-accent-purple",
  },
];

export function Activity() {
  return (
    <div className="bg-white border border-brand-border rounded-[14px] p-6 min-h-[370px] shadow-card">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-display font-bold text-text-primary tracking-tight">Activity</h3>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3.5">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-2.5">
            <div
              className={`w-[30px] h-[30px] rounded-[9px] flex items-center justify-center shrink-0 ${activity.bg}`}
            >
              <activity.icon size={14} className={activity.color} />
            </div>
            <div>
              <p className="text-[11.5px] font-display font-medium text-text-primary leading-tight">{activity.text}</p>
              <p className="text-[10.5px] text-text-muted mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
