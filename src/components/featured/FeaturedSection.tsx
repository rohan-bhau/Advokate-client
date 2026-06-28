import { getHomeFeaturedData } from "@/lib/api/features";
import React from "react";
import FeaturedSectionClient from "./FeaturedSectionClient";


export const dynamic = "force-dynamic";

export default async function FeaturedSection() {
  const data = await getHomeFeaturedData();

  const featuredLawyers = data?.featuredLawyers || [];
    const topExperts = data?.topExperts || [];
    console.log({topExperts: topExperts, featuredLawyers: featuredLawyers})

  return (
    <FeaturedSectionClient
      featuredLawyers={featuredLawyers}
      topExperts={topExperts}
    />
  );
}
