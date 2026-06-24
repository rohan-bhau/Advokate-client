"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AlertDialog,Avatar, Button } from "@heroui/react";
import logo from "@/assets/nav-logo.png";

import {
  House,
  Envelope,
  Gear,
  Person,
  Briefcase,
  Bookmark,
  Persons,
  ArrowRightFromSquare,
} from "@gravity-ui/icons";
import { FaBriefcase } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { CgOrganisation } from "react-icons/cg";
import { LuCreditCard, LuFileText, LuHistory, LuLayoutGrid } from "react-icons/lu";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";

const getIcon = (iconId: string, className: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    dashboard: <LuLayoutGrid className={className} />,
    jobs: <Briefcase className={className} />,
    "saved-jobs": <LuHistory className={className} />,
    applications: <LuFileText className={className} />,
    billing: <LuCreditCard className={className} />,
    settings: <Gear className={className} />,

    home: <House className={className} />,
    "jobs-recruiter": <FaBriefcase className={className} />,
    "post-job": <IoAddCircleOutline className={className} />,
    company: <CgOrganisation className={className} />,
    messages: <Envelope className={className} />,
    profile: <Person className={className} />,

    "users-admin": <Persons className={className} />,
  };

  return iconMap[iconId] || <Briefcase className={className} />;
};

interface SidebarNavContainerProps {
  navItems: { iconId: string; href: string; label: string }[];
  user: any;
}

export default function SidebarNavContainer({
  navItems,
  user,
}: SidebarNavContainerProps) {
  const pathname = usePathname();
const router = useRouter()
  const displayRole =
    user?.role === "lawyer"
      ? "Lawyer Panel"
      : user?.role === "admin"
        ? "Admin Panel"
                : "Client Chamber";
    
                  const handleSignOut = async () => {
                    try {
                      await authClient.signOut();
                      router.push("/login");
                      window.location.reload();
                      // router.refresh();
                      toast.success("Logout successfull");
                    } catch (err) {
                      console.error("Sign out routine variance caught:", err);
                    }
                  };

  const renderNavLinks = () => (
    <nav className="flex flex-col gap-1 w-full">
      {navItems.map((item) => {
        // Active Route Highlighting Check
          const isActive = pathname === item.href;

        return (
          <Link
            href={item.href}
            key={item.label}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 border ${
              isActive
                ? "bg-default-200/60 dark:bg-zinc-800/80 border-l-3 border-l-blue-600 text-blue-600 dark:text-blue-400 dark:border-zinc-700/50 shadow-sm"
                : "text-default-500 hover:text-foreground hover:bg-default-100/70 border-transparent"
            }`}
          >
            {getIcon(
              item.iconId,
              `size-5 shrink-0 transition-colors ${isActive ? "text-blue-600 dark:text-blue-400" : "text-default-400"}`,
            )}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full justify-between bg-content1 text-foreground p-4 w-full">
      <div className="w-full">
        {/* Brand Logo Area */}
        <div className="px-2 mb-6 pt-2">
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="nav-logo"
              width={60}
              height={50}
              className="object-contain"
            />
            <span className="font-bold text-xl tracking-tight text-[#0B3A75] dark:text-white">
              Advokate
            </span>
          </div>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold tracking-wide mt-1.5 block uppercase">
            {displayRole}
          </span>
        </div>

        <hr className="border-default-100 mb-6 mx-2 opacity-60" />

        {/* Navigation List Stack */}
        {renderNavLinks()}
      </div>

      {/* Bottom User Profile Section */}
      <div className="flex items-center justify-between w-full">
        {/* Left Side: Consolidated Info Sub-wrapper */}
        <div className="flex items-center gap-3 max-w-[calc(100%-60px)]">
          <Avatar className="w-10 h-10 shrink-0">
            <Avatar.Image
              alt={user.name || "User Profile"}
              src={user.image || undefined}
            />
            <Avatar.Fallback>
              {user.name
                ? user.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                : "JD"}
            </Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col gap-0 overflow-hidden">
            <p className="text-sm leading-5 font-semibold text-foreground truncate">
              Hi, {user.name ? user.name.split(" ")[0] : "User"}
            </p>
            <p className="text-xs leading-none text-default-400 truncate mt-0.5">
              {user.email}
            </p>
          </div>
        </div>

        {/* Right Side: Pinned Alert Dialog Trigger block */}
        <div className="shrink-0">
          <AlertDialog>
            <Button
              isIconOnly
              variant="danger"
              className="w-9 h-9 min-w-9 rounded-xl"
            >
              <ArrowRightFromSquare className="size-4 text-white" />
            </Button>
            <AlertDialog.Backdrop>
              <AlertDialog.Container>
                <AlertDialog.Dialog className="sm:max-w-[400px]">
                  <AlertDialog.CloseTrigger />
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="danger" />
                    <AlertDialog.Heading>
                      Are you sure you want to log out?
                    </AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Footer>
                    <Button slot="close" variant="tertiary">
                      Cancel
                    </Button>
                    {/* logout button*/}
                    <Button
                      slot="close"
                      variant="danger"
                      onClick={handleSignOut}
                    >
                      Logout
                    </Button>
                  </AlertDialog.Footer>
                </AlertDialog.Dialog>
              </AlertDialog.Container>
            </AlertDialog.Backdrop>
          </AlertDialog>
        </div>
      </div>
    </div>
  );

  return (
    <>

      <aside className="hidden md:flex bg-content1 w-full h-full overflow-hidden">
        {renderSidebarContent()}
      </aside>
    </>
  );
}
