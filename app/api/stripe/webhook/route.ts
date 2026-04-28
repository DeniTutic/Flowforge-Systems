import { NextResponse } from "next/server";
import Stripe from "stripe";
import { COLLECTIONS, getDb } from "@/lib/mongodb";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET." }, { status: 503 });
  }

  try {
    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
    }

    const payload = await request.text();
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const db = await getDb();
      await db.collection(COLLECTIONS.payments).updateOne(
        { stripeSessionId: session.id },
        {
          $set: {
            stripeSessionId: session.id,
            stripePaymentIntentId:
              typeof session.payment_intent === "string" ? session.payment_intent : null,
            customerEmail: session.customer_details?.email || null,
            amountTotal: session.amount_total ?? null,
            currency: session.currency ?? null,
            paymentStatus: session.payment_status ?? null,
            planId: session.metadata?.planId ?? null,
            planName: session.metadata?.planName ?? null,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[api/stripe/webhook]", error);
    return NextResponse.json({ error: "Invalid Stripe webhook payload." }, { status: 400 });
  }
}

