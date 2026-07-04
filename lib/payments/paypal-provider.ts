import type { CheckoutPayload } from "./types";

const PAYPAL_BASE_URL =
  process.env.PAYPAL_MODE === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

export function isPayPalConfigured(): boolean {
  return Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
}

async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET is not configured");
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error(`Failed to get PayPal access token: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token as string;
}

export async function createPayPalOrder(payload: CheckoutPayload): Promise<{ id: string }> {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "GBP",
            value: payload.subtotal.toFixed(2),
          },
          custom_id: payload.customer.email,
        },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to create PayPal order: ${response.status} ${body}`);
  }

  const data = await response.json();
  return { id: data.id };
}

export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to capture PayPal order: ${response.status} ${body}`);
  }

  return response.json();
}
