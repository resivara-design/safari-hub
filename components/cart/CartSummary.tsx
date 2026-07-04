import Button from "@/components/ui/Button";
import FreeDeliveryBadge from "@/components/ui/FreeDeliveryBadge";
import { formatPrice } from "@/lib/format";

interface CartSummaryProps {
  subtotal: number;
  checkoutHref?: string;
}

export default function CartSummary({ subtotal, checkoutHref = "/checkout" }: CartSummaryProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-brown/10 bg-ivory p-6">
      <h3 className="font-heading text-xl text-ink">Order Summary</h3>
      <div className="flex flex-col gap-2 text-sm text-brown">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-bold">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Delivery</span>
          <FreeDeliveryBadge />
        </div>
      </div>
      <div className="flex justify-between border-t border-brown/10 pt-3 font-heading text-lg font-bold text-ink">
        <span>Total</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <Button href={checkoutHref} variant="primary" size="lg" className="w-full">
        Proceed to Checkout
      </Button>
    </div>
  );
}
