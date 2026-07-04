"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "@/lib/cart/use-cart";
import FormField from "@/components/forms/FormField";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductImage from "@/components/product/ProductImage";
import FreeDeliveryBadge from "@/components/ui/FreeDeliveryBadge";
import { formatPrice } from "@/lib/format";
import type { CheckoutCustomer, CheckoutPayload } from "@/lib/payments/types";
import type { ProductImagePlaceholder as ImagePlaceholderConfig } from "@/types/product";

const initialCustomer: CheckoutCustomer = {
  fullName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  postcode: "",
};

const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export default function CheckoutClient() {
  const router = useRouter();
  const { items, subtotal } = useCart();
  const [customer, setCustomer] = useState<CheckoutCustomer>(initialCustomer);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutCustomer, string>>>({});
  const [detailsConfirmed, setDetailsConfirmed] = useState(false);
  const [processing, setProcessing] = useState<"stripe" | "paypal" | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  function update(field: keyof CheckoutCustomer, value: string) {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  }

  function buildPayload(): CheckoutPayload {
    return {
      customer,
      items: items.map((item) => ({
        slug: item.slug,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal,
    };
  }

  function handleConfirmDetails(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Partial<Record<keyof CheckoutCustomer, string>> = {};
    if (!customer.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!customer.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!customer.addressLine1.trim()) nextErrors.addressLine1 = "Address is required.";
    if (!customer.city.trim()) nextErrors.city = "City is required.";
    if (!customer.postcode.trim()) nextErrors.postcode = "Postcode is required.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setPaymentError(null);
    setDetailsConfirmed(true);
  }

  async function handlePayWithCard() {
    setProcessing("stripe");
    setPaymentError(null);
    try {
      const response = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      const data = await response.json();
      if (!response.ok) {
        setPaymentError(data.error || "Something went wrong. Please try again.");
        setProcessing(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      setPaymentError("Something went wrong starting card checkout. Please try again.");
      setProcessing(null);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-6">
        <SectionHeading eyebrow="Checkout" heading="Your cart is empty" />
        <p className="mt-4 text-brown/70">Add something to your cart before checking out.</p>
        <div className="mt-6">
          <Button href="/shop" variant="primary" size="lg">
            Browse the Shop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading eyebrow="Checkout" heading="Shipping &amp; Payment" align="left" />

      <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">
        <div className="flex flex-col gap-4 md:col-span-2">
          <form onSubmit={handleConfirmDetails} className={`flex flex-col gap-4 ${detailsConfirmed ? "opacity-60" : ""}`}>
            <fieldset disabled={detailsConfirmed} className="contents">
              <FormField
                label="Full Name"
                name="fullName"
                value={customer.fullName}
                onChange={(v) => update("fullName", v)}
                error={errors.fullName}
                required
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={customer.email}
                  onChange={(v) => update("email", v)}
                  error={errors.email}
                  required
                />
                <FormField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={customer.phone}
                  onChange={(v) => update("phone", v)}
                  error={errors.phone}
                  required
                />
              </div>
              <FormField
                label="Address Line 1"
                name="addressLine1"
                value={customer.addressLine1}
                onChange={(v) => update("addressLine1", v)}
                error={errors.addressLine1}
                required
              />
              <FormField
                label="Address Line 2 (optional)"
                name="addressLine2"
                value={customer.addressLine2 || ""}
                onChange={(v) => update("addressLine2", v)}
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  label="City"
                  name="city"
                  value={customer.city}
                  onChange={(v) => update("city", v)}
                  error={errors.city}
                  required
                />
                <FormField
                  label="Postcode"
                  name="postcode"
                  value={customer.postcode}
                  onChange={(v) => update("postcode", v)}
                  error={errors.postcode}
                  required
                />
              </div>
            </fieldset>

            {!detailsConfirmed && (
              <Button type="submit" variant="primary" size="lg" className="mt-2 w-fit">
                Continue to Payment
              </Button>
            )}
          </form>

          {detailsConfirmed && (
            <div className="mt-2 flex flex-col gap-4 rounded-2xl border border-brown/10 bg-cream p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg text-ink">Choose a payment method</h3>
                <button
                  type="button"
                  onClick={() => setDetailsConfirmed(false)}
                  className="text-sm font-semibold text-deep-green hover:underline"
                >
                  ← Edit details
                </button>
              </div>

              {paymentError && (
                <div className="rounded-xl border border-burnt-orange/30 bg-burnt-orange/10 p-3 text-sm text-burnt-orange-dark">
                  {paymentError}
                </div>
              )}

              <Button
                type="button"
                variant="secondary"
                size="lg"
                disabled={processing !== null}
                onClick={handlePayWithCard}
                className="w-full"
              >
                {processing === "stripe" ? "Redirecting to secure payment..." : "Pay with Card (Visa, Mastercard, Apple Pay, Google Pay)"}
              </Button>

              {paypalClientId ? (
                <PayPalScriptProvider options={{ clientId: paypalClientId, currency: "GBP" }}>
                  <PayPalButtons
                    style={{ layout: "vertical", color: "gold", label: "paypal" }}
                    disabled={processing !== null}
                    createOrder={async () => {
                      setProcessing("paypal");
                      setPaymentError(null);
                      const response = await fetch("/api/checkout/paypal/create-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(buildPayload()),
                      });
                      const data = await response.json();
                      if (!response.ok) {
                        setPaymentError(data.error || "Something went wrong. Please try again.");
                        setProcessing(null);
                        throw new Error(data.error || "PayPal order creation failed");
                      }
                      return data.id;
                    }}
                    onApprove={async (data) => {
                      const response = await fetch("/api/checkout/paypal/capture-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ orderId: data.orderID }),
                      });
                      if (!response.ok) {
                        const body = await response.json();
                        setPaymentError(body.error || "Something went wrong confirming your payment.");
                        setProcessing(null);
                        return;
                      }
                      router.push("/checkout/success");
                    }}
                    onCancel={() => setProcessing(null)}
                    onError={() => {
                      setPaymentError("Something went wrong with PayPal. Please try again.");
                      setProcessing(null);
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <div className="rounded-xl border border-brown/10 bg-ivory p-3 text-sm text-brown/70">
                  PayPal checkout is not configured yet.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-brown/10 bg-ivory p-6">
            <h3 className="font-heading text-xl text-ink">Order Summary</h3>
            <div className="mt-4 flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.slug} className="flex items-center justify-between gap-3 text-sm text-brown">
                  <div className="flex items-center gap-3">
                    <div className="w-10 shrink-0 md:w-12">
                      <ProductImage
                        image={{
                          colorFrom: item.imagePlaceholder.colorFrom,
                          colorTo: item.imagePlaceholder.colorTo,
                          icon: item.imagePlaceholder.icon as ImagePlaceholderConfig["icon"],
                        }}
                        name={item.name}
                        photo={item.photo}
                        size="sm"
                      />
                    </div>
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                  </div>
                  <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-brown/10 pt-3 text-sm text-brown">
              <span>Delivery</span>
              <FreeDeliveryBadge />
            </div>
            <div className="mt-3 flex justify-between border-t border-brown/10 pt-3 font-heading text-lg font-bold text-ink">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>
          <Link href="/cart" className="text-sm font-semibold text-deep-green hover:underline">
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
