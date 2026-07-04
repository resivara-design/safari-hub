import type { CheckoutPayload, CheckoutResult } from "./types";
import { mockProvider } from "./mock-provider";

// Seam for real payment integration: swap mockProvider for a stripe-provider.ts
// or paypal-provider.ts that implements the same PaymentProvider signature.
export async function processCheckout(payload: CheckoutPayload): Promise<CheckoutResult> {
  return mockProvider(payload);
}

export type { CheckoutPayload, CheckoutResult } from "./types";
