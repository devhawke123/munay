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

const data = [
  { day: "18 May", revenue: 12000, orders: 200 },
  { day: "19 May", revenue: 18000, orders: 350 },
  { day: "20 May", revenue: 22000, orders: 400 },
  { day: "21 May", revenue: 38000, orders: 750 },
  { day: "22 May", revenue: 25000, orders: 420 },
  { day: "23 May", revenue: 30000, orders: 500 },
  { day: "24 May", revenue: 20000, orders: 380 },
];

const tabs = ["Daily", "Weekly", "Monthly", "Yearly"] as const;

export function SalesOverview() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Weekly");

  return (
    <div className="flex min-h-0 flex-[1.15] flex-col rounded-xl border border-[#E8E6E1] bg-white p-3">
      <div className="mb-1 flex shrink-0 items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">Sales Overview</h3>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#8B5A2B]"></span>
            Revenue
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#F3E4D0]"></span>
            Orders
          </div>
        </div>
      </div>

      <div className="mb-1 flex w-fit shrink-0 items-center gap-1 rounded-lg bg-[#F7F7F8] p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#9CA3AF" }}
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#9CA3AF" }}
              tickFormatter={(val: number) => `$${val / 1000}K`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#9CA3AF" }}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#8B5A2B"
              strokeWidth={2}
              dot={{ r: 2, fill: "#8B5A2B" }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="#F3D9B8"
              strokeWidth={2}
              dot={{ r: 2, fill: "#F3D9B8" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
