import { NextResponse } from "next/server";
import { createStripeCheckoutSession, isStripeConfigured } from "@/lib/payments/stripe-provider";
import { validateCheckoutPayload } from "@/lib/payments/validate-checkout";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

const RATE_LIMIT = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;

export async function POST(request: Request) {
  if (isRateLimited(`checkout:${getClientIp(request)}`, RATE_LIMIT, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Card payment is temporarily unavailable. Please contact us to complete your order." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const validation = validateCheckoutPayload(body);
  if (!validation.ok || !validation.payload) {
    return NextResponse.json({ error: validation.error ?? "Invalid request." }, { status: 400 });
  }

  try {
    const { url } = await createStripeCheckoutSession(validation.payload);
    return NextResponse.json({ url });
  } catch (error) {
    // Log full detail server-side only; never forward error internals to the client.
    console.error("Stripe checkout session error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Something went wrong starting card checkout. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
