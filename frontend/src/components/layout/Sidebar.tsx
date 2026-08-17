import { LayoutGrid, Package, ShoppingCart, Users, BarChart2, Boxes, FileText, Star, Settings, LogOut } from "lucide-react";
import munayLogo from "../../assets/munay-logo.png";

export function Sidebar() {
  const menuItems = [
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

  return (
    <div className="w-64 h-screen sticky top-0 bg-[#FBF7F0] border-r border-[#E8E6E1] flex flex-col justify-between py-6 px-4">
      {/* Logo */}
      <div>
        <div className="mb-5 flex justify-center">
          <img src={munayLogo} alt="Munay" className="h-18 w-auto" />
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-[#7C3F20] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium bg-[#1A1A1A] text-white hover:bg-gray-800 transition-colors">
        <LogOut size={18} />
        Log Out
      </button>
    </div>
  );
}
