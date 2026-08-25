import { X } from "lucide-react";
import { useState } from "react";
import { FormField } from "../FormField";
import type { ProductDraft } from "../../../types/product";

type BasicInfoStepProps = {
  draft: ProductDraft;
  onChange: (patch: Partial<ProductDraft>) => void;
};

export function BasicInfoStep({ draft, onChange }: BasicInfoStepProps) {
  const [tagInput, setTagInput] = useState("");

  function addTag() {
    const tag = tagInput.trim();
    if (tag && !draft.tags.includes(tag)) {
      onChange({ tags: [...draft.tags, tag] });
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    onChange({ tags: draft.tags.filter((t) => t !== tag) });
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-display font-bold text-text-primary">Basic Information</h2>

      <FormField
        label="Product Name"
        placeholder="e.g. Alpaca Silk Scarf — Geometric"
        value={draft.name}
        onChange={(e) => onChange({ name: e.target.value })}
      />

      <FormField
        as="textarea"
        label="Description"
        rows={3}
        placeholder="Describe the product in detail — materials, fit, care instructions..."
        value={draft.description}
        onChange={(e) => onChange({ description: e.target.value })}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Main Category"
          placeholder="e.g. Men"
          value={draft.mainCategory}
          onChange={(e) => onChange({ mainCategory: e.target.value })}
        />
        <FormField
          label="Subcategory"
          placeholder="e.g. Outerwears"
          value={draft.subcategory}
          onChange={(e) => onChange({ subcategory: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Category Page Group (optional)"
          placeholder="e.g. Ready to Wear, Accessories"
          value={draft.group}
          onChange={(e) => onChange({ group: e.target.value })}
        />
        <FormField
          label="Listing Page Section (optional)"
          placeholder="e.g. Scarfs, Shawls"
          value={draft.section}
          onChange={(e) => onChange({ section: e.target.value })}
        />
      </div>
      <p className="-mt-3 text-xs text-text-muted">
        Group organizes subcategories on the public category page (blank falls back to "More").
        Section splits a subcategory's own listing page into headed sub-grids (blank keeps one
        flat grid).
      </p>

      <FormField
        label="Brand / Collection"
        placeholder="e.g. Munay Essentials"
        value={draft.brand}
        onChange={(e) => onChange({ brand: e.target.value })}
      />

      <div className="rounded-panel border border-brand-border p-4">
        <p className="mb-3 text-sm font-display font-bold text-text-primary">Product Details</p>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Composition"
            placeholder="e.g. 70% Baby Alpaca, 30% Silk"
            value={draft.composition}
            onChange={(e) => onChange({ composition: e.target.value })}
          />
          <FormField
            label="Weight"
            placeholder="e.g. 130g"
            value={draft.weight}
            onChange={(e) => onChange({ weight: e.target.value })}
          />
          <FormField
            label="Dimensions"
            placeholder="e.g. 160 x 50 cm"
            value={draft.dimensions}
            onChange={(e) => onChange({ dimensions: e.target.value })}
          />
          <FormField
            label="Origin"
            placeholder="e.g. Made in Peru"
            value={draft.origin}
            onChange={(e) => onChange({ origin: e.target.value })}
          />
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted">
          Tags
        </p>
        <div className="mb-2 flex flex-wrap gap-2">
          {draft.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-text-primary"
            >
              {tag}
              <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            className="flex-1 rounded-[10px] border border-brand/10 bg-brand-soft/40 px-4 py-2 text-sm text-text-primary placeholder-text-muted outline-none focus:border-brand/40"
          />
          <button
            type="button"
            onClick={addTag}
            className="rounded-[10px] border border-brand-border bg-white px-4 text-sm font-medium text-text-primary"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
