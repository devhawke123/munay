import { Download, Upload } from "lucide-react";
import { useState } from "react";
import { AdminLayout } from "../components/layout/AdminLayout";
import { ChannelBreakdown } from "../components/sales/ChannelBreakdown";
import { ExportReportModal } from "../components/sales/ExportReportModal";
import type { ExportScopeOption } from "../components/sales/exportUtils";
import { ImportCsvModal } from "../components/sales/import-csv/ImportCsvModal";
import { RecentWebsiteOrders } from "../components/sales/RecentWebsiteOrders";
import { RevenueOverviewChart } from "../components/sales/RevenueOverviewChart";
import { SalesByStoreTable } from "../components/sales/SalesByStoreTable";
import { SalesStatCard } from "../components/sales/SalesStatCard";
import { TopPerformingProducts } from "../components/sales/TopPerformingProducts";
import { useOrdersApi } from "../hooks/useOrdersApi";
import {
  useChannelBreakdownApi,
  useRevenueOverviewApi,
  useSalesByStoreApi,
  useSalesSummaryApi,
  useTopProductsApi,
  type ApiGranularity,
} from "../hooks/useSalesApi";
import { formatCurrency } from "../lib/money";

const tabs = ["Overview", "In-Store Sales", "Website Sales"] as const;
type Tab = (typeof tabs)[number];

const TAB_CONFIG: Record<
  Tab,
  { title: string; subtitle: string; stat1Label: string; stat2Label: string; actions: "export-only" | "export-import" }
> = {
  Overview: {
    title: "Sales & Analytics",
    subtitle: "Track performance, understand trends, and grow revenue.",
    stat1Label: "Total Revenue",
    stat2Label: "Avg. Order Value",
    actions: "export-only",
  },
  "In-Store Sales": {
    title: "In-Store Sales Overview",
    subtitle: "Track performance, understand trends, and grow revenue",
    stat1Label: "Total In-Store Revenue",
    stat2Label: "Total Transactions",
    actions: "export-import",
  },
  "Website Sales": {
    title: "Website Sales",
    subtitle: "Track and analyze your website / e-commerce performance.",
    stat1Label: "Website Revenue",
    stat2Label: "Total Orders",
    actions: "export-only",
  },
};

