import { getHomeFeaturedData } from "@/lib/api/features";
import React from "react";
import FeaturedSectionClient from "./FeaturedSectionClient";


export const dynamic = "force-dynamic";

export default async function FeaturedSection() {
  let data;
  try {
    data = await getHomeFeaturedData();
  } catch (err) {
    console.error("Failed to load featured lawyers:", err);
    data = null;
  }

  const featuredLawyers = data?.featuredLawyers || [];
  const topExperts = data?.topExperts || [];

  return (
    <FeaturedSectionClient
      featuredLawyers={featuredLawyers}
      topExperts={topExperts}
    />
  );
}
