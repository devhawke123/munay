import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { revenueByDay } from "../../data/salesAnalytics";

const tabs = ["Daily", "Weekly", "Monthly", "Yearly"];

export function RevenueOverviewChart() {
  const [activeTab, setActiveTab] = useState("Weekly");

  return (
    <div className="rounded-[7px] bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-panel bg-brand-bg p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-3 py-1.5 text-xs font-display font-medium transition-colors ${
                activeTab === tab ? "bg-white text-text-primary shadow-card" : "text-text-muted"
              }`}
            >
              {tab}
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
        <LineChart data={revenueByDay} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
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
