export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "How do I place an order?",
    answer:
      "Browse the shop, add items to your cart, and head to checkout. Fill in your delivery details and confirm your order — you'll receive a confirmation with your order number straight away.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most orders arrive within 2-4 working days across the UK mainland. See our Delivery page for full timeframes and zone-specific details.",
  },
  {
    question: "Are your ingredients authentic and ethically sourced?",
    answer:
      "Yes. We work directly with trusted growers and trader partners across West and East Africa, and every batch is checked for quality and freshness before it reaches our warehouse.",
  },
  {
    question: "Can I substitute or swap items in a meal kit?",
    answer:
      "Meal kits are pre-measured to give the best result, but you're welcome to order individual spices and leaves separately if you'd like to customise your own blend.",
  },
  {
    question: "What is your returns policy?",
    answer:
      "As these are food products, we can't accept returns once an order has been delivered. If anything arrives damaged or not as described, contact us within 48 hours and we'll sort out a replacement or refund.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Secure card payment is coming very soon, with Stripe and PayPal support in the works. In the meantime, our checkout flow is fully built and ready — see the Checkout page for details.",
  },
];
