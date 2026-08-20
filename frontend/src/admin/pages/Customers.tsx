import { Eye, ShoppingBag, UserPlus, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { StatCard } from "../components/ui/StatCard";
import { customers } from "../data/customers";

const totalCustomers = 284;

const stats = [
  {
    label: "Total Customers",
    value: "3,256",
    icon: Users,
    iconBg: "bg-tint-brand",
    iconColor: "text-brand",
    valueColor: "text-brand-dark",
  },
  {
    label: "New This Month",
    value: "156",
    icon: UserPlus,
    iconBg: "bg-tint-success",
    iconColor: "text-success",
    valueColor: "text-success",
  },
  {
    label: "Avg. Order Value",
    value: "3,256",
    icon: ShoppingBag,
    iconBg: "bg-tint-brand",
    iconColor: "text-brand",
    valueColor: "text-brand-dark",
  },
];

export function Customers() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-[38px]">
        <div>
          <h1 className="text-2xl font-bold text-ink">Customers</h1>
          <p className="text-[15px] font-medium text-brand-dark">
            {totalCustomers} total customers
          </p>
        </div>

        <div className="grid grid-cols-3 gap-[10px]">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              iconBgClassName={stat.iconBg}
              iconClassName={stat.iconColor}
              valueClassName={stat.valueColor}
            />
          ))}
        </div>

        <div className="rounded-[7px] bg-white px-[14px] pb-9 pt-[17px]">
          <div className="rounded bg-surface-muted px-[22px] py-3">
            <div className="grid grid-cols-[1fr_1fr_140px_1fr_60px] items-center text-base text-text-primary/70">
              <div>Customer</div>
              <div>Email</div>
              <div>Phone</div>
              <div>Location</div>
              <div>Actions</div>
            </div>
          </div>

          <div className="mt-[18px] flex flex-col gap-[18px] px-[22px]">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="grid grid-cols-[1fr_1fr_140px_1fr_60px] items-center"
              >
                <div className="text-base font-display font-semibold text-text-primary">
                  {customer.name}
                </div>
                <div className="text-[13px] text-text-primary">{customer.email}</div>
                <div className="text-[13px] text-text-primary">{customer.phone}</div>
                <div className="text-[13px] text-text-primary">{customer.location}</div>
                <Link
                  to={`/admin/customers/${customer.id}`}
                  className="flex h-8 w-8 items-center justify-center text-text-primary"
                >
                  <Eye size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
