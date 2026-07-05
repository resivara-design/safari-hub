import { products } from "@/lib/products";
import type { CheckoutPayload } from "./types";

const MAX_LINE_ITEMS = 50;
const MAX_QUANTITY_PER_ITEM = 20;
const MAX_TEXT_LENGTH = 200;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface CheckoutValidationResult {
  ok: boolean;
  error?: string;
  payload?: CheckoutPayload;
}

function isNonEmptyString(value: unknown, maxLength = MAX_TEXT_LENGTH): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

/**
 * Re-derives every line item's price and name from the product catalog and
 * re-validates quantities, rather than trusting the client-submitted values.
 * Without this, a request can be crafted (e.g. via the browser devtools
 * network tab or a raw curl call) that sets an arbitrary `price` for any
 * item and Stripe would charge that amount instead of the real price.
 */
export function validateCheckoutPayload(body: unknown): CheckoutValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body." };
  }
  const raw = body as Partial<CheckoutPayload>;

  const customer = raw.customer;
  if (typeof customer !== "object" || customer === null) {
    return { ok: false, error: "Missing customer details." };
  }
  const { fullName, email, phone, addressLine1, addressLine2, city, postcode } = customer;

  if (!isNonEmptyString(fullName)) return { ok: false, error: "A valid full name is required." };
  if (!isNonEmptyString(email, 320) || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "A valid email address is required." };
  }
  if (!isNonEmptyString(phone, 40)) return { ok: false, error: "A valid phone number is required." };
  if (!isNonEmptyString(addressLine1)) return { ok: false, error: "A valid address is required." };
  if (addressLine2 !== undefined && addressLine2 !== "" && !isNonEmptyString(addressLine2)) {
    return { ok: false, error: "Address line 2 is too long." };
  }
  if (!isNonEmptyString(city)) return { ok: false, error: "A valid city is required." };
  if (!isNonEmptyString(postcode, 20)) return { ok: false, error: "A valid postcode is required." };

  if (!Array.isArray(raw.items) || raw.items.length === 0) {
    return { ok: false, error: "Your cart is empty." };
  }
  if (raw.items.length > MAX_LINE_ITEMS) {
    return { ok: false, error: "Too many items in cart." };
  }

  const verifiedItems: CheckoutPayload["items"] = [];
  for (const rawItem of raw.items) {
    if (typeof rawItem !== "object" || rawItem === null) {
      return { ok: false, error: "Invalid item in cart." };
    }
    const { slug, quantity } = rawItem as { slug?: unknown; quantity?: unknown };
    if (typeof slug !== "string") {
      return { ok: false, error: "Invalid item in cart." };
    }
    if (!Number.isInteger(quantity) || (quantity as number) <= 0 || (quantity as number) > MAX_QUANTITY_PER_ITEM) {
      return { ok: false, error: "Invalid item quantity." };
    }

    const product = products.find((p) => p.slug === slug);
    if (!product) {
      return { ok: false, error: "One or more items in your cart no longer exist." };
    }
    if (!product.inStock) {
      return { ok: false, error: `${product.name} is currently out of stock.` };
    }

    // Price and name always come from the catalog — never from the request.
    verifiedItems.push({
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity: quantity as number,
    });
  }

  const subtotal = verifiedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    ok: true,
    payload: {
      customer: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2 ? addressLine2.trim() : undefined,
        city: city.trim(),
        postcode: postcode.trim(),
      },
      items: verifiedItems,
      subtotal,
    },
  };
}
