import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getUserSession } from "@/lib/core/core";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const user = await getUserSession();
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const { paymentType, amount, lawyerEmail, lawyerId } = await req.json();

    let finalAmountInCents = 0;
    let description = "";
    let successUrlPath = "";
    const metadataPayload: any = {
      userId: user.id,
      userEmail: user.email,
      paymentType,
    };

    if (paymentType === "activation") {
      if (user.role !== "lawyer") {
        return NextResponse.json(
          { error: "Only lawyers can activate profiles" },
          { status: 403 },
        );
      }
      finalAmountInCents = 149 * 100;
      description = "Lifetime Directory Activation Fee";
      successUrlPath =
        "/plans/success";
    }
    else if (paymentType === "hiring") {
      if (!amount || isNaN(amount)) {
        return NextResponse.json(
          { error: "Invalid hourly fee amount specified" },
          { status: 400 },
        );
      }
      finalAmountInCents = Math.round(parseFloat(amount) * 100);
      description = `Legal Consultation Retainer Fee for Lawyer: ${lawyerEmail || "Attorney"}`;
      successUrlPath = `/dashboard/client/hiring-success`;

      metadataPayload.lawyerId = lawyerId;
      metadataPayload.lawyerEmail = lawyerEmail;
    } else {
      return NextResponse.json(
        { error: "Invalid payment type specification" },
        { status: 400 },
      );
    }

    const headersList = await headers();
    const origin = headersList.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: description,
            },
            unit_amount: finalAmountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: user.email,
      metadata: metadataPayload,
      success_url: `${origin}${successUrlPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/plans`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to generate checkout url" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Error" },
      { status: 500 },
    );
  }
}
