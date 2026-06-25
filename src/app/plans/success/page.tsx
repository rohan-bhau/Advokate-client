import React from "react";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import LawyerSuccessView from "./components/LawyerSuccessView";
import { updateLawyerPlanAction } from "@/lib/actions/payment";

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function LawyerSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

 if (!session_id)
   throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status === "open") {
    return redirect("/");
    }
      const customerEmail =
        session.customer_details?.email || "your registered email";

    if (session.status === "complete") {
        const userId = session.metadata?.userId;
        const amountTotal = session.amount_total
          ? session.amount_total / 100
          : 149;
        if (userId) {
          await updateLawyerPlanAction({
            userId,
            planStatus: "premium",
            sessionId: session.id,
            amount: amountTotal,
            userEmail: session.customer_details?.email || "",
          });
        }
          return (
            <LawyerSuccessView
              sessionId={session_id}
              customerEmail={customerEmail}
            />
          );
    }



}
