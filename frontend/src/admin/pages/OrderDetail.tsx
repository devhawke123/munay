import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  CreditCard,
  type LucideIcon,
  MapPin,
  PackageSearch,
  Truck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { getOrderDetail } from "../data/orders";
import type { OrderTimelineTone } from "../types/order";

const timelineIcons: Record<string, LucideIcon> = {
  "Order Placed": Clock,
  "Payment Confirmed": CreditCard,
  Processing: PackageSearch,
  Shipped: Truck,
  Delivered: CheckCircle2,
};

const timelineTone: Record<OrderTimelineTone, { bg: string; border: string; text: string }> = {
  brand: { bg: "bg-tint-brand", border: "border-brand/10", text: "text-brand" },
  info: { bg: "bg-info/10", border: "border-info/20", text: "text-info" },
  warning: { bg: "bg-warning/10", border: "border-warning/20", text: "text-warning" },
  neutral: { bg: "bg-surface-muted", border: "border-brand/10", text: "text-text-muted" },
};

export function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const order = getOrderDetail(orderId ?? "1");

  return (
    <AdminLayout>
      <div className="flex flex-col gap-[18px]">
        <div>
          <Link
            to="/admin/orders"
            className="mb-3 flex w-fit items-center gap-1 rounded-full border border-brand/10 bg-white px-3 py-1.5 text-xs text-text-muted"
          >
            <ArrowLeft size={13} />
            All Orders
          </Link>
        </div>

        <div className="flex items-start justify-between rounded-[7px] bg-brand-panel px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-ink">{order.number}</h1>
            <p className="mt-1 text-[13px] text-text-muted">
              {order.date} · {order.paymentMethod} ****{order.paymentLast4}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="inline-flex h-[34px] items-center rounded-[8px] border border-brand/10 bg-white px-4 text-xs font-semibold text-text-primary">
              Print Invoice
            </button>
            <button className="inline-flex h-[34px] items-center rounded-[8px] bg-brand-dark px-4 text-xs font-semibold text-white">
              Update Status
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_280px] items-start gap-[18px]">
          <div className="flex flex-col gap-[18px]">
            <div className="rounded-[7px] bg-white p-5">
              <h2 className="mb-5 text-base font-bold text-text-primary">Order Timeline</h2>

              <div className="relative flex flex-col gap-6 pl-1">
                <div className="absolute bottom-4 left-[17px] top-4 w-px bg-brand-border" />
                {order.timeline.map((step) => {
                  const Icon = timelineIcons[step.label] ?? Clock;
                  const tone = timelineTone[step.tone];
                  return (
                    <div key={step.label} className="relative z-10 flex items-start gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${tone.border} ${tone.bg}`}
                      >
                        <Icon size={16} className={tone.text} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{step.label}</p>
                        <p className="text-xs text-text-muted">{step.timestamp}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[7px] bg-white p-5">
              <h2 className="mb-4 text-base font-bold text-text-primary">Order Items</h2>

              <div className="rounded bg-surface-muted px-4 py-2.5">
                <div className="grid grid-cols-[1fr_70px_50px_90px_90px] items-center text-xs uppercase tracking-wide text-text-primary/70">
                  <div>Product</div>
                  <div>SKU</div>
                  <div>Qty</div>
                  <div>Unit Price</div>
                  <div>Total</div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-4">
                {order.items.map((item, index) => (
                  <div
                    key={`${item.sku}-${index}`}
                    className="grid grid-cols-[1fr_70px_50px_90px_90px] items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-brand/10 bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700 text-[10px] font-semibold text-white">
                        IMG
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-text-primary">{item.name}</p>
                        <p className="text-xs text-text-muted">{item.variant}</p>
                      </div>
                    </div>
                    <div className="flex h-[23px] w-fit items-center justify-center rounded-[6px] bg-surface-tan px-2 font-mono text-[11px] font-medium text-brand">
                      {item.sku}
                    </div>
                    <div className="text-[13px] text-text-primary">{item.qty}</div>
                    <div className="text-[13px] text-text-primary">{item.unitPrice}</div>
                    <div className="text-[13px] font-semibold text-text-primary">{item.total}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2 border-t border-brand-border pt-4">
                <div className="flex justify-between text-[13px] text-text-muted">
                  <span>Subtotal</span>
                  <span className="text-text-primary">{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-[13px] text-text-muted">
                  <span>Shipping</span>
                  <span className="text-text-primary">{order.shippingCost}</span>
                </div>
                <div className="flex justify-between text-[13px] text-text-muted">
                  <span>Tax (8%)</span>
                  <span className="text-text-primary">{order.tax}</span>
                </div>
                <div className="mt-1 flex justify-between text-base font-bold text-text-primary">
                  <span>Total</span>
                  <span className="text-brand-dark">{order.total}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[18px]">
            <div className="rounded-[7px] bg-white p-5">
              <h2 className="mb-4 text-sm font-bold text-text-primary">Customer</h2>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tint-brand text-sm font-semibold text-brand">
                  {order.customerName
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-text-primary">
                    {order.customerName}
                  </p>
                  <p className="text-xs text-text-muted">{order.customerEmail}</p>
                </div>
              </div>
              <Link
                to={`/admin/customers/${order.id}`}
                className="mt-4 flex h-[30px] items-center justify-center rounded-[6px] border border-brand/10 text-xs font-semibold text-text-primary"
              >
                View Profile
              </Link>
            </div>

            <div className="rounded-[7px] bg-white p-5">
              <h2 className="mb-4 text-sm font-bold text-text-primary">Shipping Address</h2>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-panel bg-tint-brand">
                  <MapPin size={14} className="text-brand" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-text-primary">
                    {order.customerName}
                  </p>
                  <p className="text-xs text-text-muted">{order.shippingAddress}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[7px] bg-white p-5">
              <h2 className="mb-4 text-sm font-bold text-text-primary">Payment</h2>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-panel bg-tint-brand">
                  <CreditCard size={14} className="text-brand" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-text-primary">
                    {order.paymentMethod} ****{order.paymentLast4}
                  </p>
                  <p className="text-xs text-text-muted">**** **** **** 4242</p>
                </div>
              </div>
              <div className="mt-3 rounded-[6px] bg-success/10 px-3 py-2">
                <p className="text-xs font-semibold text-success">Payment Confirmed</p>
                <p className="text-[11px] text-text-muted">{order.paymentConfirmedDate}</p>
              </div>
            </div>

            <div className="rounded-[7px] bg-white p-5">
              <h2 className="mb-4 text-sm font-bold text-text-primary">Order Notes</h2>
              <textarea
                placeholder="Add internal note..."
                rows={3}
                className="w-full resize-none rounded-[6px] border border-brand/10 bg-surface-muted p-3 text-xs text-text-primary placeholder:text-text-muted"
              />
              <button className="mt-3 flex h-[30px] items-center justify-center rounded-[6px] bg-brand-dark px-4 text-xs font-semibold text-white">
                Save Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
