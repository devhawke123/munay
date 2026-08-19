import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProductsProvider } from "./admin/context/ProductsContext";

const Home = lazy(() =>
  import("./web/theme.css").then(() =>
    import("./web/pages/Home").then((m) => ({ default: m.Home })),
  ),
);

const Dashboard = lazy(() =>
  import("./admin/pages/Dashboard").then((m) => ({ default: m.Dashboard })),
);
const Products = lazy(() =>
  import("./admin/pages/Products").then((m) => ({ default: m.Products })),
);
const ProductWizard = lazy(() =>
  import("./admin/pages/ProductWizard").then((m) => ({ default: m.ProductWizard })),
);
const ProductDetail = lazy(() =>
  import("./admin/pages/ProductDetail").then((m) => ({ default: m.ProductDetail })),
);
const Orders = lazy(() => import("./admin/pages/Orders").then((m) => ({ default: m.Orders })));
const OrderDetail = lazy(() =>
  import("./admin/pages/OrderDetail").then((m) => ({ default: m.OrderDetail })),
);
const Customers = lazy(() =>
  import("./admin/pages/Customers").then((m) => ({ default: m.Customers })),
);
const SalesAnalytics = lazy(() =>
  import("./admin/pages/SalesAnalytics").then((m) => ({ default: m.SalesAnalytics })),
);
const Inventory = lazy(() =>
  import("./admin/pages/Inventory").then((m) => ({ default: m.Inventory })),
);
const ContentManager = lazy(() =>
  import("./admin/pages/ContentManager").then((m) => ({ default: m.ContentManager })),
);
const Reviews = lazy(() => import("./admin/pages/Reviews").then((m) => ({ default: m.Reviews })));
const Settings = lazy(() =>
  import("./admin/pages/Settings").then((m) => ({ default: m.Settings })),
);

function AdminRoutes() {
  return (
    <ProductsProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<ProductWizard />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/sales-analytics" element={<SalesAnalytics />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/content-manager" element={<ContentManager />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </ProductsProvider>
  );
}

export function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
