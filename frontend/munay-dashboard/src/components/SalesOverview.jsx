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

function Jahanzaib() {
  const [activeTab, setActiveTab] = useState("Weekly");
  const tabs = ["Daily", "Weekly", "Monthly", "Yearly"];

  return (
    <div className="bg-white border border-[#E8E6E1] rounded-xl p-5 max-w-[97%]">
      {/* Header row */} 
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-gray-900">Sales Overview</h3>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#8B5A2B]"></span>
            Revenue
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#F3E4D0]"></span>
            Orders
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-[#F7F7F8] rounded-lg p-1 w-fit mb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={150}>
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
            tickFormatter={(val) => `$${val / 1000}K`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
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
  );
}

export default Jahanzaib;