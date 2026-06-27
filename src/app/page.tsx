import LegalCategories from "@/components/categories/LegalCategories";
import FeaturedSection from "@/components/featured/FeaturedSection";
import Hero from "@/components/HeroSection/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <LegalCategories />
      <FeaturedSection/>
   </div>
  );
}
