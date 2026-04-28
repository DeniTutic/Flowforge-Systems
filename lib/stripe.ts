import Stripe from "stripe";

export const STRIPE_PLANS = {
  starter: {
    id: "starter",
    name: "Starter",
    amount: 299900,
    currency: "usd",
  },
  growth: {
    id: "growth",
    name: "Growth",
    amount: 799900,
    currency: "usd",
  },
} as const;

export type StripePlanId = keyof typeof STRIPE_PLANS;

let stripeClient: Stripe | undefined;

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY.");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
}

