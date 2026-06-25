import React from "react";
import AnalyticsChartsClient from "./components/AnalyticsChartsClient";
import { getAnalyticsData } from "@/lib/api/analytics";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const data = await getAnalyticsData();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">
          Analytics Overview
        </h1>
        <p className="text-xs text-default-400">
          Visual overview of platform growth and performance metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-4 lg:col-span-1">
          {[
            {
              title: "Total Revenue",
              val: `$${data?.cards?.totalRevenue?.toLocaleString() || 0}`,
            },
            { title: "Total Hires", val: data?.cards?.totalHires || 0 },
            { title: "Total Users", val: data?.cards?.totalUsers || 0 },
            { title: "Total Lawyers", val: data?.cards?.totalLawyers || 0 },
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 bg-content1 rounded-2xl border border-default-100 shadow-sm"
            >
              <p className="text-xs text-default-400 font-medium">
                {item.title}
              </p>
              <h3 className="text-xl font-black text-foreground mt-1">
                {item.val}
              </h3>
              <p className="text-[10px] text-emerald-500 font-bold mt-1">
                +10% from last month
              </p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3">
          <AnalyticsChartsClient data={data} />
        </div>
      </div>
    </div>
  );
}
