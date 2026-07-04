import type { CheckoutPayload, CheckoutResult, PaymentProvider } from "./types";

export const mockProvider: PaymentProvider = async (
  payload: CheckoutPayload
): Promise<CheckoutResult> => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const orderId = `SH-${Date.now()}`;

  return {
    success: true,
    orderId,
    message: `Order confirmed for ${payload.customer.fullName}. A confirmation has been sent to ${payload.customer.email}.`,
  };
};
