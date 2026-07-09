import { NextResponse } from "next/server";
import { isResendConfigured, sendContactFormEmail } from "@/lib/email/order-notification";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = { name: 200, email: 320, message: 5000 };

export async function POST(request: Request) {
  if (isRateLimited(`contact:${getClientIp(request)}`, RATE_LIMIT, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim() || name.length > MAX_LENGTH.name) {
    return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_PATTERN.test(email) || email.length > MAX_LENGTH.email) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (typeof message !== "string" || !message.trim() || message.length > MAX_LENGTH.message) {
    return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
  }

  if (!isResendConfigured()) {
    console.error("Contact form submitted but RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Message sending is temporarily unavailable. Please email us directly." },
      { status: 503 }
    );
  }

  try {
    await sendContactFormEmail({ name: name.trim(), email: email.trim(), message: message.trim() });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact form email:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
