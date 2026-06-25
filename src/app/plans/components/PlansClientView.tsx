"use client"; 

import React from "react";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { Star } from "@gravity-ui/icons"; 
import { LuSparkles } from "react-icons/lu";

interface PlansClientViewProps {
  isAlreadyPaid: boolean;
}

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
    <div className="min-h-screen bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-10">
      <div className="text-center max-w-xl space-y-2">
        <h1 className="text-3xl font-extrabold text-[#0B3A75] dark:text-white tracking-tight">
          Unlock Unlimited Client Engagements
        </h1>
        <p className="text-sm text-default-500 dark:text-default-400">
          Activate your placement on our premium legal council grid. No
          recurring hooks, no hidden fees.
        </p>
      </div>

      <Card className="max-w-sm w-full bg-content1 border-2 border-amber-400 dark:border-amber-500 p-6 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden transition-all hover:scale-[1.01]">
        <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] uppercase font-extrabold px-4 py-1 rounded-bl-xl tracking-wider flex items-center gap-1">
          <LuSparkles /> Lifetime Deal
        </div>

        <div className="space-y-5">
          <div className="space-y-1">
            <span className="text-[11px] uppercase font-extrabold text-amber-600 dark:text-amber-400 tracking-widest block">
              Professional Plan
            </span>
            <h3 className="text-xl font-bold text-foreground">
              Lifetime Activation
            </h3>
          </div>

          <div className="flex items-baseline gap-1 pt-2 border-t border-default-100">
            <span className="text-4xl font-black text-foreground">$149</span>
            <span className="text-sm font-bold text-default-400 uppercase">
              USD
            </span>
            <span className="text-xs text-default-400 ml-2 font-medium">
              / One-time pay
            </span>
          </div>

          <ul className="space-y-3 pt-3 text-xs text-default-600 dark:text-default-300 font-medium">
            <li className="flex items-center gap-2">
              <Star className="size-3.5 fill-amber-500 text-amber-500 shrink-0" />
              <span>Full Profile Activation & Visibility</span>
            </li>
            <li className="flex items-center gap-2">
              <Star className="size-3.5 fill-amber-500 text-amber-500 shrink-0" />
              <span>Receive Unlimited Client Retainer Requests</span>
            </li>
            <li className="flex items-center gap-2">
              <Star className="size-3.5 fill-amber-500 text-amber-500 shrink-0" />
              <span>Verified Directory Badge In Grid View</span>
            </li>
            <li className="flex items-center gap-2">
              <Star className="size-3.5 fill-amber-500 text-amber-500 shrink-0" />
              <span>Zero Success Fees on Case Contracts</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 pt-4 border-t border-default-100">
          {isAlreadyPaid ? (
            <Button
              isDisabled
              className="w-full bg-success text-white font-bold text-xs rounded-xl h-11"
            >
              ✓ Your Profile is Active
            </Button>
          ) : (
            <button
              onClick={handleActivationCheckout}
              className="w-full bg-gradient-to-r from-amber-500 cursor-pointer to-orange-600 font-extrabold text-white text-xs rounded-xl h-11 shadow-md hover:opacity-95 transition-all"
            >
              Proceed to Secure Payment
            </button>
          )}
          <p className="text-[10px] text-default-400 text-center mt-2.5">
            Secured checkout via Stripe. Encrypted connection.
          </p>
        </div>
      </Card>
    </div>
  );
}
