import { ArrowLeft, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { DeleteProductConfirm } from "../components/products/DeleteProductConfirm";
import { OverviewTab } from "../components/products/OverviewTab";
import { ProductTabs, type ProductTab } from "../components/products/ProductTabs";
import { VariantsTab } from "../components/products/VariantsTab";
import { productsApi, useProductApi } from "../hooks/useProductsApi";
import { apiProductToProduct } from "../types/product";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useProductApi(id ?? null);
  const [activeTab, setActiveTab] = useState<ProductTab>("Overview");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  if (loading) return <AdminLayout><p className="p-6 text-sm text-text-muted">Loading…</p></AdminLayout>;
  if (error)
    return (
      <AdminLayout>
        <p className="p-6 rounded-[6px] bg-danger/10 text-sm font-medium text-danger">{error.message}</p>
      </AdminLayout>
    );

  const product = data ? apiProductToProduct(data) : undefined;

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

  async function confirmDelete() {
    if (!product) return;
    setDeleteError(null);
    try {
      await productsApi.remove(product.id);
      navigate("/admin/products");
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete product.");
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
            <Link
              to={`/admin/products/${product.id}/edit`}
              className="flex items-center gap-1.5 rounded-[10px] border border-brand-border bg-white px-4 py-2 text-sm font-medium text-text-primary"
            >
              <SquarePen size={14} />
              Edit
            </Link>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1.5 rounded-[10px] border border-danger/20 bg-danger/10 px-4 py-2 text-sm font-medium text-danger"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>

        <ProductTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "Overview" && <OverviewTab product={product} onChanged={refetch} />}
        {activeTab === "Variants" && <VariantsTab product={product} onChanged={refetch} />}
      </div>

      {showDeleteConfirm && (
        <DeleteProductConfirm
          product={product}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={confirmDelete}
          error={deleteError}
        />
      )}
    </AdminLayout>
  );
}
