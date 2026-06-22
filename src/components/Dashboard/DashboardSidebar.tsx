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
    { iconId: "dashboard", href: "/dashboard/client", label: "Dashboard" },
    { iconId: "jobs", href: "/browse-lawyer", label: "Browse Lawyers" },
    {
      iconId: "saved-jobs",
      href: "/dashboard/client/appointments",
      label: "My Appointments",
    },
    {
      iconId: "billing",
      href: "/dashboard/client/billing",
      label: "Billing & Invoices",
    },
    {
      iconId: "settings",
      href: "/dashboard/client/settings",
      label: "Settings",
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
      href: "/dashboard/lawyer/schedules",
      label: "Consultation Schedules",
    },
    {
      iconId: "profile",
      href: "/dashboard/lawyer/profile",
      label: "My Credentials",
    },
    {
      iconId: "settings",
      href: "/dashboard/lawyer/settings",
      label: "Account Settings",
    },
  ];

  const adminNavItems = [
    { iconId: "dashboard", href: "/dashboard/admin", label: "Admin Console" },
    {
      iconId: "users-admin",
      href: "/dashboard/admin/users",
      label: "Manage Users",
    },
    {
      iconId: "company",
      href: "/dashboard/admin/verifications",
      label: "Lawyer Verifications",
    },
    {
      iconId: "billing",
      href: "/dashboard/admin/payments",
      label: "Platform Earnings",
    },
    {
      iconId: "settings",
      href: "/dashboard/admin/settings",
      label: "Global Settings",
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
