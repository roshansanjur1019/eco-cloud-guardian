
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", AWS: 4000, Azure: 2400, GCP: 1800 },
  { name: "Feb", AWS: 3500, Azure: 2000, GCP: 1600 },
  { name: "Mar", AWS: 3800, Azure: 2200, GCP: 1700 },
  { name: "Apr", AWS: 3200, Azure: 2100, GCP: 1500 },
  { name: "May", AWS: 3500, Azure: 1900, GCP: 1400 },
  { name: "Jun", AWS: 3000, Azure: 1800, GCP: 1300 },
  { name: "Jul", AWS: 2800, Azure: 1700, GCP: 1200 },
  { name: "Aug", AWS: 2600, Azure: 1600, GCP: 1100 },
];

const CostChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Cost Trends</h3>
          <p className="text-sm text-gray-500">Monthly cloud spend across providers</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 rounded-full bg-cloud-blue"></span>
            <span className="text-xs text-gray-500">AWS</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 rounded-full bg-cloud-teal"></span>
            <span className="text-xs text-gray-500">Azure</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 rounded-full bg-cloud-purple"></span>
            <span className="text-xs text-gray-500">GCP</span>
          </div>
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                backgroundColor: "white",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: "none",
              }}
              formatter={(value) => [`$${value}`, ""]}
            />
            <Area
              type="monotone"
              dataKey="AWS"
              stackId="1"
              stroke="#0ea5e9"
              fill="#0ea5e9"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="Azure"
              stackId="1"
              stroke="#14b8a6"
              fill="#14b8a6"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="GCP"
              stackId="1"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CostChart;
