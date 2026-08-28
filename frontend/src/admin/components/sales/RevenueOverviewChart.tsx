import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ApiGranularity, ApiRevenuePoint } from "../../hooks/useSalesApi";

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

export function RevenueOverviewChart({
  data,
  granularity,
  onGranularityChange,
}: {
  data: ApiRevenuePoint[];
  granularity: ApiGranularity;
  onGranularityChange: (granularity: ApiGranularity) => void;
}) {
  const chartData = data.map((point) => ({
    day: formatPeriodLabel(point.periodStart, granularity),
    revenue: point.revenue,
    orders: point.orders,
  }));

  return (
    <div className="rounded-[7px] bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-panel bg-brand-bg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onGranularityChange(tab.value)}
              className={`rounded-md px-3 py-1.5 text-xs font-display font-medium transition-colors ${
                granularity === tab.value ? "bg-white text-text-primary shadow-card" : "text-text-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-text-muted">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-brand" />
            Revenue
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-brand-soft" />
            Orders
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
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
            tickFormatter={(val: number) => `$${val / 1000}K`}
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
