"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { readStoredConsent, writeStoredConsent, type CookieConsent } from "@/lib/cookie-consent";

interface CookieConsentContextValue {
  consent: CookieConsent | null;
  showBanner: boolean;
  showPreferences: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  savePreferences: (prefs: { analytics: boolean; marketing: boolean }) => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    setConsent(readStoredConsent());
    setHydrated(true);
  }, []);

  const acceptAll = useCallback(() => {
    setConsent(writeStoredConsent({ analytics: true, marketing: true }));
    setShowPreferences(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    setConsent(writeStoredConsent({ analytics: false, marketing: false }));
    setShowPreferences(false);
  }, []);

  const savePreferences = useCallback((prefs: { analytics: boolean; marketing: boolean }) => {
    setConsent(writeStoredConsent(prefs));
    setShowPreferences(false);
  }, []);

  const openPreferences = useCallback(() => setShowPreferences(true), []);
  const closePreferences = useCallback(() => setShowPreferences(false), []);

  const value: CookieConsentContextValue = {
    consent,
    // Only show the first-visit banner once we've checked localStorage
    // (hydrated) and found no prior decision.
    showBanner: hydrated && consent === null && !showPreferences,
    showPreferences,
    acceptAll,
    rejectNonEssential,
    openPreferences,
    closePreferences,
    savePreferences,
  };

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}
