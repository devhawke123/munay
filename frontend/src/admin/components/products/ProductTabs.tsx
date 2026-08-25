export const PRODUCT_TABS = ["Overview", "Variants"] as const;
export type ProductTab = (typeof PRODUCT_TABS)[number];

type ProductTabsProps = {
  activeTab: ProductTab;
  onChange: (tab: ProductTab) => void;
};

export function ProductTabs({ activeTab, onChange }: ProductTabsProps) {
  return (
    <div className="flex w-fit items-center gap-1 rounded-full border border-brand/10 bg-white p-1">
      {PRODUCT_TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`rounded-full px-4 py-2 text-sm font-display font-semibold transition-colors ${
            activeTab === tab
              ? "bg-brand-dark text-white"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
