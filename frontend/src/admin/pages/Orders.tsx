import { ChevronDown, Eye, Search, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { StatusBadge } from "../components/ui/StatusBadge";
import { orderFilters, orders } from "../data/orders";
import { orderStatusTone } from "../types/order";

export function Orders() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-[24px]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ink">Orders</h1>
            <p className="text-[15px] font-medium text-brand-dark">
              8 orders this month · $1,686 revenue
            </p>
          </div>

          <PrimaryButton>+ Create Order</PrimaryButton>
        </div>

        <div className="flex w-fit items-center gap-1 rounded-full border border-brand/10 bg-white p-1">
          {orderFilters.map((filter, index) => (
            <button
              key={filter.label}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium ${
                index === 0
                  ? "bg-brand-dark text-white"
                  : "text-text-muted hover:bg-surface-muted"
              }`}
            >
              {filter.label}
              <span
                className={`flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[11px] font-semibold ${
                  index === 0 ? "bg-white/20 text-white" : "bg-surface-muted text-text-muted"
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[11px]">
            <div className="flex h-[37px] w-[320px] items-center gap-2 rounded-[10px] border border-brand/10 bg-white px-[14px]">
              <Search size={13} className="text-text-muted" />
              <span className="text-[13px] text-text-primary/50">
                Search by order ID or customer...
              </span>
            </div>
            <button className="flex h-[37px] items-center gap-2 rounded-[10px] border border-brand/10 bg-white px-4 text-xs text-text-primary">
              Sort: Date
              <ChevronDown size={14} className="text-text-muted" />
            </button>
          </div>

          <span className="text-[13px] text-text-muted">{orders.length} results</span>
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
            {orders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-[24px_74px_1fr_130px_140px_90px_100px_60px] items-center"
              >
                <input type="checkbox" className="h-4 w-4 rounded border-brand/20" />
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
                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="flex h-8 w-8 items-center justify-center text-text-primary"
                  >
                    <Eye size={16} />
                  </Link>
                  <button className="flex h-8 w-8 items-center justify-center text-text-primary">
                    <Share2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between px-[22px]">
            <span className="text-[13px] text-text-muted">
              Showing {orders.length} of {orders.length} orders
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`flex h-7 w-7 items-center justify-center rounded-[6px] text-[13px] font-medium ${
                    page === 1
                      ? "bg-brand-dark text-white"
                      : "bg-surface-muted text-text-muted"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
