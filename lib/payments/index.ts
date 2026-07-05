import type { CheckoutPayload, CheckoutResult } from "./types";
import { mockProvider } from "./mock-provider";

// Unused now that checkout calls the Stripe API route directly — kept as a fallback seam.
export async function processCheckout(payload: CheckoutPayload): Promise<CheckoutResult> {
  return mockProvider(payload);
}

export type { CheckoutPayload, CheckoutResult } from "./types";
