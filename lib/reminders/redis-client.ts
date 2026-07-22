import { Redis } from "@upstash/redis";

let redisClient: Redis | null = null;

export function isRedisConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

export function getRedisClient(): Redis {
  if (!isRedisConfigured()) {
    throw new Error("Upstash Redis is not configured (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN)");
  }
  if (!redisClient) {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return redisClient;
}
