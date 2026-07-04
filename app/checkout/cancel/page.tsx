import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-6">
      <SectionHeading eyebrow="Payment Cancelled" heading="No charge was made" />
      <p className="mt-4 text-brown">
        Your payment was cancelled and your card has not been charged. Your cart is still saved if you&apos;d
        like to try again.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button href="/checkout" variant="primary" size="lg">
          Return to Checkout
        </Button>
        <Button href="/cart" variant="outline" size="lg">
          View Cart
        </Button>
      </div>
    </div>
  );
}
