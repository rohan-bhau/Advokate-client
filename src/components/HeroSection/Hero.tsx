import React from "react";
import HeroImage from "./HeroImage";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex items-center overflow-hidden bg-background">
      {/* Ambient backdrop: subtle grid + brand glow */}
      <div className="absolute inset-0 z-0 bg-grid opacity-60" />
      <div className="absolute inset-0 z-0 bg-hero-glow" />
      {/* Soft bottom fade into page background */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-linear-to-t from-background to-transparent" />

      {/* Foreground two-column layout */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <HeroContent />
          <HeroImage />
        </div>
      </div>
    </section>
  );
}
