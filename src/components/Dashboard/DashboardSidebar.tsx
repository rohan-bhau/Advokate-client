// src/components/Dashboard/DashboardSidebar.tsx
import { getUserSession } from "@/lib/core/core";
import SidebarNavContainer from "./SidebarNavContainer";
import { redirect } from "next/navigation";
// import SidebarNavContainer from "./SidebarNavContainer";

export async function DashboardSidebar() {
  const user = await getUserSession();

  if (!user) {
    redirect("/");
  }

  const clientNavItems = [
    { iconId: "home", href: "/dashboard/client", label: "Overview" },
    { iconId: "jobs", href: "/browse-lawyer", label: "Browse Lawyers" },
    {
      iconId: "saved-jobs",
      href: "/dashboard/client/hiring-history",
      label: "Hiring History",
    },
    {
      iconId: "review",
      href: "/dashboard/client/reviews",
      label: "Reviews",
    },
    {
      iconId: "profile",
      href: "/dashboard/client/transactions",
      label: "Transactions",
    },
    {
      iconId: "update",
      href: "/dashboard/client/update-profile",
      label: "Update Profile",
    },
  ];

  const lawyerNavItems = [
    { iconId: "home", href: "/dashboard/lawyer", label: "Overview" },
    {
      iconId: "jobs-recruiter",
      href: "/dashboard/lawyer/manage-legal-profile",
      label: "Legal Profiles",
    },
    {
      iconId: "post-job",
      href: "/dashboard/lawyer/manage-legal-profile/new-legal-profile",
      label: "Add New Profile",
    },
    {
      iconId: "messages",
      href: "/dashboard/lawyer/hiring-history",
      label: "Hiring History",
    },
    {
      iconId: "profile",
      href: "/dashboard/lawyer/transactions",
      label: "Transactions",
    },
  ];

  const adminNavItems = [
    { iconId: "dashboard", href: "/dashboard/admin", label: "Admin Overview" },
    {
      iconId: "users-admin",
      href: "/dashboard/admin/manage-users",
      label: "Manage Users",
    },
    {
      iconId: "company",
      href: "/dashboard/admin/legal-profiles",
      label: "Legal Profiles",
    },
    {
      iconId: "billing",
      href: "/dashboard/admin/all-transactions",
      label: "Platform Earnings",
    },
    {
      iconId: "settings",
      href: "/dashboard/admin/analytics",
      label: "Analytics",
    },
  ];

  const navItems =
    user?.role === "lawyer"
      ? lawyerNavItems
      : user?.role === "admin"
        ? adminNavItems
        : clientNavItems;

  return <SidebarNavContainer navItems={navItems} user={user} />;
}
