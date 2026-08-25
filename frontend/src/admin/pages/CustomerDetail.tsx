import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { StatusBadge } from "../components/ui/StatusBadge";
import { useOrders } from "../context/OrdersContext";
import { getCustomerDetail } from "../data/customers";
import { orderStatusTone } from "../types/order";

export function CustomerDetail() {
  const { customerId } = useParams<{ customerId: string }>();
  const customer = getCustomerDetail(customerId ?? "1");
  const { orders } = useOrders();
  const customerOrders = orders.filter((order) => order.customerEmail === customer.email);

  return (
    <AdminLayout>
      <div className="flex flex-col gap-[18px]">
        <div className="flex items-start justify-between rounded-[7px] bg-brand-panel px-6 py-5">
          <div>
            <Link
              to="/admin/customers"
              className="mb-3 flex items-center gap-1 text-sm text-text-muted"
            >
              <ArrowLeft size={14} />
              Customers
            </Link>
            <h1 className="text-2xl font-bold text-ink">{customer.name}</h1>

            <div className="mt-4 flex gap-10">
              <div>
                <p className="text-lg font-bold text-brand-dark">{customer.lifetimeValue}</p>
                <p className="text-xs text-text-muted">Lifetime Value</p>
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">{customer.totalOrders}</p>
                <p className="text-xs text-text-muted">Total Orders</p>
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">{customer.avgOrder}</p>
                <p className="text-xs text-text-muted">Avg. Order</p>
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">{customer.lastOrder}</p>
                <p className="text-xs text-text-muted">Last Order</p>
              </div>
            </div>
          </div>

          <button className="inline-flex h-[34px] items-center gap-2 rounded-[8px] bg-brand-dark px-4 text-xs font-semibold text-white">
            <Mail size={13} />
            Email
          </button>
        </div>

        <div>
          <span className="inline-flex h-[34px] items-center rounded-[8px] bg-brand-dark px-4 text-xs font-semibold text-white">
            Orders
          </span>
        </div>

        <div className="grid grid-cols-[1fr_280px] items-start gap-[18px]">
          <div className="rounded-[7px] bg-white px-[14px] pb-9 pt-[17px]">
            <div className="rounded bg-surface-muted px-[22px] py-3">
              <div className="grid grid-cols-[70px_1fr_140px_90px_100px_70px] items-center text-xs uppercase tracking-wide text-text-primary/70">
                <div>Order</div>
                <div>Items</div>
                <div>Status</div>
                <div>Amount</div>
                <div>Date</div>
                <div>Actions</div>
              </div>
            </div>

            <div className="mt-[18px] flex flex-col gap-[18px] px-[22px]">
              {customerOrders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-[70px_1fr_140px_90px_100px_70px] items-center"
                >
                  <div className="text-[13px] font-medium text-brand">{order.number}</div>
                  <div className="text-[13px] text-text-primary">{order.products}</div>
                  <StatusBadge label={order.status} tone={orderStatusTone[order.status]} />
                  <div className="text-[13px] font-display font-bold text-text-primary">
                    {order.amount}
                  </div>
                  <div className="text-[13px] text-text-muted">{order.date}</div>
                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="inline-flex h-[26px] items-center gap-1 rounded-[6px] bg-surface-tan px-2 text-[11px] font-semibold text-text-primary hover:bg-brand-soft/60"
                  >
                    View →
                  </Link>
                </div>
              ))}

              {customerOrders.length === 0 && (
                <p className="py-4 text-center text-sm text-text-muted">No orders found.</p>
              )}
            </div>
          </div>

          <div className="rounded-[7px] bg-white p-5">
            <h2 className="mb-4 text-base font-bold text-text-primary">Contact</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-panel bg-tint-brand">
                  <Mail size={14} className="text-brand" />
                </div>
                <span className="text-[13px] text-text-primary">{customer.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-panel bg-tint-brand">
                  <Phone size={14} className="text-brand" />
                </div>
                <span className="text-[13px] text-text-primary">{customer.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-panel bg-tint-brand">
                  <MapPin size={14} className="text-brand" />
                </div>
                <span className="text-[13px] text-text-primary">{customer.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
