import { PackagePlus, BarChart2, Tag, ShoppingCart, FileText } from "lucide-react";

const actions = [
  { label: "Add Product", icon: PackagePlus },
  { label: "Analytics", icon: BarChart2 },
  { label: "Category", icon: Tag },
  { label: "Orders", icon: ShoppingCart },
  { label: "Content", icon: FileText },
];

export function QuickActions() {
  return (
    <div className="bg-brand-bg rounded-[11px] p-6 shadow-[0_1px_1px_rgba(26,13,5,0.03),0_4px_8px_rgba(26,13,5,0.06),0_16px_20px_rgba(26,13,5,0.04)]">
      <h3 className="text-sm font-display font-bold text-text-primary tracking-tight mb-2">Quick Actions</h3>

      <div className="flex items-center justify-between">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center justify-center gap-[1px] bg-brand-soft rounded-lg w-[74px] h-[68px] shadow-[0_4px_2px_rgba(0,0,0,0.15)] hover:brightness-95 transition-all"
          >
            <div className="w-[31px] h-[29px] bg-brand-dark rounded-[7px] flex items-center justify-center">
              <action.icon size={16} className="text-white" />
            </div>
            <span className="text-[10px] font-display font-medium text-text-primary text-center leading-[21px] tracking-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
