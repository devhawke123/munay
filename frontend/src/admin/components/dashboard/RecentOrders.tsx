import { useOrdersApi } from "../../hooks/useOrdersApi";
import { formatCurrency } from "../../lib/money";

const statusStyles: Record<string, string> = {
  Processing: "bg-warning/10 border border-warning/20 text-warning",
  Pending: "bg-warning/10 border border-warning/20 text-warning",
  Shipped: "bg-info/10 border border-info/15 text-info",
  Delivered: "bg-success/10 border border-success/20 text-success",
  Cancelled: "bg-danger/10 border border-danger/15 text-danger",
};

export function RecentOrders() {
  const { data, loading, error } = useOrdersApi();
  const recentOrders = (data ?? []).slice(0, 5).map((order) => ({
    id: `#${order.orderNumber}`,
    customer: order.customer?.name ?? "—",
    items: order.products,
    status: order.status.charAt(0) + order.status.slice(1).toLowerCase(),
    amount: formatCurrency(Number(order.total)),
    date: new Date(order.createdAt).toLocaleDateString(),
  }));

  if (loading) return <p className="p-6 text-xs text-text-muted">Loading…</p>;
  if (error)
    return <p className="p-6 rounded-[6px] bg-danger/10 text-xs font-medium text-danger">{error.message}</p>;

  return (
    <div className="bg-white border border-brand-border rounded-[14px] p-6 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-display font-bold text-text-primary tracking-tight">Recent Orders</h3>
        <a href="#" className="text-xs font-display font-semibold text-brand-accent">
          View All →
        </a>
      </div>

      {/* Table */}
      <table className="w-full text-left">
        <thead>
          <tr className="text-[10px] text-text-muted uppercase tracking-widest font-display font-bold border-b border-brand/[0.08]">
            <th className="pb-2">Order</th>
            <th className="pb-2">Customer</th>
            <th className="pb-2">Items</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order, index) => (
            <tr key={index} className="text-xs border-b border-brand/[0.05]">
              <td className="py-2 font-mono font-bold text-brand-accent">{order.id}</td>
              <td className="py-2">
                <span className="font-display font-semibold text-text-primary">{order.customer}</span>
              </td>
              <td className="py-2 text-text-muted">{order.items}</td>
              <td className="py-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-display font-semibold tracking-wide ${statusStyles[order.status]}`}
                >
                  <span className="w-[5px] h-[5px] rounded-sm bg-current"></span>
                  {order.status}
                </span>
              </td>
              <td className="py-2 font-display font-extrabold text-text-primary text-[10px]">{order.amount}</td>
              <td className="py-2 text-[11px] text-text-muted">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
