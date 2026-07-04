"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart/use-cart";
import FormField from "@/components/forms/FormField";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductImage from "@/components/product/ProductImage";
import FreeDeliveryBadge from "@/components/ui/FreeDeliveryBadge";
import { formatPrice } from "@/lib/format";
import { processCheckout } from "@/lib/payments";
import { site } from "@/lib/site";
import type { CheckoutCustomer } from "@/lib/payments/types";
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

export default function CheckoutClient() {
  const { items, subtotal, dispatch } = useCart();
  const [customer, setCustomer] = useState<CheckoutCustomer>(initialCustomer);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutCustomer, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ orderId: string; message: string } | null>(null);

  function update(field: keyof CheckoutCustomer, value: string) {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
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
    setSubmitting(true);

    const checkoutResult = await processCheckout({
      customer,
      items: items.map((item) => ({
        slug: item.slug,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal,
    });

    setSubmitting(false);

    if (checkoutResult.success) {
      dispatch({ type: "CLEAR_CART" });
      setResult({ orderId: checkoutResult.orderId, message: checkoutResult.message });
    }
  }

  if (result) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-6">
        <SectionHeading eyebrow="Order Confirmed" heading="Thank you for your order!" />
        <p className="mt-4 text-brown">{result.message}</p>
        <p className="mt-2 font-heading text-xl text-deep-green">Order ID: {result.orderId}</p>
        <div className="mt-6">
          <Button href="/shop" variant="primary" size="lg">
            Continue Shopping
          </Button>
        </div>
        <div className="mt-8 rounded-2xl border border-brown/10 bg-ivory p-6 text-sm text-brown">
          <p className="font-heading text-base text-ink">Questions about your order?</p>
          <div className="mt-2 flex flex-col gap-1">
            <a href={`mailto:${site.contactEmail}`} className="text-deep-green hover:underline">
              {site.contactEmail}
            </a>
            <a href={site.phoneLink} className="text-deep-green hover:underline">
              {site.phoneNumber}
            </a>
            <a href={site.whatsappLink} target="_blank" rel="noreferrer" className="text-deep-green hover:underline">
              WhatsApp: {site.whatsappNumber}
            </a>
          </div>
        </div>
      </div>
    );
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:col-span-2">
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

          <div className="mt-2 rounded-xl border border-brown/10 bg-cream p-4 text-sm text-brown/70">
            Secure payment via card — Stripe &amp; PayPal coming soon.
          </div>

          <Button type="submit" variant="primary" size="lg" disabled={submitting} className="mt-2 w-fit">
            {submitting ? "Placing Order..." : "Place Order"}
          </Button>
        </form>

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
