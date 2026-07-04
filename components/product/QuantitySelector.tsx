"use client";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-brown/20 bg-cream">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="w-9 h-9 flex items-center justify-center text-ink text-lg disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-full"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-8 text-center font-semibold text-ink" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="w-9 h-9 flex items-center justify-center text-ink text-lg disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-full"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
