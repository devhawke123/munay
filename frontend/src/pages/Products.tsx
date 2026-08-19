import { Box, ChevronDown, Ellipsis, PackageCheck, PackageMinus, PackageX, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { StatCard } from "../components/ui/StatCard";
import { useProducts } from "../context/ProductsContext";

const stats = [
  {
    label: "Total Products",
    value: "248",
    icon: Box,
    iconBg: "bg-tint-brand",
    iconColor: "text-brand",
    valueColor: "text-brand-dark",
  },
  {
    label: "Active Products",
    value: "186",
    icon: PackageCheck,
    iconBg: "bg-tint-success",
    iconColor: "text-success",
    valueColor: "text-success",
  },
  {
    label: "Low Stock",
    value: "12",
    icon: PackageMinus,
    iconBg: "bg-tint-danger",
    iconColor: "text-danger",
    valueColor: "text-danger",
  },
  {
    label: "Out of Stock",
    value: "8",
    icon: PackageX,
    iconBg: "bg-tint-brand",
    iconColor: "text-warning",
    valueColor: "text-warning",
  },

];

function FilterButton({ label }: { label: string }) {
  return (
    <button className="flex h-[34px] items-center gap-3 rounded-[10px] border border-brand/10 bg-surface-muted px-4 text-xs text-text-primary">
      <span>{label}</span>
      <ChevronDown size={14} className="text-text-muted" />
    </button>
  );
}

export function Products() {
  const { products } = useProducts();

  return (
    <AdminLayout>
      <div className="flex flex-col gap-[38px]">
        <div className="flex items-start justify-between">
          <div className="w-[384px]">
            <h1 className="text-2xl font-bold text-ink">Products</h1>
            <p className="text-[15px] font-medium text-brand-dark">
              Manage and organize all your store products.
            </p>
          </div>

          <Link to="/admin/products/new">
            <PrimaryButton className="w-[162px]">+ Add Product</PrimaryButton>
          </Link>
        </div>

        <div className="grid grid-cols-5 gap-[10px]">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              iconBgClassName={stat.iconBg}
              iconClassName={stat.iconColor}
              valueClassName={stat.valueColor}
            />
          ))}
        </div>

        <div className="rounded-[7px] bg-white px-[14px] pb-9 pt-[17px]">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-[11px]">
            <div className="flex h-[37px] w-[285px] items-center gap-2 rounded-[10px] border border-brand/10 bg-surface-muted px-[14px]">
              <Search size={13} className="text-text-muted" />
              <span className="text-[13px] text-text-primary/50">
                Search products...
              </span>
            </div>
            <FilterButton label="All Categories" />
            <FilterButton label="All Statuses" />
          </div>

          
        </div>

        <div className="mt-[18px] rounded bg-surface-muted px-[22px] py-3">
          <div className="grid grid-cols-[190px_80px_185px_74px_48px_48px_76px_84px_60px] items-center text-base text-text-primary/70">
            <div>Product</div>
            <div>SKU</div>
            <div>Category</div>
            <div>Price</div>
            <div>Stock</div>
            <div>Sold</div>
            <div>Revenue</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
        </div>

        <div className="mt-[26px] flex flex-col gap-[26px] px-[18px]">
          {products.map((product, index) => (
            <div
              key={`${product.sku}-${index}`}
              className="grid grid-cols-[190px_80px_185px_74px_48px_48px_76px_84px_60px] items-center"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-[60px] w-16 items-center justify-center rounded-[11px] border border-brand/10 bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700 text-xs font-semibold text-white">
                  IMG
                </div>
                <span className="text-base font-display font-semibold leading-5 text-text-primary">
                  {product.name}
                </span>
              </div>

              <div className="flex h-[23px] w-[52px] items-center justify-center rounded-[6px] bg-surface-tan font-mono text-[11px] font-medium text-brand">
                {product.sku}
              </div>

              <div className="flex items-center gap-1 text-xs leading-[18px]">
                <span className="font-display font-semibold text-text-primary">
                  {product.category}
                </span>
                <span className="text-brand/30">/</span>
                <span className="text-text-muted">{product.subcategory}</span>
              </div>

              <div className="text-sm font-display font-bold text-text-primary">
                {product.price}
              </div>
              <div className="text-[13px] font-medium text-text-primary">
                {product.stock}
              </div>
              <div className="text-[13px] text-text-primary">{product.sold}</div>
              <div className="text-[13px] font-display font-bold text-text-primary">
                {product.revenue}
              </div>

              <div className="inline-flex h-[23.833px] items-center gap-[5px] rounded-full border border-success/20 bg-success/10 px-[10px] py-[3px]">
                <span className="h-[5px] w-[5px] rounded-[2.5px] bg-success" />
                <span className="text-[11px] font-display font-semibold tracking-[0.11px] text-success">
                  {product.status}
                </span>
              </div>

              <button className="flex h-8 w-8 items-center justify-center text-text-primary">
                <Ellipsis size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
      </div>
    </AdminLayout>
  );
}
