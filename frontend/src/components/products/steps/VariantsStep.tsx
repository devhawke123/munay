import type { ProductDraft } from "../../../types/product";
import { variantKey } from "../../../types/product";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = ["Ivory", "Camel", "Terracotta", "Slate", "Black"];

type VariantsStepProps = {
  draft: ProductDraft;
  onChange: (patch: Partial<ProductDraft>) => void;
};

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function VariantsStep({ draft, onChange }: VariantsStepProps) {
  function setStock(color: string, size: string, qty: string) {
    onChange({
      stockByVariant: { ...draft.stockByVariant, [variantKey(color, size)]: qty },
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-display font-bold text-text-primary">Variants &amp; Stock</h2>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">Sizes</p>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const selected = draft.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => onChange({ sizes: toggle(draft.sizes, size) })}
                className={`rounded-panel border px-4 py-1.5 text-sm font-medium transition-colors ${
                  selected
                    ? "border-brand-accent bg-white text-text-primary"
                    : "border-transparent bg-brand-soft/60 text-text-muted"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">Colors</p>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => {
            const selected = draft.colors.includes(color);
            return (
              <button
                key={color}
                type="button"
                onClick={() => onChange({ colors: toggle(draft.colors, color) })}
                className={`rounded-panel border px-4 py-1.5 text-sm font-medium transition-colors ${
                  selected
                    ? "border-brand-accent bg-white text-text-primary"
                    : "border-transparent bg-brand-soft/60 text-text-muted"
                }`}
              >
                {color}
              </button>
            );
          })}
        </div>
      </div>

      {draft.sizes.length > 0 && draft.colors.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
            Stock per Variant
          </p>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-text-muted">
                <th className="pb-2 font-medium">Color / Size</th>
                {draft.sizes.map((size) => (
                  <th key={size} className="pb-2 text-center font-medium">
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {draft.colors.map((color) => (
                <tr key={color}>
                  <td className="py-1.5 font-medium text-text-primary">{color}</td>
                  {draft.sizes.map((size) => (
                    <td key={size} className="py-1.5 text-center">
                      <input
                        type="number"
                        min="0"
                        value={draft.stockByVariant[variantKey(color, size)] ?? ""}
                        onChange={(e) => setStock(color, size, e.target.value)}
                        className="w-16 rounded-panel border border-brand/10 bg-brand-soft/40 px-2 py-1 text-center text-sm outline-none focus:border-brand/40"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
