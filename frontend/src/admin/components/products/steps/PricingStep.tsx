import { FormField } from "../FormField";
import type { ProductDraft } from "../../../types/product";

type PricingStepProps = {
  draft: ProductDraft;
  onChange: (patch: Partial<ProductDraft>) => void;
};

export function PricingStep({ draft, onChange }: PricingStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-display font-bold text-text-primary">Pricing &amp; Inventory</h2>

      <FormField
        label="Retail Price (CHF)"
        type="number"
        min="0"
        step="0.01"
        placeholder="0.00"
        value={draft.price}
        onChange={(e) => onChange({ price: e.target.value })}
        className="max-w-xs"
      />

      <FormField
        label="SKU (Stock Keeping Unit)"
        placeholder="e.g. MNY-TOP-LIN-001"
        value={draft.sku}
        onChange={(e) => onChange({ sku: e.target.value })}
      />

      <FormField
        label="Barcode (ISBN, UPC, GTIN)"
        placeholder="e.g. 012345678905"
        value={draft.barcode}
        onChange={(e) => onChange({ barcode: e.target.value })}
      />
    </div>
  );
}
