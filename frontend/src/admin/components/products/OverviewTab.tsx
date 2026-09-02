import { ImageIcon, SquarePen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product";

const detailRows = (product: Product) => [
  { label: "Composition", value: product.composition },
  { label: "Fiber", value: product.fiber },
  { label: "Care Instructions", value: product.careInstructions },
];

const statTiles = (product: Product) => [
  { label: "Price", value: product.price, bg: "bg-tint-brand", labelColor: "text-text-muted", valueColor: "text-price-value" },
  { label: "Units Sold", value: product.sold, bg: "bg-tint-blue", labelColor: "text-label-slate", valueColor: "text-info" },
  { label: "Revenue", value: product.revenue, bg: "bg-tint-peach", labelColor: "text-label-slate", valueColor: "text-accent-orange" },
];

const MIN_IMAGE_SLOTS = 4;

export function OverviewTab({ product }: { product: Product }) {
  const images = product.images ?? [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mainImage = images[selectedIndex];
  const emptySlots = Math.max(MIN_IMAGE_SLOTS - images.length, 0);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-[420px_1fr_300px] gap-5 items-start">
        <div className="flex flex-col gap-4">
          <div className="rounded-[14px] border border-white/80 bg-white py-6 pl-[11px] pr-6 shadow-card">
            <div className="flex flex-wrap gap-[7px]">
              {statTiles(product).map((tile) => (
                <div
                  key={tile.label}
                  className={`flex w-[73px] flex-col gap-1.5 rounded-[9px] px-2 py-4 ${tile.bg}`}
                >
                  <p className={`text-[9px] font-bold uppercase tracking-wide ${tile.labelColor}`}>
                    {tile.label}
                  </p>
                  <p className={`text-sm font-display font-black tracking-tight ${tile.valueColor}`}>
                    {tile.value}
                  </p>
                </div>
              ))}
              
            </div>
            
          </div>

          <div className="rounded-card border border-brand-border bg-white p-4 shadow-card">
            <p className="mb-3 text-sm font-display font-bold text-text-primary">Quick Actions</p>
            
            <div className="flex flex-col gap-2">
              <Link
                to={`/admin/products/${product.id}/edit`}
                className="flex items-center gap-2 rounded-panel border border-brand-border px-3 py-2 text-left text-sm text-text-primary"
              >
                <SquarePen size={14} className="text-text-muted" />
                Edit Product
              </Link>
            </div>
            
          </div>
            {product.description && (
        <div className="rounded-card border border-brand-border bg-white p-4 shadow-card">
          <p className="mb-2 text-sm font-display font-bold text-text-primary">Description</p>
          <p className=" text-sm leading-relaxed text-text-primary">
            {product.description}
          </p>
        </div>
      )}
        </div>

        <div className="overflow-hidden rounded-[14px] border border-white/80 bg-white shadow-card">
          <div className="flex h-[339px] w-full items-center justify-center bg-brand-soft/30">
            {mainImage ? (
              <img src={mainImage.url} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <ImageIcon className="text-text-muted" size={40} />
            )}
          </div>
          
          <div className="flex gap-2 p-3">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`h-14 w-14 shrink-0 overflow-hidden rounded-[9px] border-2 ${
                  index === selectedIndex ? "border-price-value" : "border-transparent"
                }`}
              >
                <img src={image.url} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
            
            {Array.from({ length: emptySlots }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[9px] border-2 border-dashed border-brand-border bg-brand-soft/30"
              >
                <ImageIcon className="text-text-muted" size={16} />
              </div>
            ))}
            
          </div>
          
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-card border border-brand-border bg-white p-4 shadow-card">
            <p className="mb-3 text-sm font-display font-bold text-text-primary">Details</p>
            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Status</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success">
                  <span className="h-[5px] w-[5px] rounded-full bg-success" />
                  {product.status}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <span className="shrink-0 text-text-muted">Category</span>
                <span className="text-right font-medium leading-snug text-text-primary">
                  {product.categorySummary}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">SKU</span>
                <span className="font-mono text-xs font-medium text-brand">{product.sku}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Price</span>
                <span className="font-display font-bold text-text-primary">{product.price}</span>
              </div>
            </div>
          </div>

          <div className="rounded-card border border-brand-border bg-white p-4 shadow-card">
            <p className="mb-3 text-sm font-display font-bold text-text-primary">Product Details</p>
            <div className="flex flex-col divide-y divide-brand-border/60">
              {detailRows(product).map((row) => (
                <div key={row.label} className="flex flex-col gap-1 py-2.5 first:pt-0 last:pb-0">
                  <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                    {row.label}
                  </span>
                  <span className="text-sm font-medium leading-relaxed text-text-primary">
                    {row.value || "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
}
