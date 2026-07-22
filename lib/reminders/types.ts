export type ReminderStatus = "pending" | "sent" | "cancelled" | "unavailable";

export interface ReminderRecord {
  token: string;
  productSlug: string;
  // Snapshot at signup time — the send-time email always re-reads the live
  // catalog for price/availability, but this survives even if the product's
  // display name changes before the reminder fires.
  productName: string;
  email: string;
  // Server-generated, never trust a client-supplied timestamp for the
  // consent record.
  consentAt: string;
  status: ReminderStatus;
  createdAt: string;
  dueAt: number;
  sentAt?: string;
}
