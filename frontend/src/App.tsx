import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("./pages/Dashboard").then((m) => ({ default: m.Dashboard })));
const Products = lazy(() => import("./pages/Products").then((m) => ({ default: m.Products })));
const ProductWizard = lazy(() =>
  import("./pages/ProductWizard").then((m) => ({ default: m.ProductWizard })),
);
const ProductDetail = lazy(() =>
  import("./pages/ProductDetail").then((m) => ({ default: m.ProductDetail })),
);
const Orders = lazy(() => import("./pages/Orders").then((m) => ({ default: m.Orders })));
const Customers = lazy(() => import("./pages/Customers").then((m) => ({ default: m.Customers })));
const SalesAnalytics = lazy(() =>
  import("./pages/SalesAnalytics").then((m) => ({ default: m.SalesAnalytics })),
);
const Inventory = lazy(() => import("./pages/Inventory").then((m) => ({ default: m.Inventory })));
const ContentManager = lazy(() =>
  import("./pages/ContentManager").then((m) => ({ default: m.ContentManager })),
);
const Reviews = lazy(() => import("./pages/Reviews").then((m) => ({ default: m.Reviews })));
const Settings = lazy(() => import("./pages/Settings").then((m) => ({ default: m.Settings })));

export function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/products/new" element={<ProductWizard />} />
        <Route path="/admin/products/:id" element={<ProductDetail />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/customers" element={<Customers />} />
        <Route path="/admin/sales-analytics" element={<SalesAnalytics />} />
        <Route path="/admin/inventory" element={<Inventory />} />
        <Route path="/admin/content-manager" element={<ContentManager />} />
        <Route path="/admin/reviews" element={<Reviews />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
