import { NextResponse } from "next/server";
import { isRedisConfigured } from "@/lib/reminders/redis-client";
import { processDueReminders } from "@/lib/reminders/process-due";

export async function GET(request: Request) {
  if (!process.env.CRON_SECRET) {
    console.error("Reminder cron invoked but CRON_SECRET is not set for this environment — check Vercel env vars.");
    return NextResponse.json({ error: "Cron not configured" }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isRedisConfigured()) {
    console.error("Reminder cron invoked but Upstash Redis is not configured.");
    return NextResponse.json({ error: "Reminders storage not configured" }, { status: 500 });
  }

  try {
    const result = await processDueReminders(Date.now());
    return NextResponse.json(result);
  } catch (error) {
    console.error("Reminder cron run failed:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Cron run failed" }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
