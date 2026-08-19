import { LayoutGrid, Package, ShoppingCart, Users, BarChart2, Boxes, FileText, Star, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import munayLogo from "../../assets/munay-logo.png";

export function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: LayoutGrid, path: "/admin" },
    { name: "Products", icon: Package, path: "/admin/products" },
    { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { name: "Customers", icon: Users, path: "/admin/customers" },
    { name: "Sales & Analytics", icon: BarChart2, path: "/admin/sales-analytics" },
    { name: "Inventory", icon: Boxes, path: "/admin/inventory" },
    { name: "Content Manager", icon: FileText, path: "/admin/content-manager" },
    { name: "Reviews", icon: Star, path: "/admin/reviews" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const isActive = (path: string) =>
    path === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(path);

  return (
    <div className="w-64 h-screen sticky top-0 bg-brand-panel border-r border-brand-border flex flex-col justify-between py-6 px-4">
      {/* Logo */}
      <div>
        <div className="mb-5 flex justify-center">
          <img src={munayLogo} alt="Munay" className="h-18 w-auto" />
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-panel text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "bg-brand-dark text-white"
                  : "text-text-muted hover:bg-gray-100"
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <button className="flex items-center gap-3 px-4 py-2.5 rounded-card text-sm font-medium bg-charcoal text-white hover:bg-gray-800 transition-colors">
        <LogOut size={18} />
        Log Out
      </button>
    </div>
  );
}
