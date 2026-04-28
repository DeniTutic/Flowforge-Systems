import { NextResponse } from "next/server";
import { COLLECTIONS, getDb } from "@/lib/mongodb";
import { getMongoUserMessage } from "@/lib/mongoErrors";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 10000;

export async function POST(request: Request) {
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

    const { name, email, message } = body as Record<string, unknown>;
    const nameStr = typeof name === "string" ? name.trim() : "";
    const emailStr = typeof email === "string" ? email.trim().toLowerCase() : "";
    const messageStr = typeof message === "string" ? message.trim() : "";

    if (nameStr.length < 2 || nameStr.length > MAX_NAME) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }
    if (!emailStr || !EMAIL_REGEX.test(emailStr) || emailStr.length > MAX_EMAIL) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (messageStr.length < 10 || messageStr.length > MAX_MESSAGE) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const db = await getDb();
    await db.collection(COLLECTIONS.contactMessages).insertOne({
      name: nameStr,
      email: emailStr,
      message: messageStr,
      status: "new",
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server error";
    const isConfig = message.includes("MONGODB_URI");
    const mongoHint = getMongoUserMessage(e);
    console.error("[api/contact]", e);
    return NextResponse.json(
      {
        error:
          mongoHint ??
          (isConfig ? "Server is not configured for messages." : "Could not send message."),
      },
      { status: isConfig ? 503 : mongoHint ? 502 : 500 }
    );
  }
}
