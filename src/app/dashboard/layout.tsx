import { DashboardSidebar } from "@/components/Dashboard/DashboardSlidebar";
import React from "react";

const DashboardLayout = ({ children }: any) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <div className="hidden md:flex h-full w-64 flex-shrink-0 border-r border-default-100 bg-content1">
        <DashboardSidebar />
      </div>

      <div className="flex-1 w-full h-full overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto w-full">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
