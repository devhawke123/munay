import { type ComponentType, lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { ProductsProvider } from "./admin/context/ProductsContext";

// Every public page loads through this so web/theme.css (Tailwind config for
// the storefront) is guaranteed to load first — add new public pages here
// rather than calling lazy() directly.
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches React.lazy's own loose loader type
function lazyWebPage(loader: () => Promise<{ default: ComponentType<any> }>) {
  return lazy(() => import("./web/theme.css").then(() => loader()));
}

const Home = lazyWebPage(() => import("./web/pages/Home").then((m) => ({ default: m.Home })));
const CategoryPage = lazyWebPage(() =>
  import("./web/pages/CategoryPage").then((m) => ({ default: m.CategoryPage })),
);
const ProductTypePage = lazyWebPage(() =>
  import("./web/pages/ProductTypePage").then((m) => ({ default: m.ProductTypePage })),
);
const ProductPage = lazyWebPage(() =>
  import("./web/pages/ProductPage").then((m) => ({ default: m.ProductPage })),
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
const Reviews = lazy(() => import("./admin/pages/Reviews").then((m) => ({ default: m.Reviews })));
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
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export function App() {
  return (
    <ProductsProvider>
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
    </ProductsProvider>
  );
}
