import { NextResponse } from "next/server";
import { getStripe, STRIPE_PLANS, type StripePlanId } from "@/lib/stripe";

export const runtime = "nodejs";

type CheckoutBody = {
  planId?: string;
};

function getBaseUrl(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_BASE_URL;
  if (configured) return configured;
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutBody;
    const planId = body?.planId as StripePlanId | undefined;

    if (!planId || !(planId in STRIPE_PLANS)) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const plan = STRIPE_PLANS[planId];
    const baseUrl = getBaseUrl(request);
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: plan.currency,
            product_data: {
              name: `${plan.name} Package`,
            },
            unit_amount: plan.amount,
          },
        },
      ],
      metadata: {
        planId: plan.id,
        planName: plan.name,
      },
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Failed to create checkout session." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error";
    const isConfig = message.includes("STRIPE_SECRET_KEY");
    console.error("[api/stripe/checkout]", error);
    return NextResponse.json(
      { error: isConfig ? "Server is not configured for Stripe checkout." : "Checkout failed." },
      { status: isConfig ? 503 : 500 }
    );
  }
}

