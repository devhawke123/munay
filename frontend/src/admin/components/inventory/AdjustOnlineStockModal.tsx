import { Globe, Minus, Plus, Save, X } from "lucide-react";
import { useMemo, useState } from "react";
import { SearchBar } from "../ui/SearchBar";
import type { InventoryItem } from "../../types/inventory";

type AdjustOnlineStockModalProps = {
  warehouseName: string;
  items: InventoryItem[];
  onCancel: () => void;
  onSave: (updates: { id: string; totalStock: number }[]) => void;
};

export function AdjustOnlineStockModal({
  warehouseName,
  items,
  onCancel,
  onSave,
}: AdjustOnlineStockModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [values, setValues] = useState<Record<string, number>>({});

  const visibleItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return items;
    return items.filter(
      (item) => item.product.toLowerCase().includes(query) || item.sku.toLowerCase().includes(query),
    );
  }, [items, searchQuery]);

  function getValue(item: InventoryItem): number {
    return values[item.id] ?? item.totalStock;
  }

  const hasChanges = items.some((item) => getValue(item) !== item.totalStock);

  function setValue(item: InventoryItem, next: number) {
    setValues((prev) => ({ ...prev, [item.id]: Math.max(0, next) }));
  }

  function handleSave() {
    const updates = items
      .filter((item) => getValue(item) !== item.totalStock)
      .map((item) => ({ id: item.id, totalStock: getValue(item) }));
    onSave(updates);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="flex max-h-[85vh] w-full max-w-[420px] flex-col rounded-[12px] bg-white shadow-card">
        <div className="flex items-start justify-between border-b border-brand-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-panel bg-tint-mint">
              <Globe size={16} className="text-success" />
            </div>
            <div>
              <h2 className="text-base font-display font-bold text-text-primary">Adjust Online Stock</h2>
              <p className="text-xs text-text-muted">{warehouseName}</p>
            </div>
          </div>
          <button type="button" onClick={onCancel} className="text-text-muted hover:text-text-primary">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search products..."
            className="w-full"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          <div className="flex flex-col">
            {visibleItems.map((item) => {
              const value = getValue(item);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 border-b border-brand-border py-4 last:border-0"
                >
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{item.product}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="flex h-[20px] items-center rounded-[6px] bg-surface-tan px-1.5 font-mono text-[10px] font-medium text-brand">
                        {item.sku}
                      </span>
                      <span className="text-xs text-text-muted">Current: {item.totalStock}</span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setValue(item, value - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-border text-text-muted hover:bg-brand-soft/60"
                    >
                      <Minus size={13} />
                    </button>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setValue(item, Number(e.target.value) || 0)}
                      className="h-8 w-14 rounded-[8px] border border-brand-border bg-white text-center text-sm text-text-primary outline-none focus:border-brand/40"
                    />
                    <button
                      type="button"
                      onClick={() => setValue(item, value + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-border text-text-muted hover:bg-brand-soft/60"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              );
            })}

            {visibleItems.length === 0 && (
              <p className="py-8 text-center text-sm text-text-muted">No products match your search.</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-brand-border px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-[10px] border border-brand-border bg-white px-5 py-2.5 text-sm font-medium text-text-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!hasChanges}
            className="inline-flex h-10 items-center gap-1.5 rounded-[10px] bg-success px-5 text-sm font-semibold text-white disabled:pointer-events-none disabled:opacity-40"
          >
            <Save size={14} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
