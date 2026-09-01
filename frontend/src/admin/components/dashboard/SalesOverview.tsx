import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useRevenueOverviewApi, type ApiGranularity } from "../../hooks/useSalesApi";

const tabs: { label: string; value: ApiGranularity }[] = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

function formatPeriodLabel(periodStart: string, granularity: ApiGranularity) {
  const date = new Date(periodStart);
  if (granularity === "yearly") return date.toLocaleDateString("en-US", { year: "numeric" });
  if (granularity === "monthly") return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function SalesOverview() {
  const [activeTab, setActiveTab] = useState<ApiGranularity>("weekly");
  const { data: revenue } = useRevenueOverviewApi({ granularity: activeTab });
  const data = (revenue ?? []).map((point) => ({
    day: formatPeriodLabel(point.periodStart, activeTab),
    revenue: point.revenue,
    orders: point.orders,
  }));

  return (
    <div className="bg-white border border-brand-border rounded-[14px] p-6 shadow-card">
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-display font-bold text-text-primary tracking-tight">Sales Overview</h3>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-text-muted">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-brand"></span>
            Revenue
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-brand-soft"></span>
            Orders
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-brand-bg rounded-panel p-1 w-fit m-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-3 py-1.5 rounded-md text-xs font-display font-medium transition-colors ${
              activeTab === tab.value
                ? "bg-white text-text-primary shadow-card"
                : "text-text-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={215}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
          />
          <YAxis
            yAxisId="left"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            tickFormatter={(val: number) => `CHF ${val / 1000}K`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
          />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            stroke="#8B5A2B"
            strokeWidth={2}
            dot={{ r: 3, fill: "#8B5A2B" }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="orders"
            stroke="#F3D9B8"
            strokeWidth={2}
            dot={{ r: 3, fill: "#F3D9B8" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
