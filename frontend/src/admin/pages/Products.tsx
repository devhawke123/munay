import {
  Box,
  ChevronDown,
  Ellipsis,
  Eye,
  ImageIcon,
  PackageCheck,
  PackageMinus,
  PackageX,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { StatCard } from "../components/ui/StatCard";
import { SearchBar } from "../components/ui/SearchBar";
import { productsApi, useProductsApi } from "../hooks/useProductsApi";
import { apiProductToProduct, type Product } from "../types/product";

function getStats(products: Product[]) {
  const activeCount = products.filter((p) => p.status === "Active").length;
  const lowStockCount = products.filter((p) => p.stockStatus === "LOW_STOCK").length;
  const outOfStockCount = products.filter((p) => p.stockStatus === "OUT_OF_STOCK").length;

  return [
    {
      label: "Total Products",
      value: String(products.length),
      icon: Box,
      iconBg: "bg-tint-brand",
      iconColor: "text-brand",
      valueColor: "text-brand-dark",
    },
    {
      label: "Active Products",
      value: String(activeCount),
      icon: PackageCheck,
      iconBg: "bg-tint-success",
      iconColor: "text-success",
      valueColor: "text-success",
    },
    {
      label: "Low Stock",
      value: String(lowStockCount),
      icon: PackageMinus,
      iconBg: "bg-tint-danger",
      iconColor: "text-danger",
      valueColor: "text-danger",
    },
    {
      label: "Out of Stock",
      value: String(outOfStockCount),
      icon: PackageX,
      iconBg: "bg-tint-brand",
      iconColor: "text-warning",
      valueColor: "text-warning",
    },
  ];
}

const CATEGORY_FILTERS = ["All Categories", "Men", "Women"] as const;
type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

function matchesCategoryFilter(product: Product, filter: CategoryFilter) {
  if (filter === "All Categories") return true;
  return product.category === filter;
}

function CategoryFilterButton({
  value,
  onChange,
}: {
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-[34px] items-center gap-3 rounded-[10px] border border-brand/10 bg-surface-muted px-4 text-xs text-text-primary"
      >
        <span>{value}</span>
        <ChevronDown size={14} className="text-text-muted" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-1.5 w-44 rounded-[12px] border border-brand-border bg-white p-1.5 shadow-card">
            {CATEGORY_FILTERS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`flex w-full items-center rounded-[8px] px-3 py-2 text-left text-sm hover:bg-brand-soft/60 ${
                  option === value ? "font-semibold text-brand-dark" : "text-text-primary"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const STATUS_FILTERS = ["All Statuses", "Active", "Low Stock", "Out of Stock"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

function matchesStatusFilter(product: Product, filter: StatusFilter) {
  if (filter === "All Statuses") return true;
  if (filter === "Active") return product.status === "Active";
  if (filter === "Low Stock") return product.stockStatus === "LOW_STOCK";
  return product.stockStatus === "OUT_OF_STOCK";
}

function StatusFilterButton({
  value,
  onChange,
}: {
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-[34px] items-center gap-3 rounded-[10px] border border-brand/10 bg-surface-muted px-4 text-xs text-text-primary"
      >
        <span>{value}</span>
        <ChevronDown size={14} className="text-text-muted" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-1.5 w-44 rounded-[12px] border border-brand-border bg-white p-1.5 shadow-card">
            {STATUS_FILTERS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`flex w-full items-center rounded-[8px] px-3 py-2 text-left text-sm hover:bg-brand-soft/60 ${
                  option === value ? "font-semibold text-brand-dark" : "text-text-primary"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Products() {
  const { data, loading, error, refetch } = useProductsApi();
  const products = (data ?? []).map(apiProductToProduct);
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All Statuses");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All Categories");
  const [deleteError, setDeleteError] = useState<string | null>(null);

  if (loading) return <AdminLayout><p className="p-6 text-sm text-text-muted">Loading…</p></AdminLayout>;
  if (error)
    return (
      <AdminLayout>
        <p className="p-6 rounded-[6px] bg-danger/10 text-sm font-medium text-danger">{error.message}</p>
      </AdminLayout>
    );

  const stats = getStats(products);

  async function handleDelete(product: Product) {
    if (!window.confirm(`Delete ${product.name}? This cannot be undone.`)) return;
    setDeleteError(null);
    try {
      await productsApi.remove(product.id);
      await refetch();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete product.");
    }
  }

  const visibleProducts = products.filter((product) => {
    if (!matchesStatusFilter(product, statusFilter)) return false;
    if (!matchesCategoryFilter(product, categoryFilter)) return false;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.subcategory.toLowerCase().includes(query)
    );
  });

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

        {deleteError && (
          <p className="rounded-[6px] bg-danger/10 px-4 py-2 text-sm font-medium text-danger">{deleteError}</p>
        )}

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
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search products..."
              className="w-[285px]"
            />
            <CategoryFilterButton value={categoryFilter} onChange={setCategoryFilter} />
            <StatusFilterButton value={statusFilter} onChange={setStatusFilter} />
          </div>

          
        </div>

        <div className="mt-[18px] rounded bg-surface-muted px-[22px] py-3">
          <div className="grid grid-cols-[minmax(190px,2fr)_90px_minmax(160px,1.4fr)_90px_70px_70px_100px_110px_60px] items-center gap-x-6 text-base text-text-primary/70">
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

        <div className="mt-[10px] flex flex-col px-[18px]">
          {visibleProducts.map((product) => (
            <div key={product.id} className="relative border-b border-brand-border last:border-0">
              <Link
                to={`/admin/products/${product.id}`}
                className="grid grid-cols-[minmax(190px,2fr)_90px_minmax(160px,1.4fr)_90px_70px_70px_100px_110px_60px] items-center gap-x-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-[60px] w-16 shrink-0 items-center justify-center overflow-hidden rounded-[11px] border border-brand/10 bg-brand-soft/30">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={20} className="text-text-muted" />
                    )}
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

                <div className="inline-flex h-[23.833px] w-fit items-center gap-[5px] rounded-full border border-success/20 bg-success/10 px-[10px] py-[3px]">
                  <span className="h-[5px] w-[5px] rounded-[2.5px] bg-success" />
                  <span className="text-[11px] font-display font-semibold tracking-[0.11px] text-success">
                    {product.status}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenMenuId((prev) => (prev === product.id ? null : product.id));
                  }}
                  className="flex h-8 w-8 items-center justify-center text-text-primary"
                >
                  <Ellipsis size={20} />
                </button>
              </Link>

              {openMenuId === product.id && (
                <div className="absolute right-0 top-full z-10 w-44 rounded-[12px] border border-brand-border bg-white p-1.5 shadow-card">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenMenuId(null);
                      navigate(`/admin/products/${product.id}`);
                    }}
                    className="flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-sm text-text-primary hover:bg-brand-soft/60"
                  >
                    <Eye size={15} />
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenMenuId(null);
                      navigate(`/admin/products/${product.id}`);
                    }}
                    className="flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-sm text-text-primary hover:bg-brand-soft/60"
                  >
                    <Pencil size={15} />
                    Edit Product
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenMenuId(null);
                      handleDelete(product);
                    }}
                    className="flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-sm text-danger hover:bg-danger/10"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    </AdminLayout>
  );
}
