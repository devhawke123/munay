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
import { revenueByDay, storeSales, topPerformingProducts, websiteOrders } from "../data/salesAnalytics";
import { formatCurrency, parseCurrency } from "../lib/money";

const revenueSection = {
  title: "Revenue Overview",
  headers: ["Day", "Revenue", "Orders"],
  rows: revenueByDay.map((d) => [d.day, formatCurrency(d.revenue), d.orders]),
};

const topProductsSection = {
  title: "Top Performing Products",
  headers: ["Rank", "Product", "Revenue", "Units Sold"],
  rows: topPerformingProducts.map((p) => [p.rank, p.name, p.revenue, p.units]),
};

const storeSalesSection = {
  title: "Store Sales",
  headers: ["Store", "Transactions", "Revenue", "Avg Order Value"],
  rows: storeSales.map((s) => [s.store, s.transactions, s.revenue, s.avgOrderValue]),
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

const tabs = ["Overview", "In-Store Sales", "Website Sales"] as const;
type Tab = (typeof tabs)[number];

function getTabConfig(): Record<
  Tab,
  {
    title: string;
    subtitle: string;
    stat1Label: string;
    stat1Value: string;
    stat2Label: string;
    stat2Value: string;
    actions: "export-only" | "export-import" | "none";
  }
> {
  const totalRevenue = revenueByDay.reduce((sum, d) => sum + d.revenue, 0);
  const totalOnlineOrders = revenueByDay.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = totalOnlineOrders > 0 ? totalRevenue / totalOnlineOrders : 0;

  const storeRevenue = storeSales.reduce((sum, s) => sum + parseCurrency(s.revenue), 0);
  const storeTransactions = storeSales.reduce((sum, s) => sum + s.transactions, 0);

  const websiteRevenue = websiteOrders.reduce((sum, o) => sum + parseCurrency(o.total), 0);

  return {
    Overview: {
      title: "Sales & Analytics",
      subtitle: "Track performance, understand trends, and grow revenue.",
      stat1Label: "Total Revenue",
      stat1Value: formatCurrency(totalRevenue),
      stat2Label: "Avg. Order Value",
      stat2Value: formatCurrency(avgOrderValue),
      actions: "export-only",
    },
    "In-Store Sales": {
      title: "In-Store Sales Overview",
      subtitle: "Track performance, understand trends, and grow revenue",
      stat1Label: "Total In-Store Revenue",
      stat1Value: formatCurrency(storeRevenue),
      stat2Label: "Total Transactions",
      stat2Value: String(storeTransactions),
      actions: "export-import",
    },
    "Website Sales": {
      title: "Website Sales",
      subtitle: "Track and analyze your website / e-commerce performance.",
      stat1Label: "Website Revenue",
      stat1Value: formatCurrency(websiteRevenue),
      stat2Label: "Total Orders",
      stat2Value: String(websiteOrders.length),
      actions: "none",
    },
  };
}

export function SalesAnalytics() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const config = getTabConfig()[activeTab];

  const startDay = revenueByDay[0]?.day ?? "";
  const endDay = revenueByDay[revenueByDay.length - 1]?.day ?? "";
  const scopeOptions = activeTab === "In-Store Sales" ? inStoreScopeOptions : overviewScopeOptions;

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

        <div className="flex w-fit items-center gap-1 rounded-panel bg-brand-bg p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-4 py-1.5 text-[13px] font-display font-medium transition-colors ${
                activeTab === tab ? "bg-white text-text-primary shadow-card" : "text-text-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-[10px]">
          <SalesStatCard label={config.stat1Label} value={config.stat1Value} />
          <SalesStatCard label={config.stat2Label} value={config.stat2Value} />
        </div>

        <div className="grid grid-cols-[1fr_280px] items-start gap-[18px]">
          <div className="flex flex-col gap-[18px]">
            <div>
              <h2 className="mb-3 text-base font-bold text-text-primary">Revenue Overview</h2>
              <RevenueOverviewChart />
            </div>

            {activeTab === "Overview" && <TopPerformingProducts />}
            {activeTab === "In-Store Sales" && <SalesByStoreTable />}
            {activeTab === "Website Sales" && <RecentWebsiteOrders />}
          </div>

          <div className="mt-9">
            <ChannelBreakdown />
          </div>
        </div>
      </div>

      {showImportModal && (
        <ImportCsvModal
          onClose={() => setShowImportModal(false)}
          onImported={() => setShowImportModal(false)}
        />
      )}
    </AdminLayout>
  );
}
