import { NextResponse } from "next/server";
import { createPayPalOrder, isPayPalConfigured } from "@/lib/payments/paypal-provider";
import type { CheckoutPayload } from "@/lib/payments/types";

export async function POST(request: Request) {
  if (!isPayPalConfigured()) {
    return NextResponse.json(
      { error: "PayPal payment is temporarily unavailable. Please contact us to complete your order." },
      { status: 503 }
    );
  }

  const payload = (await request.json()) as CheckoutPayload;

  if (!payload.items || payload.items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  try {
    const order = await createPayPalOrder(payload);
    return NextResponse.json(order);
  } catch (error) {
    console.error("PayPal create order error:", error);
    return NextResponse.json({ error: "Something went wrong starting PayPal checkout. Please try again." }, { status: 500 });
  }
}
