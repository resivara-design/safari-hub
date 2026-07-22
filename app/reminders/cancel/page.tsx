import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { isRedisConfigured } from "@/lib/reminders/redis-client";
import { cancelReminder, type CancelOutcome } from "@/lib/reminders/store";

export const metadata: Metadata = {
  title: "Cancel Reminder",
  robots: { index: false, follow: false },
};

interface CancelReminderPageProps {
  searchParams: { t?: string };
}

const messages: Record<CancelOutcome | "invalid" | "error", { heading: string; body: string }> = {
  cancelled: {
    heading: "Reminder cancelled",
    body: "We've cancelled your reminder — you won't receive an email about this product.",
  },
  already_cancelled: {
    heading: "Already cancelled",
    body: "This reminder was already cancelled. You're all set — no email will be sent.",
  },
  already_sent: {
    heading: "Reminder already sent",
    body: "This reminder has already been sent, and we only ever send one — there's nothing left to cancel.",
  },
  unavailable: {
    heading: "Nothing to cancel",
    body: "This reminder wasn't sent because the product was no longer available, so no email will be sent.",
  },
  not_found: {
    heading: "Reminder not found",
    body: "We couldn't find that reminder. It may have already expired, or the link may be incorrect.",
  },
  invalid: {
    heading: "Invalid link",
    body: "This cancellation link is invalid or incomplete.",
  },
  error: {
    heading: "Something went wrong",
    body: "We couldn't process this request right now. Please try the link again shortly, or contact us for help.",
  },
};

export default async function CancelReminderPage({ searchParams }: CancelReminderPageProps) {
  const token = searchParams.t;

  let outcome: CancelOutcome | "invalid" | "error" = "invalid";
  if (token && isRedisConfigured()) {
    try {
      outcome = await cancelReminder(token);
    } catch (error) {
      console.error("Failed to process reminder cancellation:", error instanceof Error ? error.message : error);
      outcome = "error";
    }
  }

  const { heading, body } = messages[outcome];

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-6">
      <SectionHeading eyebrow="Product Reminders" heading={heading} />
      <p className="mt-4 text-brown">{body}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button href="/shop" variant="primary" size="lg">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
