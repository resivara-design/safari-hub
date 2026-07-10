export interface CookieConsent {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
}

export const COOKIE_CONSENT_STORAGE_KEY = "safarihub-cookie-consent";
export const COOKIE_CONSENT_VERSION = 1;

interface StoredConsent extends CookieConsent {
  version: number;
}

export function readStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null;
    return { essential: true, analytics: parsed.analytics, marketing: parsed.marketing, decidedAt: parsed.decidedAt };
  } catch {
    return null;
  }
}

export function writeStoredConsent(consent: Omit<CookieConsent, "essential" | "decidedAt">): CookieConsent {
  const full: CookieConsent = { essential: true, analytics: consent.analytics, marketing: consent.marketing, decidedAt: new Date().toISOString() };
  if (typeof window !== "undefined") {
    const stored: StoredConsent = { ...full, version: COOKIE_CONSENT_VERSION };
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(stored));
  }
  return full;
}
