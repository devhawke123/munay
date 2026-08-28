import { AlertTriangle } from "lucide-react";
import type { Product } from "../../types/product";

type DeleteProductConfirmProps = {
  product: Product;
  onCancel: () => void;
  onConfirm: () => void;
  error?: string | null;
};

export function DeleteProductConfirm({ product, onCancel, onConfirm, error }: DeleteProductConfirmProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[380px] rounded-[12px] bg-white shadow-card">
        <div className="flex flex-col items-center gap-3 px-6 py-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-danger/10">
            <AlertTriangle size={22} className="text-danger" />
          </div>
          <h2 className="text-base font-display font-bold text-text-primary">Delete this product?</h2>
          <p className="text-sm text-text-muted">
            <strong className="text-text-primary">{product.name}</strong> will be permanently
            removed from your store. This can't be undone.
          </p>
          {error && (
            <p className="w-full rounded-[6px] bg-danger/10 px-3 py-2 text-xs font-medium text-danger">
              {error}
            </p>
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
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-[10px] bg-danger px-5 py-2.5 text-sm font-semibold text-white"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}
