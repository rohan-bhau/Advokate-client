"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function AnalyticsChartsClient({ data }: { data: any }) {
  const usersByRole = data?.usersByRole || [];
  const revenueOverview = data?.revenueOverview || [];
  const hiresOverTime = data?.hiresOverTime || [];

  const totalUsersCount = usersByRole.reduce(
    (sum: number, item: any) => sum + (item.value || 0),
    0,
  );

  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    if (!payload) return null;

    return (
      <ul className="flex flex-col gap-3 pl-6 justify-center h-full">
        {payload.map((entry: any, index: number) => {
          const rawValue = entry.payload?.value || 0;
          const percentage =
            totalUsersCount > 0
              ? Math.round((rawValue / totalUsersCount) * 100)
              : 0;

          return (
            <li
              key={`item-${index}`}
              className="flex items-center gap-3 text-xs font-semibold text-default-600"
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span>
                {entry.value}{" "}
                <span className="text-default-400 font-medium">
                  ({percentage}%)
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-5 bg-content1 rounded-2xl border border-default-100 shadow-sm space-y-2">
        <h3 className="text-xs font-bold text-default-600 uppercase tracking-wider">
          Revenue Overview
        </h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueOverview}>
              <XAxis
                dataKey="name"
                fontSize={10}
                stroke="#9CA3AF"
                tickLine={false}
              />
              <YAxis
                fontSize={10}
                stroke="#9CA3AF"
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#1D44B7"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-5 bg-content1 rounded-2xl border border-default-100 shadow-sm space-y-2">
        <h3 className="text-xs font-bold text-default-600 uppercase tracking-wider">
          Users by Role
        </h3>
        <div className="h-52 flex items-center justify-between">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={usersByRole}
                cx="35%" 
                cy="50%"
                innerRadius={0} 
                outerRadius={75}
                dataKey="value"
              >
                {usersByRole.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color || "#6B7280"} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, "Count"]} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                content={renderCustomLegend}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-5 bg-content1 rounded-2xl border border-default-100 shadow-sm space-y-2 md:col-span-2">
        <h3 className="text-xs font-bold text-default-600 uppercase tracking-wider">
          Hires Over Time
        </h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hiresOverTime}>
              <XAxis
                dataKey="name"
                fontSize={10}
                stroke="#9CA3AF"
                tickLine={false}
              />
              <YAxis
                fontSize={10}
                stroke="#9CA3AF"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip formatter={(value) => [value, "Hires"]} />
              <Bar
                dataKey="hires"
                fill="#1D44B7"
                radius={[4, 4, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
