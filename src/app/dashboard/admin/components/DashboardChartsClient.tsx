"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function DashboardChartsClient({
  chartData,
}: {
  chartData: any[];
}) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis
            dataKey="name"
            stroke="#A1A1AA"
            fontSize={11}
            tickLine={false}
          />
          <YAxis
            stroke="#A1A1AA"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v / 1000}k`}
          />
          <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#1D44B7"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
