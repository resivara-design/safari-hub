import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/payments/paypal-provider";

export async function POST(request: Request) {
  const { orderId } = (await request.json()) as { orderId: string };

  if (!orderId) {
    return NextResponse.json({ error: "Missing order ID." }, { status: 400 });
  }

  try {
    const capture = await capturePayPalOrder(orderId);
    return NextResponse.json(capture);
  } catch (error) {
    console.error("PayPal capture order error:", error);
    return NextResponse.json({ error: "Something went wrong confirming your PayPal payment. Please try again." }, { status: 500 });
  }
}
