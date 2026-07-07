// Single source of truth for the returns-policy summary sentence — referenced
// by the FAQ entry and the Delivery page so the core claim can't drift out of
// sync between them. The full policy (with all sections) lives directly in
// app/returns/page.tsx, since it's structured content rather than a single
// reusable string.
export const returnsPolicySummary =
  "Due to the nature of our food products, we cannot accept returns once an order has been delivered. If your order arrives damaged, defective, incorrect or not as described, please contact us within 48 hours.";
