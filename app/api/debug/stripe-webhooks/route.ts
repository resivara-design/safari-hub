import { NextResponse } from "next/server";
import Stripe from "stripe";
import { site } from "@/lib/site";

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

// One-off: register the webhook endpoint under whichever mode STRIPE_SECRET_KEY
// currently is, since it was missing from that mode's endpoint list.
export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "STRIPE_SECRET_KEY not configured" }, { status: 500 });
  }
  const auth = request.headers.get("x-debug-key");
  if (auth !== "safari-hub-setup") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const endpoint = await stripe.webhookEndpoints.create({
    url: `${site.url}/api/webhooks/stripe`,
    enabled_events: ["checkout.session.completed"],
  });
  return NextResponse.json({ id: endpoint.id, url: endpoint.url, secret: endpoint.secret });
}
