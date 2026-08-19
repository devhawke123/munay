import { ArrowLeft, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { OverviewTab } from "../components/products/OverviewTab";
import { ProductTabs, type ProductTab } from "../components/products/ProductTabs";
import { useProducts } from "../context/ProductsContext";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, removeProduct } = useProducts();
  const [activeTab, setActiveTab] = useState<ProductTab>("Overview");

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-start gap-3">
          <p className="text-text-muted">Product not found.</p>
          <Link to="/admin/products" className="text-sm font-semibold text-brand-accent">
            ← Back to Products
          </Link>
        </div>
      </AdminLayout>
    );
  }

  function handleDelete() {
    if (!product) return;
    if (confirm(`Delete "${product.name}"? This can't be undone.`)) {
      removeProduct(product.id);
      navigate("/admin/products");
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div>
            <Link
              to="/admin/products"
              className="mb-3 inline-flex items-center gap-1.5 rounded-[10px] border border-brand-border bg-white px-4 py-1.5 text-xs font-medium text-text-primary"
            >
              <ArrowLeft size={14} />
              Products
            </Link>
            <h1 className="text-2xl font-bold text-ink">{product.name}</h1>
            <p className="text-xs text-text-muted">
              <span className="font-mono text-brand">{product.sku}</span> · {product.category} /{" "}
              {product.subcategory}
            </p>
          </div>

          <div className="flex gap-2.5">
            <button className="flex items-center gap-1.5 rounded-[10px] border border-brand-border bg-white px-4 py-2 text-sm font-medium text-text-primary">
              <SquarePen size={14} />
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-1.5 rounded-[10px] border border-danger/20 bg-danger/10 px-4 py-2 text-sm font-medium text-danger"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>

        <ProductTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "Overview" ? (
          <OverviewTab product={product} />
        ) : (
          <div className="rounded-card border border-brand-border bg-white p-10 text-center text-sm text-text-muted shadow-card">
            {activeTab} coming soon.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
