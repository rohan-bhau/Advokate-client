"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FaCheck } from "react-icons/fa6";
import { LuSparkles } from "react-icons/lu";

interface PlansClientViewProps {
  isAlreadyPaid: boolean;
}

const benefits = [
  "Full Profile Activation & Visibility",
  "Receive Unlimited Client Retainer Requests",
  "Verified Directory Badge In Grid View",
  "Zero Success Fees on Case Contracts",
];

export default function PlansClientView({
  isAlreadyPaid,
}: PlansClientViewProps) {
  const handleActivationCheckout = async () => {
    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentType: "activation" }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-hero-glow pointer-events-none" />

      <div className="relative text-center max-w-xl space-y-3">
        <span className="eyebrow">Professional Plan</span>
        <h1 className="font-serif text-4xl font-bold text-foreground tracking-tight">
          Unlock Unlimited Client Engagements
        </h1>
        <p className="text-sm text-muted">
          Activate your placement on our premium legal council grid. No
          recurring hooks, no hidden fees.
        </p>
      </div>

      <div className="relative w-full max-w-sm">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-gold-400 via-gold-500/40 to-transparent opacity-60 blur-lg pointer-events-none" />
        <div className="relative bg-surface border border-gold-400/40 dark:border-gold-500/40 p-8 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-r from-gold-500 to-gold-600 text-white text-[10px] uppercase font-extrabold px-4 py-1.5 rounded-bl-xl tracking-wider flex items-center gap-1.5">
            <LuSparkles className="size-3" /> Lifetime Deal
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-[11px] uppercase font-extrabold text-gold-600 dark:text-gold-400 tracking-widest block">
                Professional Plan
              </span>
              <h3 className="text-2xl font-bold text-foreground">
                Lifetime Activation
              </h3>
            </div>

            <div className="flex items-baseline gap-1.5 pt-4 border-t border-border">
              <span className="text-5xl font-black text-foreground">$149</span>
              <span className="text-sm font-bold text-muted uppercase">USD</span>
              <span className="text-xs text-muted ml-2 font-medium">
                / One-time pay
              </span>
            </div>

            <ul className="space-y-3.5 pt-2 text-sm text-muted font-medium">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500/15 text-gold-500 shrink-0">
                    <FaCheck className="size-2.5" />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-5 border-t border-border">
            {isAlreadyPaid ? (
              <Button
                isDisabled
                className="w-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 font-bold text-xs rounded-xl h-11"
              >
                ✓ Your Profile is Active
              </Button>
            ) : (
              <Button
                onClick={handleActivationCheckout}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 cursor-pointer font-extrabold text-white text-xs rounded-xl h-12 shadow-lg shadow-gold-500/25 hover:opacity-95 transition-all active:scale-[0.98]"
              >
                Proceed to Secure Payment
              </Button>
            )}
            <p className="text-[10px] text-muted text-center mt-3">
              Secured checkout via Stripe. Encrypted connection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}