"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { Magnifier, Sun, Moon, Bars, Xmark } from "@gravity-ui/icons";
import Image from "next/image";
import logo from "@/assets/nav-logo.png";

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router= useRouter()

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted
    ? theme === "system"
      ? resolvedTheme
      : theme
    : "light";

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Lawyers", href: "/browse" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-default-100 bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo Section - Scaled beautifully */}
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

          {/* Centered Navigation Links with Underline Active State */}
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

          {/* Pill-Shaped Luxury Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-sm relative">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <Magnifier className="h-4 w-4 text-[#7C8EA6] dark:text-default-400" />
            </div>
            <input
              type="text"
              placeholder="Search lawyers, case or specialization..."
              className="w-full h-11 rounded-full border border-blue-100/80 dark:border-default-700 bg-[#F4F7FC] dark:bg-default-100 pl-11 pr-4 text-[13px] text-foreground placeholder-[#7C8EA6] dark:placeholder-default-400 outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:bg-background transition-all"
            />
          </div>

          {/* Action Tools & Access Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Controller Button with Professional Semantic Hover */}
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

            {/* Deep Royal Blue Corporate Button */}
            <Button onClick={()=>router.push("/login")} className="font-semibold bg-[#1D44B7] hover:bg-[#153491] dark:bg-blue-600 rounded-lg dark:hover:bg-blue-700 text-white h-11 px-7 tracking-wide text-sm shadow-sm transition-colors">
              Login
            </Button>
          </div>

          {/* Mobile Shell Menu Controller */}
          <div className="flex md:hidden items-center gap-1">
            <Button
              isIconOnly
              variant="outline"
              onClick={toggleTheme}
              className="rounded-full text-default-500 hover:bg-default-100 h-10 w-10"
            >
              {currentTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
              isIconOnly
              variant="outline"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full text-default-600 hover:bg-default-100 h-10 w-10"
            >
              {isMobileMenuOpen ? (
                <Xmark className="h-5 w-5" />
              ) : (
                <Bars className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Shell */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-default-100 bg-background px-4 py-4 space-y-4">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <Magnifier className="h-4 w-4 text-default-400 dark:text-black" />
            </div>
            <input
              type="text"
              placeholder="Search lawyers..."
              className="w-full h-11 rounded-full border border-default-200 bg-[#F4F7FC] dark:bg-default-100 pl-11 pr-4 text-sm text-foreground dark:text-black focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-semibold px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-blue-50 text-[#0B3A75] dark:bg-default-100 dark:text-blue-400"
                      : "text-default-600 dark:text-default-400"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Button onClick={()=>router.push("/login")}
              className="w-full h-11 rounded-xl font-semibold bg-[#1D44B7] text-white"
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
