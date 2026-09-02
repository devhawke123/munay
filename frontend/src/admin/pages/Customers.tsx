import { Eye, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { StatCard } from "../components/ui/StatCard";
import { SearchBar } from "../components/ui/SearchBar";
import { Pagination } from "../components/ui/Pagination";
import { usePagination } from "../hooks/usePagination";
import { useCustomersApi } from "../hooks/useCustomersApi";

export function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useCustomersApi();
  const customers = data ?? [];
  const uniqueLocations = new Set(customers.map((c) => c.location)).size;

  const visibleCustomers = customers.filter((customer) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      (customer.phone ?? "").toLowerCase().includes(query) ||
      (customer.location ?? "").toLowerCase().includes(query)
    );
  });

  const { page, setPage, pageItems, totalItems, pageSize } = usePagination(visibleCustomers);

  if (loading) return <AdminLayout><p className="p-6 text-sm text-text-muted">Loading…</p></AdminLayout>;
  if (error)
    return (
      <AdminLayout>
        <p className="p-6 rounded-[6px] bg-danger/10 text-sm font-medium text-danger">{error.message}</p>
      </AdminLayout>
    );

  const stats = [
    {
      label: "Total Customers",
      value: String(customers.length),
      icon: Users,
      iconBg: "bg-tint-brand",
      iconColor: "text-brand",
      valueColor: "text-brand-dark",
    },
    {
      label: "Locations Served",
      value: String(uniqueLocations),
      icon: MapPin,
      iconBg: "bg-tint-success",
      iconColor: "text-success",
      valueColor: "text-success",
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-[38px]">
        <div>
          <h1 className="text-2xl font-bold text-ink">Customers</h1>
          <p className="text-[15px] font-medium text-brand-dark">
            {customers.length} total customers
          </p>
        </div>

        <div className="grid grid-cols-2 gap-[10px]">
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
          <div className="mb-[18px] px-[8px]">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search customers..."
              className="w-[320px]"
            />
          </div>

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
            {pageItems.map((customer) => (
              <Link
                key={customer.id}
                to={`/admin/customers/${customer.id}`}
                className="grid grid-cols-[1fr_1fr_140px_1fr_60px] items-center rounded-[8px] hover:bg-surface-muted/60"
              >
                <div className="text-base font-display font-semibold text-text-primary">
                  {customer.name}
                </div>
                <div className="text-[13px] text-text-primary">{customer.email}</div>
                <div className="text-[13px] text-text-primary">{customer.phone ?? "—"}</div>
                <div className="text-[13px] text-text-primary">{customer.location ?? "—"}</div>
                <div className="flex h-8 w-8 items-center justify-center text-text-primary">
                  <Eye size={18} />
                </div>
              </Link>
            ))}
          </div>

          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setPage}
            className="mt-6 px-[22px]"
          />
        </div>
      </div>
    </AdminLayout>
  );
}
