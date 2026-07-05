/**
 * Best-effort in-memory rate limiter, keyed per warm serverless instance.
 *
 * This is NOT a substitute for platform-level rate limiting (Vercel
 * Firewall) — it resets on cold start and isn't shared across instances —
 * but it costs nothing to add and blunts naive single-instance abuse
 * (e.g. a script hammering the checkout endpoint) without needing a new
 * Redis/KV dependency for a low-traffic storefront.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  timestamps.push(now);
  hits.set(key, timestamps);

  // Bound memory: forget keys once they stop being active.
  if (hits.size > 5000) {
    hits.forEach((v, k) => {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    });
  }

  return timestamps.length > limit;
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
