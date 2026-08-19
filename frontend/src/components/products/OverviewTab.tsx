import { Star, ImageIcon, SquarePen, Boxes, LineChart as LineChartIcon } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { Product } from "../../types/product";
import { StatCard } from "../ui/StatCard";

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

export function OverviewTab({ product }: { product: Product }) {
  const images = product.images ?? [];
  const mainImage = images[0];

  return (
    <div className="grid grid-cols-[260px_1fr_300px] gap-5 items-start">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2.5">
          <StatCard
            label="Price"
            value={product.price}
            icon={Boxes}
            iconBgClassName="bg-tint-brand"
            iconClassName="text-brand"
            valueClassName="text-brand-dark"
          />
          <StatCard
            label="Stock"
            value={product.stock}
            icon={Boxes}
            iconBgClassName="bg-tint-success"
            iconClassName="text-success"
            valueClassName="text-success"
          />
          <StatCard
            label="Units Sold"
            value={product.sold}
            icon={LineChartIcon}
            iconBgClassName="bg-info/10"
            iconClassName="text-info"
            valueClassName="text-info"
          />
          <StatCard
            label="Revenue"
            value={product.revenue}
            icon={Boxes}
            iconBgClassName="bg-warning/10"
            iconClassName="text-warning"
            valueClassName="text-warning"
          />
        </div>

        <div className="rounded-card border border-brand-border bg-white p-4 shadow-card">
          <p className="mb-3 text-sm font-display font-bold text-text-primary">Monthly Sales</p>
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

      <div className="flex flex-col gap-3">
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-card border border-brand-border bg-brand-soft/30">
          {mainImage ? (
            <img src={mainImage.url} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="text-text-muted" size={40} />
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-2">
            {images.slice(1).map((image) => (
              <div
                key={image.id}
                className="h-16 w-16 overflow-hidden rounded-panel border border-brand-border"
              >
                <img src={image.url} alt="" className="h-full w-full object-cover" />
              </div>
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
