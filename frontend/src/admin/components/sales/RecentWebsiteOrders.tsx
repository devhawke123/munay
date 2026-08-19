import { websiteOrders } from "../../data/salesAnalytics";
import { SalesStatusBadge } from "./SalesStatusBadge";

export function RecentWebsiteOrders() {
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
        {websiteOrders.map((order) => (
          <div
            key={order.orderId}
            className="grid grid-cols-[90px_1fr_60px_90px_110px_70px] items-center px-1"
          >
            <div className="text-[13px] font-medium text-brand">{order.orderId}</div>
            <div className="text-[13px] font-semibold text-text-primary">{order.customer}</div>
            <div className="text-[13px] text-text-primary">{order.items}</div>
            <div className="text-[13px] font-display font-bold text-text-primary">
              {order.total}
            </div>
            <SalesStatusBadge status={order.status} />
            <div className="text-[13px] text-text-muted">{order.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
