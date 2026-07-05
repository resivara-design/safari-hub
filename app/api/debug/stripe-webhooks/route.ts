import { NextResponse } from "next/server";
import Stripe from "stripe";
import { site } from "@/lib/site";
import { sendCustomerConfirmationEmail, sendOrderNotificationEmail } from "@/lib/email/order-notification";

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

// One-off: send both order emails directly with dummy data, bypassing Stripe
// entirely, to isolate whether Resend delivery itself works.
export async function PUT(request: Request) {
  const auth = request.headers.get("x-debug-key");
  if (auth !== "safari-hub-setup") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const to = searchParams.get("to");
  if (!to) {
    return NextResponse.json({ error: "missing ?to= query param" }, { status: 400 });
  }

  const payload = {
    orderId: "TEST-" + Date.now(),
    customerEmail: to,
    customerName: "Test Customer",
    phone: "07000000000",
    shippingAddress: "1 Test Street, London, SW1A 1AA",
    amountTotal: 9.58,
    items: [{ name: "Curry Powder", quantity: 2, amountTotal: 9.58 }],
  };

  const results = await Promise.allSettled([
    sendOrderNotificationEmail(payload),
    sendCustomerConfirmationEmail(payload),
  ]);

  return NextResponse.json({
    storeNotification: results[0].status === "fulfilled" ? "sent" : String(results[0].reason),
    customerConfirmation: results[1].status === "fulfilled" ? "sent" : String(results[1].reason),
  });
}
