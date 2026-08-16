import React from "react";
import AnalyticsChartsClient from "./components/AnalyticsChartsClient";
import { getAnalyticsData } from "@/lib/api/analytics";
import { FiDollarSign, FiBriefcase, FiUsers, FiUserCheck } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  let data: any = null;
  try {
    data = await getAnalyticsData();
  } catch (err) {
    console.error("Failed to load analytics:", err);
  }

  const statCards = [
    {
      title: "Total Revenue",
      val: `$${data?.cards?.totalRevenue?.toLocaleString() || 0}`,
      icon: <FiDollarSign className="size-4" />,
      accent: "bg-gold-500/15 text-gold-500",
    },
    {
      title: "Total Hires",
      val: data?.cards?.totalHires || 0,
      icon: <FiBriefcase className="size-4" />,
      accent: "bg-brand-100/20 text-brand-500 dark:text-brand-600",
    },
    {
      title: "Total Users",
      val: data?.cards?.totalUsers || 0,
      icon: <FiUsers className="size-4" />,
      accent: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Total Lawyers",
      val: data?.cards?.totalLawyers || 0,
      icon: <FiUserCheck className="size-4" />,
      accent: "bg-amber-500/10 text-amber-500",
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="eyebrow">Insights</span>
        <h1 className="mt-1 font-serif text-2xl font-bold text-foreground tracking-tight">
          Analytics Overview
        </h1>
        <p className="text-xs text-muted">
          Visual overview of platform growth and performance metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-4 lg:col-span-1">
          {statCards.map((item) => (
            <div key={item.title} className="card-surface rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted font-medium">
                    {item.title}
                  </p>
                  <h3 className="text-xl font-extrabold text-foreground mt-1">
                    {item.val}
                  </h3>
                  <p className="text-[10px] text-emerald-500 font-bold mt-1">
                    +10% from last month
                  </p>
                </div>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.accent}`}
                >
                  {item.icon}
                </span>
              </div>
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
