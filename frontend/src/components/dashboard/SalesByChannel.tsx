import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Website", value: 72, color: "#8b5e2b" },
  { name: "Mobile", value: 18, color: "#c9973a" },
  { name: "Others", value: 10, color: "#d4b896" },
];

export function SalesByChannel() {
  return (
    <div className="bg-white border border-brand-border rounded-[14px] p-6 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-display font-bold text-text-primary tracking-tight">Sales by Channel</h3>
        <a href="#" className="text-[10px] font-display font-semibold text-brand-accent">
          View All →
        </a>
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