export function SalesAnalytics() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [granularity, setGranularity] = useState<ApiGranularity>("weekly");

  const summaryChannel = activeTab === "In-Store Sales" ? "IN_STORE" : activeTab === "Website Sales" ? "ONLINE" : undefined;
  const { data: summary, refetch: refetchSummary } = useSalesSummaryApi({ channel: summaryChannel });
  const { data: revenue, refetch: refetchRevenue } = useRevenueOverviewApi({ granularity });
  const { data: topProducts, refetch: refetchTopProducts } = useTopProductsApi();
  const { data: storeSales, refetch: refetchStoreSales } = useSalesByStoreApi();
  const { data: websiteOrders } = useOrdersApi({ channel: "ONLINE" });
  const { data: channelBreakdown, refetch: refetchChannelBreakdown } = useChannelBreakdownApi();

  function refetchAll() {
    refetchSummary();
    refetchRevenue();
    refetchTopProducts();
    refetchStoreSales();
    refetchChannelBreakdown();
  }

  const config = TAB_CONFIG[activeTab];
  const stat1Value = formatCurrency(summary?.revenue ?? 0);
  const stat2Value =
    activeTab === "Overview" ? formatCurrency(summary?.avgOrderValue ?? 0) : String(summary?.orderCount ?? 0);

  const revenueSection = {
    title: "Revenue Overview",
    headers: ["Period", "Revenue", "Orders"],
    rows: (revenue ?? []).map((d) => [
      new Date(d.periodStart).toLocaleDateString("en-US", { day: "numeric", month: "short" }),
      formatCurrency(d.revenue),
      d.orders,
    ]),
  };
  const topProductsSection = {
    title: "Top Performing Products",
    headers: ["Rank", "Product", "Revenue", "Units Sold"],
    rows: (topProducts ?? []).map((p) => [p.rank, p.name, formatCurrency(p.revenue), p.units]),
  };
  const storeSalesSection = {
    title: "Store Sales",
    headers: ["Store", "Transactions", "Revenue", "Avg Order Value"],
    rows: (storeSales ?? []).map((s) => [s.store, s.transactions, formatCurrency(s.revenue), formatCurrency(s.avgOrderValue)]),
  };
  const websiteOrdersSection = {
    title: "Recent Website Orders",
    headers: ["Order ID", "Customer", "Items", "Total", "Status", "Date"],
    rows: (websiteOrders ?? []).map((o) => [
      `#${o.orderNumber}`,
      o.customer?.name ?? "—",
      o.items.length,
      formatCurrency(Number(o.total)),
      o.status,
      new Date(o.createdAt).toLocaleDateString(),
    ]),
  };

  const overviewScopeOptions: ExportScopeOption[] = [
    { key: "full", label: "Full report", getSections: () => [revenueSection, topProductsSection] },
    { key: "revenue", label: "Revenue overview only", getSections: () => [revenueSection] },
    { key: "products", label: "Top products table", getSections: () => [topProductsSection] },
  ];
  const inStoreScopeOptions: ExportScopeOption[] = [
    { key: "full", label: "Full report", getSections: () => [revenueSection, storeSalesSection] },
    { key: "revenue", label: "Revenue overview only", getSections: () => [revenueSection] },
    { key: "stores", label: "Store sales table", getSections: () => [storeSalesSection] },
  ];
  const websiteScopeOptions: ExportScopeOption[] = [
    { key: "full", label: "Full report", getSections: () => [revenueSection, websiteOrdersSection] },
    { key: "revenue", label: "Revenue overview only", getSections: () => [revenueSection] },
    { key: "orders", label: "Website orders table", getSections: () => [websiteOrdersSection] },
  ];

  const startDay = String(revenueSection.rows[0]?.[0] ?? "");
  const endDay = String(revenueSection.rows[revenueSection.rows.length - 1]?.[0] ?? "");
  const scopeOptions =
    activeTab === "In-Store Sales"
      ? inStoreScopeOptions
      : activeTab === "Website Sales"
        ? websiteScopeOptions
        : overviewScopeOptions;

  return (
    <AdminLayout>
      <div className="flex flex-col gap-[24px]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ink">{config.title}</h1>
            <p className="text-[15px] font-medium text-brand-dark">{config.subtitle}</p>
          </div>

          <div className="relative flex items-center gap-2">
            {config.actions === "export-only" && (
              <button
                onClick={() => setShowExportModal((prev) => !prev)}
                className="inline-flex h-[38px] items-center gap-2 rounded-[8px] bg-brand-dark px-4 text-xs font-semibold text-white"
              >
                <Download size={13} />
                Export
              </button>
            )}

            {config.actions === "export-import" && (
              <>
                <button
                  onClick={() => setShowExportModal((prev) => !prev)}
                  className="inline-flex h-[38px] items-center gap-2 rounded-[8px] border border-brand/10 bg-white px-4 text-xs font-semibold text-text-primary"
                >
                  <Upload size={13} />
                  Export
                </button>
                <button
                  onClick={() => setShowImportModal(true)}
                  className="inline-flex h-[38px] items-center gap-2 rounded-[8px] bg-brand-dark px-4 text-xs font-semibold text-white"
                >
                  <Download size={13} />
                  Import CSV
                </button>
              </>
            )}

            {showExportModal && (
              <ExportReportModal
                tabLabel={activeTab}
                startDay={startDay}
                endDay={endDay}
                scopeOptions={scopeOptions}
                onClose={() => setShowExportModal(false)}
              />
            )}
          </div>
        </div>

        <div className="flex w-fit items-center gap-1 rounded-full border border-brand/10 bg-brand-panel p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-[13px] font-display font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-white text-brand-dark shadow-card"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-[10px]">
          <SalesStatCard label={config.stat1Label} value={stat1Value} />
          <SalesStatCard label={config.stat2Label} value={stat2Value} />
        </div>

        <div className="grid grid-cols-[1fr_280px] items-start gap-[18px]">
          <div className="flex flex-col gap-[18px]">
            <div>
              <h2 className="mb-3 text-base font-bold text-text-primary">Revenue Overview</h2>
              <RevenueOverviewChart data={revenue ?? []} granularity={granularity} onGranularityChange={setGranularity} />
            </div>

            {activeTab === "Overview" && <TopPerformingProducts products={topProducts ?? []} />}
            {activeTab === "In-Store Sales" && <SalesByStoreTable stores={storeSales ?? []} />}
            {activeTab === "Website Sales" && <RecentWebsiteOrders orders={(websiteOrders ?? []).slice(0, 5)} />}
          </div>

          <div className="mt-9">
            <ChannelBreakdown channels={channelBreakdown ?? []} />
          </div>
        </div>
      </div>

      {showImportModal && (
        <ImportCsvModal
          onClose={() => setShowImportModal(false)}
          onImported={() => {
            setShowImportModal(false);
            refetchAll();
          }}
        />
      )}
    </AdminLayout>
  );
}
