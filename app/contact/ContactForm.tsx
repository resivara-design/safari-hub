"use client";

import { useState } from "react";
import FormField from "@/components/forms/FormField";
import Button from "@/components/ui/Button";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Partial<FormState> = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) nextErrors.message = "Please enter a message.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong sending your message. Please try again.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-deep-green/10 p-6 text-deep-green">
        <p className="font-heading text-xl">Message sent</p>
        <p className="mt-1 text-sm text-brown">
          Thanks for reaching out — we&apos;ll get back to you within one working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField
        label="Your Name"
        name="name"
        value={form.name}
        onChange={(v) => update("name", v)}
        error={errors.name}
        required
      />
      <FormField
        label="Email Address"
        name="email"
        type="email"
        value={form.email}
        onChange={(v) => update("email", v)}
        error={errors.email}
        required
      />
      <FormField
        label="Message"
        name="message"
        type="textarea"
        value={form.message}
        onChange={(v) => update("message", v)}
        error={errors.message}
        required
      />
      {submitError && (
        <div className="rounded-xl border border-burnt-orange/30 bg-burnt-orange/10 p-3 text-sm text-burnt-orange-dark">
          {submitError}
        </div>
      )}
      <Button type="submit" variant="primary" size="lg" className="w-fit" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
