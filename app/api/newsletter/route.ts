import { NextResponse } from "next/server";
import { MongoServerError } from "mongodb";
import type { Db } from "mongodb";
import { COLLECTIONS, getDb } from "@/lib/mongodb";
import { getMongoUserMessage } from "@/lib/mongoErrors";
import { getClientIp } from "@/lib/clientIp";
import { rateLimit } from "@/lib/rateLimit";
import { isHoneypotClean, validateFormTiming } from "@/lib/formAbuse";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 6;

let newsletterEmailIndexEnsured = false;

async function ensureNewsletterEmailUniqueIndex(db: Db) {
  if (newsletterEmailIndexEnsured) return;
  await db
    .collection(COLLECTIONS.newsletterSubscribers)
    .createIndex({ email: 1 }, { unique: true });
  newsletterEmailIndexEnsured = true;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`newsletter:${ip}`, MAX_PER_WINDOW, WINDOW_MS);
  if (!limited.ok) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${limited.retryAfterSec} seconds.` },
      { status: 429 }
    );
  }

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const rec = body as Record<string, unknown>;

    if (!isHoneypotClean(rec.website)) {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }

    const timing = validateFormTiming(rec.formStartedAt);
    if (!timing.ok) {
      return NextResponse.json({ error: timing.message }, { status: 400 });
    }

    const email =
      typeof rec.email === "string" ? rec.email.trim().toLowerCase() : "";

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const db = await getDb();
    const collection = db.collection(COLLECTIONS.newsletterSubscribers);

    await ensureNewsletterEmailUniqueIndex(db);

    try {
      await collection.insertOne({
        email,
        source: "popup",
        subscribedAt: new Date(),
      });
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        return NextResponse.json({ ok: true, duplicate: true });
      }
      throw err;
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server error";
    const isConfig = message.includes("MONGODB_URI");
    const mongoHint = getMongoUserMessage(e);
    console.error("[api/newsletter]", e);
    return NextResponse.json(
      {
        error:
          mongoHint ??
          (isConfig ? "Server is not configured for subscriptions." : "Could not save subscription."),
      },
      { status: isConfig ? 503 : mongoHint ? 502 : 500 }
    );
  }
}
