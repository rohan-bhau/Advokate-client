import React from "react";
import HeroImage from "./HeroImage";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex items-center bg-background overflow-hidden">
      {/* Full bleed graphic backdrop element */}
      <HeroImage />

      {/* Foreground layered responsive structure container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full">
        <HeroContent />
      </div>
    </section>
  );
}
