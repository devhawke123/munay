import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Website", value: 72, color: "#7C3F20" },
  { name: "Mobile", value: 18, color: "#D9B48F" },
  { name: "Others", value: 10, color: "#F3E4D0" },
];

export function SalesByChannel() {
  return (
    <div className="bg-white border border-[#E8E6E1] rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900">Sales by Channel</h3>
        <a href="#" className="text-xs font-medium text-[#8B5A2B]">
          View All →
        </a>
      </div>

      {/* Chart + Legend */}
      <div className="flex items-center gap-4">
        <div className="w-24 h-24">
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
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="text-gray-600">{entry.name}</span>
              <span className="font-medium text-gray-900">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
