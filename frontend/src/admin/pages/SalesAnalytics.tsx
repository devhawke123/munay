import { Download, Filter, Upload } from "lucide-react";
import { useState } from "react";
import { AdminLayout } from "../components/layout/AdminLayout";
import { ChannelBreakdown } from "../components/sales/ChannelBreakdown";
import { ImportCsvModal } from "../components/sales/import-csv/ImportCsvModal";
import { RecentWebsiteOrders } from "../components/sales/RecentWebsiteOrders";
import { RevenueOverviewChart } from "../components/sales/RevenueOverviewChart";
import { SalesByStoreTable } from "../components/sales/SalesByStoreTable";
import { SalesStatCard } from "../components/sales/SalesStatCard";
import { TopPerformingProducts } from "../components/sales/TopPerformingProducts";

const tabs = ["Overview", "In-Store Sales", "Website Sales"] as const;
type Tab = (typeof tabs)[number];

const tabConfig: Record<
  Tab,
  {
    title: string;
    subtitle: string;
    stat1Label: string;
    stat1Value: string;
    stat2Label: string;
    stat2Value: string;
    actions: "filter-export" | "export-import";
  }
> = {
  Overview: {
    title: "Sales & Analytics",
    subtitle: "Track performance, understand trends, and grow revenue.",
    stat1Label: "Total Revenue",
    stat1Value: "$125,430",
    stat2Label: "Avg. Order Value",
    stat2Value: "3,256",
    actions: "filter-export",
  },
  "In-Store Sales": {
    title: "In-Store Sales Overview",
    subtitle: "Track performance, understand trends, and grow revenue",
    stat1Label: "Total In-Store Revenue",
    stat1Value: "$125,430",
    stat2Label: "Total Transactions",
    stat2Value: "1,234",
    actions: "export-import",
  },
  "Website Sales": {
    title: "Website Sales",
    subtitle: "Track and analyze your website / e-commerce performance.",
    stat1Label: "Website Revenue",
    stat1Value: "$125,430",
    stat2Label: "Total Orders",
    stat2Value: "1,234",
    actions: "filter-export",
  },
};

export function SalesAnalytics() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [showImportModal, setShowImportModal] = useState(false);
  const config = tabConfig[activeTab];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-[24px]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ink">{config.title}</h1>
            <p className="text-[15px] font-medium text-brand-dark">{config.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            {config.actions === "filter-export" ? (
              <>
                <button className="inline-flex h-[38px] items-center gap-2 rounded-[8px] border border-brand/10 bg-white px-4 text-xs font-semibold text-text-primary">
                  <Filter size={13} />
                  Filter
                </button>
                <button className="inline-flex h-[38px] items-center gap-2 rounded-[8px] bg-brand-dark px-4 text-xs font-semibold text-white">
                  <Download size={13} />
                  Export
                </button>
              </>
            ) : (
              <>
                <button className="inline-flex h-[38px] items-center gap-2 rounded-[8px] border border-brand/10 bg-white px-4 text-xs font-semibold text-text-primary">
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

          <ChannelBreakdown />
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
