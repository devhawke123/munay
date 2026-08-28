import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  ExternalLink,
  type LucideIcon,
  MapPin,
  PackageSearch,
  Save,
  Truck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { ordersApi, useOrderApi, type ApiCarrier, type ApiOrderStatus } from "../hooks/useOrdersApi";
import { formatCurrency } from "../lib/money";

const TAX_RATE_LABEL = "8%";
const CARRIER_OPTIONS = ["DHL", "DPD", "La Poste"] as const;

function toApiCarrier(label: string): ApiCarrier {
  return label === "La Poste" ? "LA_POSTE" : (label as ApiCarrier);
}

function toCarrierLabel(carrier: ApiCarrier | null): string {
  if (carrier === "LA_POSTE") return "La Poste";
  return carrier ?? "DHL";
}

const shippingStatusByOrderStatus: Record<ApiOrderStatus, string> = {
  PENDING: "Awaiting Fulfillment",
  PROCESSING: "Preparing to Ship",
  SHIPPED: "In Transit",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const timelineToneByStatus: Record<ApiOrderStatus, OrderTimelineToneKey> = {
  PENDING: "neutral",
  PROCESSING: "warning",
  SHIPPED: "neutral",
  DELIVERED: "neutral",
  CANCELLED: "danger",
};

type OrderTimelineToneKey = "brand" | "info" | "warning" | "neutral" | "danger";

function CarrierLogo({ carrier, className = "" }: { carrier: string; className?: string }) {
  if (carrier === "DHL") {
    return (
      <span
        className={`flex h-5 w-8 shrink-0 items-center justify-center rounded-[3px] bg-[#FFCC00] text-[9px] font-black italic text-[#D40511] ${className}`}
      >
        DHL
      </span>
    );
  }
  if (carrier === "DPD") {
    return (
      <span
        className={`flex h-5 w-8 shrink-0 items-center justify-center rounded-[3px] bg-[#DC0032] text-[9px] font-bold lowercase text-white ${className}`}
      >
        dpd
      </span>
    );
  }
  return (
    <span
      className={`flex h-5 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFCB05] text-[7px] font-bold text-[#003399] ${className}`}
    >
      La Poste
    </span>
  );
}

function CarrierSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 w-full items-center justify-between rounded-[8px] border border-brand/10 bg-surface-muted px-3 text-sm text-text-primary outline-none focus:border-brand/40"
      >
        <span className="flex items-center gap-2">
          <CarrierLogo carrier={value} />
          {value}
        </span>
        <ChevronDown size={14} className="text-text-muted" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-1.5 w-full rounded-[10px] border border-brand-border bg-white p-1.5 shadow-card">
            {CARRIER_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-[8px] px-2 py-2 text-left text-sm hover:bg-brand-soft/60 ${
                  option === value ? "font-semibold text-brand-dark" : "text-text-primary"
                }`}
              >
                <CarrierLogo carrier={option} />
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const timelineIcons: Record<string, LucideIcon> = {
  "Order Placed": Clock,
  "Payment Confirmed": CreditCard,
  Processing: PackageSearch,
  Shipped: Truck,
  Delivered: CheckCircle2,
  Cancelled: XCircle,
};

const timelineTone: Record<OrderTimelineToneKey, { bg: string; border: string; text: string }> = {
  brand: { bg: "bg-tint-brand", border: "border-brand/10", text: "text-brand" },
  info: { bg: "bg-info/10", border: "border-info/20", text: "text-info" },
  warning: { bg: "bg-warning/10", border: "border-warning/20", text: "text-warning" },
  neutral: { bg: "bg-surface-muted", border: "border-brand/10", text: "text-text-muted" },
  danger: { bg: "bg-danger/10", border: "border-danger/20", text: "text-danger" },
};

export function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order, loading, error, refetch } = useOrderApi(orderId ?? null);

  const [carrier, setCarrier] = useState<string | null>(null);
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  if (loading) return <AdminLayout><p className="p-6 text-sm text-text-muted">Loading…</p></AdminLayout>;
  if (error)
    return (
      <AdminLayout>
        <p className="p-6 rounded-[6px] bg-danger/10 text-sm font-medium text-danger">{error.message}</p>
      </AdminLayout>
    );
  if (!order) return null;

  const carrierValue = carrier ?? toCarrierLabel(order.carrier);
  const trackingValue = trackingId ?? order.trackingId ?? "";
  const shippingAddress = [order.shippingLine1, order.shippingCity, order.shippingCountry]
    .filter(Boolean)
    .join(", ") || "—";

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    try {
      await ordersApi.updateShipping(orderId!, {
        carrier: toApiCarrier(carrierValue),
        trackingId: trackingValue,
      });
      await refetch();
      setIsDirty(false);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save shipping details.");
    } finally {
      setSaving(false);
    }
  }

  function handleTrackShipment() {
    setLastChecked(new Date().toLocaleString());
  }

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

        <div className="rounded-[7px] bg-brand-panel px-6 py-5">
          <h1 className="text-2xl font-bold text-ink">#{order.orderNumber}</h1>
          <p className="mt-1 text-[13px] text-text-muted">{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-[1fr_280px] items-start gap-[18px]">
          <div className="flex flex-col gap-[18px]">
            <div className="grid grid-cols-2 items-stretch gap-[18px]">
              <div className="rounded-[7px] bg-white p-5">
                <h2 className="mb-5 text-base font-bold text-text-primary">Order Timeline</h2>

                <div className="relative flex flex-col gap-6 pl-1">
                  <div className="absolute bottom-4 left-[17px] top-4 w-px bg-brand-border" />
                  {order.timeline.map((step, index) => {
                    const Icon = timelineIcons[step.label] ?? Clock;
                    const toneKey = index === 0 ? "brand" : timelineToneByStatus[step.status];
                    const tone = timelineTone[toneKey];
                    return (
                      <div key={`${step.label}-${index}`} className="relative z-10 flex items-start gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${tone.border} ${tone.bg}`}
                        >
                          <Icon size={16} className={tone.text} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{step.label}</p>
                          <p className="text-xs text-text-muted">
                            {new Date(step.occurredAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="w-[85%] justify-self-start rounded-[7px] bg-white p-5">
                <h2 className="mb-4 text-center text-xs font-bold uppercase tracking-wide text-text-primary">
                  Shipping Card
                </h2>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-text-muted">Carrier</span>
                  <CarrierSelect
                    value={carrierValue}
                    onChange={(value) => {
                      setCarrier(value);
                      setIsDirty(true);
                    }}
                  />
                </label>

                <label className="mt-3 flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-text-muted">Tracking ID</span>
                  <input
                    value={trackingValue}
                    onChange={(e) => {
                      setTrackingId(e.target.value);
                      setIsDirty(true);
                    }}
                    className="h-9 w-full rounded-[8px] border border-brand/10 bg-surface-muted px-3 text-sm text-text-primary outline-none focus:border-brand/40"
                  />
                </label>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-[8px] bg-brand-dark text-xs font-semibold text-white disabled:opacity-60"
                >
                  <Save size={13} />
                  {saving ? "Saving…" : isDirty ? "Save" : "Saved"}
                </button>

                {saveError && (
                  <p className="mt-2 rounded-[6px] bg-danger/10 px-3 py-2 text-xs font-medium text-danger">
                    {saveError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleTrackShipment}
                  className="mt-2 flex h-9 w-full items-center justify-center gap-1.5 text-xs font-semibold text-success"
                >
                  Track Shipment
                  <ExternalLink size={12} />
                </button>

                <div className="mt-3 rounded-[6px] bg-success/10 px-3 py-2">
                  <p className="text-xs font-semibold text-success">
                    Status: {shippingStatusByOrderStatus[order.status]}
                  </p>
                  {lastChecked && (
                    <p className="text-[11px] text-text-muted">Last checked: {lastChecked}</p>
                  )}
                </div>
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
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr_70px_50px_90px_90px] items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-brand/10 bg-brand-soft/30">
                        <PackageSearch size={16} className="text-text-muted" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-text-primary">{item.productName}</p>
                        <p className="text-xs text-text-muted">{item.variantLabel ?? "—"}</p>
                      </div>
                    </div>
                    <div className="flex h-[23px] w-fit items-center justify-center rounded-[6px] bg-surface-tan px-2 font-mono text-[11px] font-medium text-brand">
                      {item.sku}
                    </div>
                    <div className="text-[13px] text-text-primary">{item.quantity}</div>
                    <div className="text-[13px] text-text-primary">{formatCurrency(Number(item.unitPrice))}</div>
                    <div className="text-[13px] font-semibold text-text-primary">
                      {formatCurrency(Number(item.lineTotal))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2 border-t border-brand-border pt-4">
                <div className="flex justify-between text-[13px] text-text-muted">
                  <span>Subtotal</span>
                  <span className="text-text-primary">{formatCurrency(Number(order.subtotal))}</span>
                </div>
                <div className="flex justify-between text-[13px] text-text-muted">
                  <span>Shipping</span>
                  <span className="text-text-primary">{formatCurrency(Number(order.shippingCost))}</span>
                </div>
                <div className="flex justify-between text-[13px] text-text-muted">
                  <span>Tax ({TAX_RATE_LABEL})</span>
                  <span className="text-text-primary">{formatCurrency(Number(order.tax))}</span>
                </div>
                <div className="mt-1 flex justify-between text-base font-bold text-text-primary">
                  <span>Total</span>
                  <span className="text-brand-dark">{formatCurrency(Number(order.total))}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[18px]">
            <div className="rounded-[7px] bg-white p-5">
              <h2 className="mb-4 text-sm font-bold text-text-primary">Customer</h2>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tint-brand text-sm font-semibold text-brand">
                  {(order.customer?.name ?? "—")
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-text-primary">
                    {order.customer?.name ?? "—"}
                  </p>
                  <p className="text-xs text-text-muted">{order.customer?.email ?? "—"}</p>
                </div>
              </div>
              {order.customer && (
                <Link
                  to={`/admin/customers/${order.customer.id}`}
                  className="mt-4 flex h-[30px] items-center justify-center rounded-[6px] border border-brand/10 text-xs font-semibold text-text-primary"
                >
                  View Profile
                </Link>
              )}
            </div>

            <div className="rounded-[7px] bg-white p-5">
              <h2 className="mb-4 text-sm font-bold text-text-primary">Shipping Address</h2>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-panel bg-tint-brand">
                  <MapPin size={14} className="text-brand" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-text-primary">
                    {order.shippingFullName ?? order.customer?.name ?? "—"}
                  </p>
                  <p className="text-xs text-text-muted">{shippingAddress}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
