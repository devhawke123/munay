import { PackagePlus, BarChart2, Tag, ShoppingCart, FileText, type LucideIcon } from "lucide-react";

const actions: { label: string; icon: LucideIcon }[] = [
  { label: "Add Product", icon: PackagePlus },
  { label: "Analytics", icon: BarChart2 },
  { label: "Category", icon: Tag },
  { label: "Orders", icon: ShoppingCart },
  { label: "Content", icon: FileText },
];

export function QuickActions() {
  return (
    <div className="shrink-0 rounded-xl border border-[#E8E6E1] bg-white p-3">
      <h3 className="mb-2 text-sm font-bold text-gray-900">Quick Actions</h3>

      <div className="grid grid-cols-5 gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center justify-center gap-1 rounded-lg bg-[#FDF4E7] py-2 transition-colors hover:bg-[#F3E4D0]"
          >
            <action.icon size={16} className="text-[#7C3F20]" />
            <span className="text-center text-[11px] font-medium text-gray-700">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
