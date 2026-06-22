"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { Magnifier, Sun, Moon } from "@gravity-ui/icons";
import Image from "next/image";
import logo from "@/assets/nav-logo.png";
import { MobileDrawer } from "./MobileDrawer";
import { authClient, useSession } from "@/lib/auth-client";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import toast from "react-hot-toast";
// import MobileDrawer from "./MobileDrawer";

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user ? (session.user as any) : undefined;
  // const role = user?.role
  // console.log("navbar", user);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted
    ? theme === "system"
      ? resolvedTheme
      : theme
    : "light";

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    setSearchQuery(currentSearch);
  }, [searchParams]);

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Lawyers", href: "/browse-lawyer" },
  ];

  const dashboardLinks: Record<string, string> = {
    client: "/dashboard/client",
    lawyer: "/dashboard/lawyer",
    admin: "/dashboard/admin",
  };

  if (user?.email) {
    const userRole = user.role || "client";
    navLinks.push({
      name: "Dashboard",
      href: dashboardLinks[userRole] || "/dashboard/client",
    });
  }
  // if (user) {
  //   navLinks.push({ name: "Dashboard", href: "/dashboard" });
  // }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(
      `/browse-lawyer?search=${encodeURIComponent(searchQuery.trim())}`,
    );
    // setSearchQuery("");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-default-100 bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo Section */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="relative flex items-center h-25 w-auto">
              <Image
                src={logo}
                alt="Advokate Logo"
                width={190}
                height={60}
                className="object-contain h-auto max-h-20 w-auto min-w-[150px]"
                priority
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 self-stretch">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center h-full text-[15px] font-semibold tracking-wide transition-colors ${
                    isActive
                      ? "text-[#0B3A75] dark:text-blue-400"
                      : "text-[#5C6E85] dark:text-default-400 hover:text-[#0B3A75] dark:hover:text-white"
                  }`}
                >
                  <span
                    className={`${isActive ? "pb-1 border-b-2 border-[#93B6F0]" : ""}`}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Luxury Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex flex-1 max-w-sm relative"
          >
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <Magnifier className="h-4 w-4 text-[#7C8EA6] dark:text-default-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lawyers, case or specialization..."
              className="w-full h-11 rounded-full border border-blue-100/80 dark:border-default-700 bg-[#F4F7FC] dark:bg-default-100 pl-11 pr-4 text-[13px] text-foreground placeholder-[#7C8EA6] dark:placeholder-default-400 outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:bg-background transition-all"
            />
          </form>

          {/* Action Tools & Access Controls */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              isIconOnly
              variant="outline"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="text-[#5C6E85] dark:text-default-400 rounded-full hover:text-[#0B3A75] dark:hover:text-white hover:bg-default-100 dark:hover:bg-default-100 h-11 w-11 transition-colors"
            >
              {currentTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {isPending ? (
              <div className="flex items-center gap-3 animate-pulse">
                {/* Avatar Skeleton */}
                <div className="w-10 h-10 rounded-full bg-default-200 dark:bg-default-300/20" />

                {/* Text Skeleton */}
                <div className="flex flex-col gap-2">
                  <div className="h-3 w-20 rounded bg-default-200 dark:bg-default-300/20" />
                  <div className="h-2 w-28 rounded bg-default-200 dark:bg-default-300/20" />
                </div>
              </div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <p className="text-sm leading-5 font-semibold text-[#0B3A75] dark:text-white truncate">
                  Hi, {user.name ? user.name.split(" ")[0] : "User"}!
                </p>
                <Dropdown>
                  <Dropdown.Trigger className="rounded-full">
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
                  </Dropdown.Trigger>
                  <Dropdown.Popover>
                    <div className="px-3 pt-3 pb-1">
                      <div className="flex items-center gap-2">
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
                        <div className="flex flex-col gap-0">
                          <p className="text-sm leading-5 font-medium">
                            {user.name}
                          </p>
                          <p className="text-xs leading-none text-muted">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        id="logout"
                        textValue="Logout"
                        variant="danger"
                        onClick={async () => {
                          await authClient.signOut();
                          window.location.reload();
                          toast.success("Logout Successfull");
                        }}
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <Label>Log Out</Label>
                          <ArrowRightFromSquare className="size-3.5 text-danger" />
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                className="font-semibold bg-[#1D44B7] hover:bg-[#153491] dark:bg-blue-600 rounded-lg dark:hover:bg-blue-700 text-white h-11 px-7 tracking-wide text-sm shadow-sm transition-colors"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Drawer Shell Drop-in Trigger */}
          <div className="flex md:hidden items-center">
            <MobileDrawer />
          </div>
        </div>
      </div>
    </nav>
  );
}
