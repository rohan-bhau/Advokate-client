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
      { name: "Privacy Policy", href: "#" },
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
    <footer className="w-full border-t border-border bg-background/60 backdrop-blur-sm">
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
            <p className="text-sm text-muted max-w-xs font-medium leading-relaxed">
              Connecting individuals and corporations with elite, verified legal
              professionals worldwide.
            </p>

            {/* Polished Circular Corporate Social Channels */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-surface-secondary hover:text-foreground border border-transparent hover:border-border transition-all text-lg"
                aria-label="Twitter X"
              >
                <BsTwitterX size={15} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-surface-secondary hover:border hover:border-border hover:text-[#0A66C2] transition-all text-sm"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={15} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-surface-secondary hover:border hover:border-border hover:text-[#1877F2] transition-all text-sm"
                aria-label="Facebook"
              >
                <RiFacebookFill size={15} />
              </a>
            </div>
          </div>

          {/* Column 2: Links Navigation Columns Subgrid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <h3 className="text-sm font-bold tracking-wider text-foreground uppercase font-sans">
                Company
              </h3>
              <ul role="list" className="mt-4 space-y-2.5">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-muted hover:text-foreground transition-colors duration-150"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-wider text-foreground uppercase font-sans">
                Services
              </h3>
              <ul role="list" className="mt-4 space-y-2.5">
                {footerLinks.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-muted hover:text-foreground transition-colors duration-150"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Column Container aligned on the grid wrapper */}
            <div className="col-span-2 sm:col-span-1 mt-4 sm:mt-0">
              <h3 className="text-sm font-bold tracking-wider text-foreground uppercase font-sans">
                Newsletter
              </h3>
              <p className="mt-4 text-xs font-medium text-muted leading-relaxed">
                Receive premium legal insights and updates right in your inbox.
              </p>

              {/* Premium Form Stack */}
              <form className="mt-4 relative flex items-center max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full h-10 rounded-lg border border-border bg-surface pl-3.5 pr-12 text-xs text-foreground placeholder-muted outline-none focus:border-brand-100 transition-all"
                />
                <Button
                  className="absolute right-1 rounded-md bg-brand-500 hover:bg-brand-600 text-white h-8 w-8 min-w-8"
                  aria-label="Subscribe"
                >
                  <BiSend size={14} />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal & Copyright Notices */}
        <div className="mt-12 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted font-medium">
            &copy; {currentYear} Advokate Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs font-medium text-muted">
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
