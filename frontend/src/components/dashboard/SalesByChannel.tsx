import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Website", value: 72, color: "#7C3F20" },
  { name: "Mobile", value: 18, color: "#D9B48F" },
  { name: "Others", value: 10, color: "#F3E4D0" },
];

export function SalesByChannel() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#E8E6E1] bg-white p-3">
      <div className="mb-2 flex shrink-0 items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">Sales by Channel</h3>
        <a href="#" className="text-xs font-medium text-[#8B5A2B]">
          View All →
        </a>
      </div>

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <div className="h-20 w-20 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={24}
                outerRadius={36}
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

        <div className="flex flex-col gap-1.5">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2 text-xs">
              <span
                className="h-2 w-2 rounded-full"
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
