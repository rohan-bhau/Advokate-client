import React from "react";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import LawyerSuccessView from "./components/LawyerSuccessView";

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function LawyerSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status === "open") {
    return redirect("/");
  }

  const customerEmail =
    session.customer_details?.email || "your registered email";

  return (
    <LawyerSuccessView sessionId={session_id} customerEmail={customerEmail} />
  );
}
