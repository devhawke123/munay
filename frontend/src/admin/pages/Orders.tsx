import { ChevronDown, Eye, Pencil, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { StatusBadge } from "../components/ui/StatusBadge";
import { SearchBar } from "../components/ui/SearchBar";
import { useOrders } from "../context/OrdersContext";
import { orderStatusTone, type OrderRow, type OrderStatus } from "../types/order";
import { formatCurrency, parseCurrency } from "../lib/money";

const ORDER_STATUSES: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

function StaticField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        {label}
      </span>
      <p className="text-sm text-text-primary">{value}</p>
    </div>
  );
}

function EditOrderModal({
  order,
  onCancel,
  onSave,
}: {
  order: OrderRow;
  onCancel: () => void;
  onSave: (order: OrderRow) => void;
}) {
  const [status, setStatus] = useState<OrderStatus>(order.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[440px] rounded-[12px] bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-brand-border px-6 py-4">
          <h2 className="text-base font-display font-bold text-text-primary">
            Edit Order {order.number}
          </h2>
          <button type="button" onClick={onCancel} className="text-text-muted hover:text-text-primary">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 py-5">
          <StaticField label="Customer Name" value={order.customerName} />
          <StaticField label="Customer Email" value={order.customerEmail} />
          <StaticField label="Products" value={order.products} />
          <div className="grid grid-cols-2 gap-4">
            <StaticField label="Amount" value={order.amount} />
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                Status
              </span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as OrderStatus)}
                className="w-full rounded-[10px] border border-brand-border bg-white px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand/40"
              >
                {ORDER_STATUSES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-brand-border px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-[10px] border border-brand-border bg-white px-5 py-2.5 text-sm font-medium text-text-primary"
          >
            Cancel
          </button>
          <PrimaryButton
            type="button"
            onClick={() => onSave({ ...order, status })}
            className="!h-10 !py-0 !pl-5 !pr-5 text-sm"
          >
            Save Changes
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

const FILTER_LABELS = ["All", "Processing", "Shipped", "Delivered", "Pending", "Cancelled"] as const;
type FilterLabel = (typeof FILTER_LABELS)[number];

export function Orders() {
  const { orders, updateOrder } = useOrders();
  const [editingOrder, setEditingOrder] = useState<OrderRow | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterLabel>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const monthlyRevenue = orders.reduce((sum, order) => sum + parseCurrency(order.amount), 0);

  const orderFilters = FILTER_LABELS.map((label) => ({
    label,
    count: label === "All" ? orders.length : orders.filter((o) => o.status === label).length,
  }));

  const visibleOrders = orders.filter((order) => {
    if (activeFilter !== "All" && order.status !== activeFilter) return false;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      order.number.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.customerEmail.toLowerCase().includes(query)
    );
  });

  function saveOrder(updated: OrderRow) {
    updateOrder(updated);
    setEditingOrder(null);
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-[24px]">
        <div>
          <h1 className="text-2xl font-bold text-ink">Orders</h1>
          <p className="text-[15px] font-medium text-brand-dark">
            {orders.length} orders this month · {formatCurrency(monthlyRevenue)} revenue
          </p>
        </div>

        <div className="flex w-fit items-center gap-1 rounded-full border border-brand/10 bg-white p-1">
          {orderFilters.map((filter) => {
            const isActive = filter.label === activeFilter;
            return (
              <button
                key={filter.label}
                type="button"
                onClick={() => setActiveFilter(filter.label)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium ${
                  isActive
                    ? "bg-brand-dark text-white"
                    : "text-text-muted hover:bg-surface-muted"
                }`}
              >
                {filter.label}
                <span
                  className={`flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[11px] font-semibold ${
                    isActive ? "bg-white/20 text-white" : "bg-surface-muted text-text-muted"
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[11px]">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by order ID or customer..."
              className="w-[320px] !bg-white"
            />
            <button className="flex h-[37px] items-center gap-2 rounded-[10px] border border-brand/10 bg-white px-4 text-xs text-text-primary">
              Sort: Date
              <ChevronDown size={14} className="text-text-muted" />
            </button>
          </div>

          <span className="text-[13px] text-text-muted">{visibleOrders.length} results</span>
        </div>

        <div className="rounded-[7px] bg-white px-[14px] pb-9 pt-[17px]">
          <div className="rounded bg-surface-muted px-[22px] py-3">
            <div className="grid grid-cols-[24px_74px_1fr_130px_140px_90px_100px_60px] items-center text-base text-text-primary/70">
              <div />
              <div>Order</div>
              <div>Customer</div>
              <div>Products</div>
              <div>Status</div>
              <div>Amount</div>
              <div>Date</div>
              <div>Actions</div>
            </div>
          </div>

          <div className="mt-[18px] flex flex-col gap-[18px] px-[22px]">
            {visibleOrders.map((order) => (
              <Link
                key={order.id}
                to={`/admin/orders/${order.id}`}
                className="grid grid-cols-[24px_74px_1fr_130px_140px_90px_100px_60px] items-center"
              >
                <input
                  type="checkbox"
                  onClick={(e) => e.stopPropagation()}
                  className="h-4 w-4 rounded border-brand/20"
                />
                <div className="text-[13px] font-medium text-brand">{order.number}</div>
                <div>
                  <p className="text-[13px] font-semibold text-text-primary">
                    {order.customerName}
                  </p>
                  <p className="text-xs text-text-muted">{order.customerEmail}</p>
                </div>
                <div className="text-[13px] text-text-primary">{order.products}</div>
                <StatusBadge label={order.status} tone={orderStatusTone[order.status]} />
                <div className="text-[13px] font-display font-bold text-text-primary">
                  {order.amount}
                </div>
                <div className="text-[13px] text-text-muted">{order.date}</div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center text-text-primary">
                    <Eye size={16} />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditingOrder(order);
                    }}
                    className="flex h-8 w-8 items-center justify-center text-text-primary"
                  >
                    <Pencil size={15} />
                  </button>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between px-[22px]">
            <span className="text-[13px] text-text-muted">
              Showing {visibleOrders.length} of {orders.length} orders
            </span>
            <div className="flex items-center gap-1">
              <button className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-brand-dark text-[13px] font-medium text-white">
                1
              </button>
            </div>
          </div>
        </div>
      </div>

      {editingOrder && (
        <EditOrderModal
          order={editingOrder}
          onCancel={() => setEditingOrder(null)}
          onSave={saveOrder}
        />
      )}
    </AdminLayout>
  );
}
