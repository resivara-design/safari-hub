import { NextResponse } from "next/server";
import { createStripeCheckoutSession, isStripeConfigured } from "@/lib/payments/stripe-provider";
import type { CheckoutPayload } from "@/lib/payments/types";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Card payment is temporarily unavailable. Please contact us to complete your order." },
      { status: 503 }
    );
  }

  const payload = (await request.json()) as CheckoutPayload;

  if (!payload.items || payload.items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  try {
    const { url } = await createStripeCheckoutSession(payload);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    return NextResponse.json(
      { error: "Something went wrong starting card checkout. Please try again." },
      { status: 500 }
    );
  }
}
