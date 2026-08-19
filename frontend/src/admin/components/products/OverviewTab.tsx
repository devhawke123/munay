import { Star, ImageIcon, SquarePen, Boxes, LineChart as LineChartIcon } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { Product } from "../../types/product";

const monthlySales = [
  { month: "Jan", units: 40 },
  { month: "Feb", units: 62 },
  { month: "Mar", units: 65 },
  { month: "Apr", units: 58 },
  { month: "May", units: 82 },
  { month: "Jun", units: 95 },
];

const detailRows = (product: Product) => [
  { label: "Composition", value: product.composition },
  { label: "Weight", value: product.weight },
  { label: "Dimensions", value: product.dimensions },
  { label: "Origin", value: product.origin },
  { label: "Collection", value: product.collection },
];

const statTiles = (product: Product) => [
  { label: "Price", value: product.price, bg: "bg-tint-brand", labelColor: "text-text-muted", valueColor: "text-price-value" },
  { label: "Stock", value: product.stock, bg: "bg-tint-mint", labelColor: "text-label-slate", valueColor: "text-success" },
  { label: "Units Sold", value: product.sold, bg: "bg-tint-blue", labelColor: "text-label-slate", valueColor: "text-info" },
  { label: "Revenue", value: product.revenue, bg: "bg-tint-peach", labelColor: "text-label-slate", valueColor: "text-accent-orange" },
];

export function OverviewTab({ product }: { product: Product }) {
  const images = product.images ?? [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mainImage = images[selectedIndex];

  return (
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

          <p className="mb-3 mt-7 text-sm font-display font-bold text-text-primary">
            Monthly Sales
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={monthlySales}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#907868" }}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#907868" }} />
              <Bar dataKey="units" fill="#c9973a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-card border border-brand-border bg-white p-4 shadow-card">
          <p className="mb-3 text-sm font-display font-bold text-text-primary">Quick Actions</p>
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-2 rounded-panel border border-brand-border px-3 py-2 text-left text-sm text-text-primary">
              <SquarePen size={14} className="text-text-muted" />
              Edit Product
            </button>
            <button className="flex items-center gap-2 rounded-panel border border-brand-border px-3 py-2 text-left text-sm text-text-primary">
              <Boxes size={14} className="text-text-muted" />
              Adjust Stock
            </button>
            <button className="flex items-center gap-2 rounded-panel border border-brand-border px-3 py-2 text-left text-sm text-text-primary">
              <LineChartIcon size={14} className="text-text-muted" />
              View Analytics
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[14px] border border-white/80 bg-white shadow-card">
        <div className="flex h-[339px] w-full items-center justify-center bg-brand-soft/30">
          {mainImage ? (
            <img src={mainImage.url} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="text-text-muted" size={40} />
          )}
        </div>
        {images.length > 0 && (
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
          </div>
        )}
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
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Category</span>
              <span className="font-medium text-text-primary">
                {product.category} / {product.subcategory}
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
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Rating</span>
              <span className="flex items-center gap-1 font-medium text-text-primary">
                {product.rating ? (
                  <>
                    <Star size={14} className="fill-warning text-warning" />
                    {product.rating.toFixed(1)}
                  </>
                ) : (
                  "—"
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-card border border-brand-border bg-white p-4 shadow-card">
          <p className="mb-3 text-sm font-display font-bold text-text-primary">Product Details</p>
          <div className="flex flex-col gap-2.5 text-sm">
            {detailRows(product).map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-text-muted">{row.label}</span>
                <span className="font-medium text-text-primary">{row.value || "—"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
