"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import logo from "@/assets/logo.png";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { RiFacebookFill } from "react-icons/ri";
import { BiSend } from "react-icons/bi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "#" },
      { name: "Our Team", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
    services: [
      { name: "Browse Lawyers", href: "/browse" },
      { name: "Legal Consulting", href: "#" },
      { name: "Corporate Law", href: "#" },
      { name: "Family Law", href: "#" },
    ],
    resources: [
      { name: "Legal Blog", href: "#" },
      { name: "Case Studies", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  };

  return (
    <footer className="w-full border-t border-default-100 bg-background/50 dark:bg-default-50/20 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Top Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Column 1: Brand Info & Social Stack */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative flex items-center h-14 w-auto">
                <Image
                  src={logo}
                  alt="Advokate Logo"
                  width={180}
                  height={55}
                  className="object-contain h-auto max-h-40 w-auto"
                />
              </div>
            </Link>
            <p className="text-sm text-[#5C6E85] dark:text-default-400 max-w-xs font-medium leading-relaxed">
              Connecting individuals and corporations with elite, verified legal
              professionals worldwide.
            </p>

            {/* Polished Circular Corporate Social Channels */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full  text-[#5C6E85]  hover:bg-[#f5f8fa ] hover:text-[#000000] hover:border hover:border-base transition-all text-lg"
                aria-label="Twitter X"
              >
                <BsTwitterX size={15} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full  text-[#5C6E85] hover:border  hover:border-base hover:text-[#0A66C2]  transition-all text-sm"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={15} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full  text-[#5C6E85] hover:border  hover:border-base  hover:bg-[#f5f8fa] hover:text-[#1877F2] transition-all text-sm"
                aria-label="Facebook"
              >
                <RiFacebookFill size={15} />
              </a>
            </div>
          </div>

          {/* Column 2: Links Navigation Columns Subgrid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <h3 className="text-sm font-bold tracking-wider text-[#1E3A60] dark:text-white uppercase font-sans">
                Company
              </h3>
              <ul role="list" className="mt-4 space-y-2.5">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-[#5C6E85] dark:text-default-400 hover:text-[#0B3A75] dark:hover:text-white transition-colors duration-150"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-wider text-[#1E3A60] dark:text-white uppercase font-sans">
                Services
              </h3>
              <ul role="list" className="mt-4 space-y-2.5">
                {footerLinks.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-[#5C6E85] dark:text-default-400 hover:text-[#0B3A75] dark:hover:text-white transition-colors duration-150"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Column Container aligned on the grid wrapper */}
            <div className="col-span-2 sm:col-span-1 mt-4 sm:mt-0">
              <h3 className="text-sm font-bold tracking-wider text-[#1E3A60] dark:text-white uppercase font-sans">
                Newsletter
              </h3>
              <p className="mt-4 text-xs font-medium text-[#5C6E85] dark:text-default-400 leading-relaxed">
                Receive premium legal insights and updates right in your inbox.
              </p>

              {/* Premium Form Stack */}
              <form className="mt-4 relative flex items-center max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full h-10 rounded-lg border border-default-200 bg-default-50/50 pl-3.5 pr-12 text-xs text-foreground placeholder-default-400 outline-none focus:border-primary dark:focus:border-blue-500 transition-all"
                />
                <Button
                  className="absolute right-1 rounded-md bg-[#1D44B7] hover:bg-[#153491] dark:bg-blue-600 dark:hover:bg-blue-700 text-white h-8 w-8 min-w-8"
                  aria-label="Subscribe"
                >
                  <BiSend size={14} />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal & Copyright Notices */}
        <div className="mt-12 border-t border-default-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#7C8EA6] dark:text-default-400 font-medium">
            &copy; {currentYear} Advokate Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs font-medium text-[#7C8EA6] dark:text-default-400">
            <Link
              href="#"
              className="hover:text-[#0B3A75] dark:hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="hover:text-[#0B3A75] dark:hover:text-white transition-colors"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
