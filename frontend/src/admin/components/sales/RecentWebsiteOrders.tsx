import type { ApiOrderSummary } from "../../hooks/useOrdersApi";
import { formatCurrency } from "../../lib/money";
import { Pagination } from "../ui/Pagination";
import { usePagination } from "../../hooks/usePagination";
import { SalesStatusBadge } from "./SalesStatusBadge";

function statusLabel(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function RecentWebsiteOrders({ orders }: { orders: ApiOrderSummary[] }) {
  const { page, setPage, pageItems, totalItems, pageSize } = usePagination(orders);

  return (
    <div className="rounded-[7px] bg-white p-5">
      <h2 className="mb-4 text-sm font-display font-bold text-text-primary">
        Recent Website Orders
      </h2>

      <div className="grid grid-cols-[90px_1fr_60px_90px_110px_70px] items-center px-1 text-xs uppercase tracking-wide text-text-muted">
        <div>Order ID</div>
        <div>Customer</div>
        <div>Items</div>
        <div>Total</div>
        <div>Status</div>
        <div>Date</div>
      </div>

      <div className="mt-3 flex flex-col gap-4">
        {pageItems.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-[90px_1fr_60px_90px_110px_70px] items-center px-1"
          >
            <div className="text-[13px] font-medium text-brand">#{order.orderNumber}</div>
            <div className="text-[13px] font-semibold text-text-primary">
              {order.customer?.name ?? "—"}
            </div>
            <div className="text-[13px] text-text-primary">{order.items.length}</div>
            <div className="text-[13px] font-display font-bold text-text-primary">
              {formatCurrency(Number(order.total))}
            </div>
            <SalesStatusBadge status={statusLabel(order.status)} />
            <div className="text-[13px] text-text-muted">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      <Pagination page={page} pageSize={pageSize} totalItems={totalItems} onPageChange={setPage} className="mt-4" />
    </div>
  );
}
