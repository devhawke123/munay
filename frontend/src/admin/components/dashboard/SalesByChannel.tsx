import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { salesByChannel } from "../../data/salesAnalytics";

const CHANNEL_COLORS = ["#8b5e2b", "#c9973a", "#d4b896"];

const data = salesByChannel.map((channel, index) => ({
  name: channel.label.replace(" Sales", ""),
  value: channel.percent,
  color: CHANNEL_COLORS[index % CHANNEL_COLORS.length],
}));

export function SalesByChannel() {
  return (
    <div className="bg-white border border-brand-border rounded-[14px] p-6 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-display font-bold text-text-primary tracking-tight">Sales by Channel</h3>
        <Link
          to="/admin/sales-analytics"
          className="text-[10px] font-display font-semibold text-brand-accent"
        >
          View All →
        </Link>
      </div>

      {/* Chart + Legend */}
      <div className="flex items-center gap-4">
        <div className="w-[90px] h-[90px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={30}
                outerRadius={45}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2 text-xs">
              <span
                className="w-2 h-2 rounded"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="text-text-muted">{entry.name}</span>
              <span className="font-display font-bold text-text-primary">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
