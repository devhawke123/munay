import { Boxes, ImageIcon, SquarePen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { inventoryApi, useWarehousesApi } from "../../hooks/useInventoryApi";
import type { Product } from "../../types/product";
import { AdjustProductStockModal } from "./AdjustProductStockModal";

function buildVariantRows(product: Product) {
  const colors = product.colors?.length ? product.colors : [""];
  const sizes = product.sizes?.length ? product.sizes : [""];

  return colors.flatMap((color) =>
    sizes.map((size) => {
      const label = [size, color].filter(Boolean).join(" / ") || "One Size";
      const skuSuffix = [size, color]
        .filter(Boolean)
        .map((part) => part.slice(0, 3).toUpperCase())
        .join("-");
      return {
        label,
        sku: skuSuffix ? `${product.sku}-${skuSuffix}` : product.sku,
        price: product.price,
        stock: product.stock,
        status: product.status,
      };
    }),
  );
}

export function VariantsTab({ product, onChanged }: { product: Product; onChanged: () => void }) {
  const { data: warehouses } = useWarehousesApi("PHYSICAL");
  const images = product.images ?? [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mainImage = images[selectedIndex];
  const [showAdjustStock, setShowAdjustStock] = useState(false);
  const [stockError, setStockError] = useState<string | null>(null);
  const rows = buildVariantRows(product);

  async function saveStock(totalStock: number) {
    const warehouseId = warehouses?.[0]?.id;
    if (!warehouseId) {
      setStockError("No warehouse available to adjust stock in.");
      return;
    }
    setStockError(null);
    try {
      await inventoryApi.adjustProductStock(warehouseId, product.id, totalStock);
      onChanged();
      setShowAdjustStock(false);
    } catch (err) {
      setStockError(err instanceof Error ? err.message : "Failed to adjust stock.");
    }
  }

  return (
    <div className="grid grid-cols-[550px_1fr_350px] items-start gap-5">
      <div className="rounded-card border border-brand-border bg-white p-4 shadow-card">
        <p className="text-sm font-display font-bold text-text-primary">Product Variants</p>
        <p className="mb-4 text-xs text-text-muted">All size and color combinations</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-brand-border text-xs text-text-muted">
                <th className="pb-2.5 font-medium uppercase">Variant</th>
                <th className="pb-2.5 font-medium uppercase">SKU</th>
                <th className="pb-2.5 font-medium uppercase">Price</th>
                <th className="pb-2.5 font-medium uppercase">Stock</th>
                <th className="pb-2.5 font-medium uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row.sku}-${index}`} className="border-b border-brand-border last:border-0">
                  <td className="py-3 text-[13px] font-medium text-text-primary">{row.label}</td>
                  <td className="py-3">
                    <span className="inline-flex h-[23px] items-center rounded-[6px] bg-surface-tan px-2 font-mono text-[11px] font-medium text-brand">
                      {row.sku}
                    </span>
                  </td>
                  <td className="py-3 text-[13px] font-semibold text-text-primary">{row.price}</td>
                  <td className="py-3 text-[13px] text-text-primary">{row.stock}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success">
                      <span className="h-[5px] w-[5px] rounded-full bg-success" />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="overflow-hidden rounded-[14px] border border-white/80 bg-white shadow-card">
        <div className="flex h-[420px] w-full items-center justify-center bg-brand-soft/30">
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
              <span className="font-medium text-text-primary">{product.subcategory}</span>
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
          <p className="mb-3 text-sm font-display font-bold text-text-primary">Quick Actions</p>
          <div className="flex flex-col gap-2">
            <Link
              to={`/admin/products/${product.id}/edit`}
              className="flex items-center gap-2 rounded-panel border border-brand-border px-3 py-2 text-left text-sm text-text-primary"
            >
              <SquarePen size={14} className="text-text-muted" />
              Edit Product
            </Link>
            <button
              type="button"
              onClick={() => setShowAdjustStock(true)}
              className="flex items-center gap-2 rounded-panel border border-brand-border px-3 py-2 text-left text-sm text-text-primary"
            >
              <Boxes size={14} className="text-text-muted" />
              Adjust Stock
            </button>
          </div>
        </div>
      </div>

      {showAdjustStock && (
        <AdjustProductStockModal
          product={product}
          onCancel={() => setShowAdjustStock(false)}
          onSave={saveStock}
          error={stockError}
        />
      )}
    </div>
  );
}
