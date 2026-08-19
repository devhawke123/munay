export const PRODUCT_TABS = ["Overview", "Variants"] as const;
export type ProductTab = (typeof PRODUCT_TABS)[number];

type ProductTabsProps = {
  activeTab: ProductTab;
  onChange: (tab: ProductTab) => void;
};

export function ProductTabs({ activeTab, onChange }: ProductTabsProps) {
  return (
    <div className="flex items-center gap-1 rounded-panel bg-brand-soft/40 p-1 w-fit">
      {PRODUCT_TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`rounded-md px-4 py-2 text-sm font-display font-medium transition-colors ${
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
