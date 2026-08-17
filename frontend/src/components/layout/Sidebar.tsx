import {
  LayoutGrid,
  Package,
  ShoppingCart,
  Users,
  BarChart2,
  Boxes,
  FileText,
  Star,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import munayLogo from "../../assets/munay-logo.png";

const menuItems: { name: string; icon: LucideIcon; active?: boolean }[] = [
  { name: "Dashboard", icon: LayoutGrid, active: true },
  { name: "Products", icon: Package },
  { name: "Orders", icon: ShoppingCart },
  { name: "Customers", icon: Users },
  { name: "Sales & Analytics", icon: BarChart2 },
  { name: "Inventory", icon: Boxes },
  { name: "Content Manager", icon: FileText },
  { name: "Reviews", icon: Star },
  { name: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-56 shrink-0 flex-col justify-between border-r border-[#E8E6E1] bg-[#FBF7F0] px-3 py-4">
      <div>
        <div className="mb-4 flex justify-center">
          <img src={munayLogo} alt="Munay" className="h-12 w-auto" />
        </div>

        <nav className="flex flex-col gap-0.5">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-[#7C3F20] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon size={16} />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      <button className="flex items-center gap-3 rounded-lg bg-[#1A1A1A] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
        <LogOut size={16} />
        Log Out
      </button>
    </div>
  );
}
