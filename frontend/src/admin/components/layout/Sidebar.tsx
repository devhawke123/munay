import { LayoutGrid, Package, ShoppingCart, Users, BarChart2, Boxes, FileText, Star, Settings, LogOut, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import munayLogo from "../../assets/munay-logo.png";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
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
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 -translate-x-full flex-col justify-between border-r border-brand-border bg-brand-panel px-4 py-6 transition-transform duration-200 lg:static lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : ""
        }`}
      >
        {/* Logo */}
        <div>
          <div className="mb-5 flex items-center justify-between lg:justify-center">
            <img src={munayLogo} alt="Munay" className="h-18 w-auto" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="text-text-muted lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
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
    </>
  );
}
