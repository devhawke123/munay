import { AlertTriangle, Ban, Boxes, Globe, Package, ShoppingCart, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { getColorSwatch } from "./colorSwatches";
import { SearchBar } from "../ui/SearchBar";
import { StatusBadge, type StatusTone } from "../ui/StatusBadge";
import { formatTimeAgo, type LiveDeduction } from "../../data/liveDeductions";
import { getInventoryStatus, type InventoryItem, type InventoryStatus } from "../../types/inventory";

const STATUS_TONE: Record<InventoryStatus, StatusTone> = {
  "In Stock": "success",
  "Low Stock": "warning",
  "Out of Stock": "danger",
};

const STATUS_BAR_COLOR: Record<InventoryStatus, string> = {
  "In Stock": "bg-success",
  "Low Stock": "bg-warning",
  "Out of Stock": "bg-danger/40",
};

const FILTERS = ["All", "In Stock", "Low Stock", "Out of Stock"] as const;
type Filter = (typeof FILTERS)[number];

const STOCK_BAR_SCALE = 60;
const VISIBLE_VARIANTS = 3;

const STEPS = [
  {
    icon: Globe,
    title: "Website Inventory",
    description: "Every product & variant listed on the site is stocked here.",
  },
  {
    icon: ShoppingCart,
    title: "Customer Places Order",
    description: "A customer buys a product & variant from the website.",
  },
  {
    icon: Zap,
    title: "Automatic Deduction",
    description: "Stock is reduced instantly — no CSV, no manual.",
  },
];

type OnlineInventoryViewProps = {
  items: InventoryItem[];
  deductions: LiveDeduction[];
  onOpenAdjust: () => void;
  onSimulateOrder: () => void;
  onSelectItem: (itemId: string) => void;
};

export function OnlineInventoryView({
  items,
  deductions,
  onOpenAdjust,
  onSimulateOrder,
  onSelectItem,
}: OnlineInventoryViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const liveSkus = items.length;
  const lowStockCount = items.filter((i) => getInventoryStatus(i) === "Low Stock").length;
  const outOfStockCount = items.filter((i) => getInventoryStatus(i) === "Out of Stock").length;
  const unitsAvailable = items.reduce((sum, i) => sum + i.totalStock, 0);

  const visibleItems = items.filter((item) => {
    if (activeFilter !== "All" && getInventoryStatus(item) !== activeFilter) return false;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      item.product.toLowerCase().includes(query) ||
      item.sku.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex items-center justify-between gap-4 rounded-[10px] border border-black/[0.05] bg-[#E9FBF3] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-panel bg-white/60">
            <Globe size={18} className="text-success" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-display font-bold text-text-primary">
                Online Fulfilment Center
              </p>
              <span className="flex items-center gap-1 rounded-full bg-success px-2 py-0.5 text-[10px] font-semibold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                LIVE
              </span>
            </div>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-text-muted">
              <Zap size={11} className="text-success" />
              Website · Direct-to-customer — auto-deducts on every website order
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenAdjust}
            className="inline-flex h-[38px] items-center gap-2 rounded-[8px] border border-brand/10 bg-white px-4 text-xs font-semibold text-text-primary"
          >
            <Boxes size={13} />
            Adjust Stock
          </button>
          <button
            type="button"
            onClick={onSimulateOrder}
            className="inline-flex h-[38px] items-center gap-2 rounded-[8px] bg-success px-4 text-xs font-semibold text-white"
          >
            <ShoppingCart size={13} />
            Simulate website order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[10px]">
        {STEPS.map((step, index) => (
          <div
            key={step.title}
            className="flex items-start gap-3 rounded-[10px] border border-brand-border bg-white p-4"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-panel bg-tint-mint">
              <step.icon size={15} className="text-success" />
            </div>
            <div>
              <p className="text-xs font-display font-bold text-text-primary">
                {index + 1}. {step.title}
              </p>
              <p className="mt-0.5 text-[11px] text-text-muted">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-[10px]">
        <div className="flex items-center gap-3 rounded-card border border-black/[0.06] bg-[#E9FBF3] p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-panel bg-white/50">
            <Package size={18} className="text-success" />
          </div>
          <div>
            <p className="text-xl font-bold text-success">{liveSkus}</p>
            <p className="text-sm font-medium text-text-primary">Live SKUs</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-card border border-black/[0.06] bg-[#FFF3E0] p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-panel bg-white/50">
            <AlertTriangle size={18} className="text-warning" />
          </div>
          <div>
            <p className="text-xl font-bold text-warning">{lowStockCount}</p>
            <p className="text-sm font-medium text-text-primary">Low Stock</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-card border border-black/[0.06] bg-[#FFE7E7] p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-panel bg-white/50">
            <Ban size={18} className="text-danger" />
          </div>
          <div>
            <p className="text-xl font-bold text-danger">{outOfStockCount}</p>
            <p className="text-sm font-medium text-text-primary">Out of Stock</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-card border border-black/[0.06] bg-[#F9F7F4] p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-panel bg-white/50">
            <Boxes size={18} className="text-brand-dark" />
          </div>
          <div>
            <p className="text-xl font-bold text-brand-dark">{unitsAvailable}</p>
            <p className="text-sm font-medium text-text-primary">Units Available</p>
          </div>
        </div>
      </div>

      <div className="rounded-[7px] bg-white px-[14px] pb-9 pt-[17px]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-display font-bold text-text-primary">Online Stock Dashboard</p>
            <p className="text-xs text-text-muted">Real-time website availability per product &amp; variant.</p>
          </div>
          <div className="flex items-center gap-[11px]">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search products..."
              className="w-[240px]"
            />
            <div className="flex items-center gap-1 rounded-panel bg-brand-bg p-1">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-md px-3 py-1.5 text-xs font-display font-medium transition-colors ${
                    activeFilter === filter ? "bg-white text-text-primary shadow-card" : "text-text-muted"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-[18px] rounded bg-surface-muted px-[22px] py-3">
          <div className="grid grid-cols-[minmax(160px,1.6fr)_90px_minmax(120px,1fr)_100px_80px_minmax(160px,1.6fr)_100px] items-center gap-x-4 text-xs uppercase tracking-wide text-text-primary/70">
            <div>Product</div>
            <div>SKU</div>
            <div>Category</div>
            <div>Available</div>
            <div>Reorder</div>
            <div>Variants</div>
            <div>Status</div>
          </div>
        </div>

        <div className="mt-[10px] flex flex-col px-[18px]">
          {visibleItems.map((item) => {
            const status = getInventoryStatus(item);
            const barWidth = Math.min(100, (item.totalStock / STOCK_BAR_SCALE) * 100);
            const sortedVariants = [...item.variants].sort((a, b) => b.qty - a.qty);
            const shownVariants = sortedVariants.slice(0, VISIBLE_VARIANTS);
            const remaining = sortedVariants.length - shownVariants.length;

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className="grid cursor-pointer grid-cols-[minmax(160px,1.6fr)_90px_minmax(120px,1fr)_100px_80px_minmax(160px,1.6fr)_100px] items-center gap-x-4 border-b border-brand-border py-4 last:border-0 hover:bg-surface-muted/60"
              >
                <div className="text-sm font-display font-semibold text-text-primary">{item.product}</div>

                <div className="flex h-[23px] w-fit items-center justify-center rounded-[6px] bg-surface-tan px-2 font-mono text-[11px] font-medium text-brand">
                  {item.sku}
                </div>

                <div className="text-xs text-text-muted">
                  {item.category} · {item.subcategory}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-display font-bold text-text-primary">
                    {item.totalStock}
                  </span>
                  <div className="h-1.5 w-10 overflow-hidden rounded-full bg-surface-muted">
                    <div
                      className={`h-full rounded-full ${STATUS_BAR_COLOR[status]}`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>

                <div className="text-[13px] text-text-primary">{item.reorderPoint}</div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {shownVariants.map((variant) => (
                    <span
                      key={`${variant.color}-${variant.size}`}
                      className="flex items-center gap-1.5 rounded-full bg-surface-tan px-3 py-1.5 text-xs font-medium text-text-primary"
                    >
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: getColorSwatch(variant.color) }}
                      />
                      {variant.color} {variant.qty}
                    </span>
                  ))}
                  {remaining > 0 && (
                    <span className="rounded-full bg-surface-tan px-3 py-1.5 text-xs font-medium text-text-muted">
                      +{remaining}
                    </span>
                  )}
                </div>

                <StatusBadge label={status} tone={STATUS_TONE[status]} />
              </div>
            );
          })}

          {visibleItems.length === 0 && (
            <p className="py-8 text-center text-sm text-text-muted">No products match your search.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-[18px]">
        <div className="rounded-[7px] bg-white p-5">
          <p className="text-sm font-display font-bold text-text-primary">Live Deductions</p>
          <p className="text-xs text-text-muted">Stock removed automatically by website orders.</p>

          <div className="mt-4 flex flex-col gap-3">
            {deductions.length === 0 && (
              <p className="text-xs text-text-muted">No website orders yet.</p>
            )}
            {deductions.map((deduction) => (
              <div key={deduction.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-panel bg-tint-danger">
                    <ShoppingCart size={13} className="text-danger" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-text-primary">{deduction.product}</p>
                    <p className="text-[11px] text-text-muted">
                      {deduction.variantLabel} · {deduction.orderNumber}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-danger">{deduction.amount}</p>
                  <p className="text-[10px] text-text-muted">{formatTimeAgo(deduction.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-[10px] border border-black/[0.05] bg-[#EAFBF3] p-5">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-success" />
            <p className="text-xs font-semibold text-success">Fully automatic.</p>
          </div>
          <p className="text-xs leading-relaxed text-text-muted">
            Online stock lives in its own fulfilment center, separate from your physical
            warehouses. When a website order is placed, the exact product &amp; variant is
            deducted here in real time — so there's never a question of which warehouse the sale
            came from. You can still <strong className="text-text-primary">manually adjust</strong>{" "}
            stock any time for restocks or corrections.
          </p>
        </div>
      </div>
    </div>
  );
}
