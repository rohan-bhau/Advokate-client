import React from "react";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import ClientSuccessView from "./components/ClientSuccessView";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function ClientHiringSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Missing valid session_id parameters.");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status === "open") {
    return redirect("/");
  }

  const customerEmail = session.customer_details?.email || "your email";
  const lawyerEmail = session.metadata?.lawyerEmail || "Selected Legal Council";

  return (
    <ClientSuccessView
      sessionId={session_id}
      customerEmail={customerEmail}
      lawyerEmail={lawyerEmail}
    />
  );
}
