"use client";

import { useCookieConsent } from "./CookieConsentContext";

export default function CookieSettingsLink({ className }: { className?: string }) {
  const { openPreferences } = useCookieConsent();
  return (
    <button type="button" onClick={openPreferences} className={className}>
      Cookie Settings
    </button>
  );
}
