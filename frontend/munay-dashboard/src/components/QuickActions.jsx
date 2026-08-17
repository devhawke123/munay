import { PackagePlus, BarChart2, Tag, ShoppingCart, FileText } from "lucide-react";

const actions = [
  { label: "Add Product", icon: PackagePlus },
  { label: "Analytics", icon: BarChart2 },
  { label: "Category", icon: Tag },
  { label: "Orders", icon: ShoppingCart },
  { label: "Content", icon: FileText },
];

function QuickActions() {
  return (
    <div className="bg-white border border-[#E8E6E1] rounded-xl p-4 -ml-4">
      <h3 className="text-sm font-bold text-gray-900 mb-4">Quick Actions</h3>

      <div className="grid grid-cols-5 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center justify-center gap-2 bg-[#FDF4E7] rounded-lg py-4 hover:bg-[#F3E4D0] transition-colors"
          >
            <action.icon size={18} className="text-[#7C3F20]" />
            <span className="text-xs font-medium text-gray-700 text-center">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;