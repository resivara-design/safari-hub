import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "STRIPE_SECRET_KEY not configured" }, { status: 500 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const endpoints = await stripe.webhookEndpoints.list({ limit: 20 });
  return NextResponse.json({
    keyMode: process.env.STRIPE_SECRET_KEY.startsWith("sk_live_") ? "live" : "test",
    endpoints: endpoints.data.map((e) => ({
      id: e.id,
      url: e.url,
      status: e.status,
      enabled_events: e.enabled_events,
      api_version: e.api_version,
    })),
  });
}
