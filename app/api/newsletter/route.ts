import { NextResponse } from "next/server";
import { MongoServerError } from "mongodb";
import type { Db } from "mongodb";
import { COLLECTIONS, getDb } from "@/lib/mongodb";
import { getMongoUserMessage } from "@/lib/mongoErrors";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let newsletterEmailIndexEnsured = false;

async function ensureNewsletterEmailUniqueIndex(db: Db) {
  if (newsletterEmailIndexEnsured) return;
  await db
    .collection(COLLECTIONS.newsletterSubscribers)
    .createIndex({ email: 1 }, { unique: true });
  newsletterEmailIndexEnsured = true;
}

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const email =
      typeof body === "object" &&
      body !== null &&
      "email" in body &&
      typeof (body as { email: unknown }).email === "string"
        ? (body as { email: string }).email.trim().toLowerCase()
        : "";

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
