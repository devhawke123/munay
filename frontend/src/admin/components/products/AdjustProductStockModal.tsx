import { X } from "lucide-react";
import { useState } from "react";
import { PrimaryButton } from "../ui/PrimaryButton";
import type { Product } from "../../types/product";

export function AdjustProductStockModal({
  product,
  onCancel,
  onSave,
  error,
}: {
  product: Product;
  onCancel: () => void;
  onSave: (totalStock: number) => void;
  error?: string | null;
}) {
  const [value, setValue] = useState(String(product.stock));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[380px] rounded-[12px] bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-brand-border px-6 py-4">
          <h2 className="text-base font-display font-bold text-text-primary">Adjust Stock</h2>
          <button type="button" onClick={onCancel} className="text-text-muted hover:text-text-primary">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-text-primary">{product.name}</p>
            <p className="text-xs text-text-muted">
              {product.category} / {product.subcategory}
            </p>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Total Stock
            </span>
            <input
              type="number"
              min="0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-[10px] border border-brand-border bg-white px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand/40"
            />
          </label>

          {error && (
            <p className="rounded-[6px] bg-danger/10 px-3 py-2 text-xs font-medium text-danger">{error}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-brand-border px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-[10px] border border-brand-border bg-white px-5 py-2.5 text-sm font-medium text-text-primary"
          >
            Cancel
          </button>
          <PrimaryButton
            type="button"
            onClick={() => onSave(Math.max(0, Number(value) || 0))}
            className="!h-10 !py-0 !pl-5 !pr-5 text-sm"
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
