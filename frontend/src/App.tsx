import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { ProductsProvider } from "./admin/context/ProductsContext";
import { OrdersProvider } from "./admin/context/OrdersContext";

const Home = lazy(() =>
  import("./web/theme.css").then(() =>
    import("./web/pages/Home").then((m) => ({ default: m.Home })),
  ),
);
const CategoryPage = lazy(() =>
  import("./web/theme.css").then(() =>
    import("./web/pages/CategoryPage").then((m) => ({ default: m.CategoryPage })),
  ),
);
const ProductTypePage = lazy(() =>
  import("./web/theme.css").then(() =>
    import("./web/pages/ProductTypePage").then((m) => ({ default: m.ProductTypePage })),
  ),
);
const ProductPage = lazy(() =>
  import("./web/theme.css").then(() =>
    import("./web/pages/ProductPage").then((m) => ({ default: m.ProductPage })),
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
const CustomerDetail = lazy(() =>
  import("./admin/pages/CustomerDetail").then((m) => ({ default: m.CustomerDetail })),
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
const Settings = lazy(() =>
  import("./admin/pages/Settings").then((m) => ({ default: m.Settings })),
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProductPageRoute() {
  const { productId } = useParams<{ productId: string }>();
  return <ProductPage key={productId} />;
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/new" element={<ProductWizard />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:orderId" element={<OrderDetail />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/customers/:customerId" element={<CustomerDetail />} />
      <Route path="/sales-analytics" element={<SalesAnalytics />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/content-manager" element={<ContentManager />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export function App() {
  return (
    <ProductsProvider>
      <OrdersProvider>
        <Suspense fallback={null}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
            <Route
              path="/category/:categorySlug/:subcategorySlug"
              element={<ProductTypePage />}
            />
            <Route
              path="/category/:categorySlug/:subcategorySlug/:productId"
              element={<ProductPageRoute />}
            />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </OrdersProvider>
    </ProductsProvider>
  );
}
