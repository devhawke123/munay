import { AlertTriangle, ArrowLeft, Boxes } from "lucide-react";
import { getColorSwatch } from "./colorSwatches";
import {
  getItemColors,
  getItemSizes,
  getVariantCellStatus,
  getVariantQty,
  getVariantsInStockCount,
  type InventoryItem,
} from "../../types/inventory";

type ProductVariantDetailProps = {
  item: InventoryItem;
  onBack: () => void;
};

const CELL_CLASS: Record<string, string> = {
  healthy: "bg-[#00BC7D1A] text-[#00BC7D]",
  "running-low": "bg-[#FE9A001F] text-[#FE9A00]",
  "out-of-stock": "bg-tint-danger text-danger",
  "not-offered": "bg-surface-muted text-text-muted",
};

const SIZE_LABELS: Record<string, string> = {
  S: "Small",
  M: "Medium",
  L: "Large",
  XS: "Extra Small",
  XL: "Extra Large",
  OS: "One Size",
};

function sizeLabel(size: string): string {
  return SIZE_LABELS[size] ?? size;
}

function joinSizeLabels(sizes: string[]): string {
  const labels = sizes.map(sizeLabel);
  if (labels.length <= 1) return labels.join("");
  return `${labels.slice(0, -1).join(", ")} & ${labels[labels.length - 1]}`;
}

const LEGEND = [
  { key: "healthy", label: "Healthy", dot: "bg-[#00BC7D]" },
  { key: "running-low", label: "Running low", dot: "bg-[#FE9A00]" },
  { key: "out-of-stock", label: "Out of stock", dot: "bg-danger" },
  { key: "not-offered", label: "Not offered", dot: "bg-text-muted/40" },
] as const;

export function ProductVariantDetail({ item, onBack }: ProductVariantDetailProps) {
  const colors = getItemColors(item);
  const sizes = getItemSizes(item);
  const { inStock, total } = getVariantsInStockCount(item);

  return (
    <div className="flex flex-col gap-[18px]">
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-text-primary"
      >
        <ArrowLeft size={13} />
        Back to inventory
      </button>

      <div className="grid grid-cols-4 gap-[10px]">
        <div className="flex items-center gap-3 rounded-card border border-black/[0.06] bg-[#FBE7D4] p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-panel bg-white/50">
            <Boxes size={18} className="text-brand" />
          </div>
          <div>
            <p className="text-xl font-bold text-brand-dark">{item.totalStock}</p>
            <p className="text-sm font-medium text-text-primary">Total Units</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-card border border-black/[0.06] bg-[#FFFAF2] p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-panel bg-white/50">
            <AlertTriangle size={18} className="text-warning" />
          </div>
          <div>
            <p className="text-xl font-bold text-warning">{colors.length}</p>
            <p className="text-sm font-medium text-text-primary">Colors</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-card border border-black/[0.06] bg-[#CBFFEF] p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-panel bg-white/50">
            <span className="text-[9px] font-bold text-success">{sizes.join("/")}</span>
          </div>
          <div>
            <p className="text-xl font-bold text-success">{sizes.length}</p>
            <p className="text-sm font-medium text-text-primary">Sizes</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-card border border-black/[0.06] bg-[#F9F7F4] p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-panel bg-white/50">
            <AlertTriangle size={18} className="text-warning" />
          </div>
          <div>
            <p className="text-xl font-bold text-text-primary">
              {inStock}/{total}
            </p>
            <p className="text-sm font-medium text-text-primary">Variants In Stock</p>
          </div>
        </div>
      </div>

      <div className="rounded-[7px] bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-display font-bold text-text-primary">
              Availability by color &amp; size
            </p>
            <p className="mt-1 text-xs text-text-muted">
              For each color, see how many units are in stock in{" "}
              <strong className="text-text-primary">{joinSizeLabels(sizes)}</strong>.
            </p>
          </div>
          <span className="rounded-full bg-surface-tan px-3 py-1 text-[11px] font-semibold text-text-muted">
            {colors.length} colors · {sizes.length} sizes
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          {colors.map((color) => {
            const colorTotal = item.variants
              .filter((v) => v.color === color)
              .reduce((sum, v) => sum + v.qty, 0);

            return (
              <div key={color} className="rounded-[10px] bg-tint-brand p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full border border-black/10"
                      style={{ backgroundColor: getColorSwatch(color) }}
                    />
                    <span className="text-[15px] font-display font-bold text-text-primary">{color}</span>
                  </div>
                  <span className="text-xs text-text-muted">
                    <span className="font-semibold text-text-primary">{colorTotal}</span> units
                  </span>
                </div>

                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${sizes.length}, 1fr)` }}>
                  {sizes.map((size) => {
                    const qty = getVariantQty(item, color, size);
                    const status = getVariantCellStatus(qty);
                    return (
                      <div
                        key={size}
                        className={`flex flex-col items-center gap-0.5 rounded-[8px] py-3 ${CELL_CLASS[status]}`}
                      >
                        <span className="text-[12px] font-bold uppercase tracking-wide text-text-primary">
                          {size}
                        </span>
                        <span className="text-xl font-display font-bold leading-tight">
                          {status === "out-of-stock" ? "Out" : status === "not-offered" ? "—" : qty}
                        </span>
                        <span className="text-[10px] text-text-muted/70">{sizeLabel(size)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-brand-border pt-4">
          <div className="flex items-center gap-4">
            {LEGEND.map((entry) => (
              <div key={entry.key} className="flex items-center gap-1.5 text-[11px] text-text-muted">
                <span className={`h-3 w-3 rounded-full ${entry.dot}`} />
                {entry.label}
              </div>
            ))}
          </div>
          <span className="text-[11px] text-text-muted">Reorder point: {item.reorderPoint}</span>
        </div>
      </div>
    </div>
  );
}
