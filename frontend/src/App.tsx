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
const OurStory = lazyWebPage(() =>
  import("./web/pages/OurStory").then((m) => ({ default: m.OurStory })),
);
const Heritage = lazyWebPage(() =>
  import("./web/pages/Heritage").then((m) => ({ default: m.Heritage })),
);
const CareGuide = lazyWebPage(() =>
  import("./web/pages/CareGuide").then((m) => ({ default: m.CareGuide })),
);
const BabyAlpacaFiber = lazyWebPage(() =>
  import("./web/pages/BabyAlpacaFiber").then((m) => ({ default: m.BabyAlpacaFiber })),
);
const PimaCotton = lazyWebPage(() =>
  import("./web/pages/PimaCotton").then((m) => ({ default: m.PimaCotton })),
);
const VicunaFiber = lazyWebPage(() =>
  import("./web/pages/VicunaFiber").then((m) => ({ default: m.VicunaFiber })),
);
const Journal = lazyWebPage(() =>
  import("./web/pages/Journal").then((m) => ({ default: m.Journal })),
);
const Faq = lazyWebPage(() => import("./web/pages/Faq").then((m) => ({ default: m.Faq })));
const Contact = lazyWebPage(() =>
  import("./web/pages/Contact").then((m) => ({ default: m.Contact })),
);
const OrderManagement = lazyWebPage(() =>
  import("./web/pages/OrderManagement").then((m) => ({ default: m.OrderManagement })),
);
const PrivacyPolicy = lazyWebPage(() =>
  import("./web/pages/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })),
);
const Stores = lazyWebPage(() => import("./web/pages/Stores").then((m) => ({ default: m.Stores })));
const TheWomen = lazyWebPage(() =>
  import("./web/pages/TheWomen").then((m) => ({ default: m.TheWomen })),
);
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
      <Route path="/products/:id/edit" element={<ProductWizard />} />
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
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/heritage" element={<Heritage />} />
            <Route path="/care-guide" element={<CareGuide />} />
            <Route path="/baby-alpaca-fiber" element={<BabyAlpacaFiber />} />
            <Route path="/pima-cotton" element={<PimaCotton />} />
            <Route path="/vicuna" element={<VicunaFiber />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/order-management" element={<OrderManagement />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/the-women" element={<TheWomen />} />
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
