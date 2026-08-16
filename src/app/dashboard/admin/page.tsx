import React from "react";
import DashboardClientView from "./components/DashboardClientView";
import { getAnalyticsData } from "@/lib/api/analytics";


export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let data: any = {
    cards: { totalUsers: 0, totalLawyers: 0, totalHires: 0, totalRevenue: 0 },
    recentActivities: [],
    revenueOverview: [],
  };
  try {
    data = await getAnalyticsData();
  } catch (err) {
    console.error("Failed to load admin dashboard:", err);
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-black text-foreground tracking-tight">
        Admin Dashboard
      </h1>

      <DashboardClientView data={data} />
    </div>
  );
}
