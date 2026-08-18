import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { Orders } from "./pages/Orders";
import { Customers } from "./pages/Customers";
import { SalesAnalytics } from "./pages/SalesAnalytics";
import { Inventory } from "./pages/Inventory";
import { ContentManager } from "./pages/ContentManager";
import { Reviews } from "./pages/Reviews";
import { Settings } from "./pages/Settings";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/products" element={<Products />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin/customers" element={<Customers />} />
      <Route path="/admin/sales-analytics" element={<SalesAnalytics />} />
      <Route path="/admin/inventory" element={<Inventory />} />
      <Route path="/admin/content-manager" element={<ContentManager />} />
      <Route path="/admin/reviews" element={<Reviews />} />
      <Route path="/admin/settings" element={<Settings />} />
    </Routes>
  );
}
