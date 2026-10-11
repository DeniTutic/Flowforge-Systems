import { NextResponse } from "next/server";
import { COLLECTIONS, getDb } from "@/lib/mongodb";
import { getMongoUserMessage } from "@/lib/mongoErrors";
import { getClientIp } from "@/lib/clientIp";
import { rateLimit } from "@/lib/rateLimit";
import { isHoneypotClean, validateFormTiming } from "@/lib/formAbuse";
import { BUDGET_VALUES, PROJECT_TYPE_VALUES } from "@/lib/contactOptions";
import { notifyNewLead } from "@/lib/leadEmail";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 10000;
const MAX_COMPANY = 200;

const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 8;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`contact:${ip}`, MAX_PER_WINDOW, WINDOW_MS);
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

    const { name, email, message, company, projectType, budget } = rec;
    const nameStr = typeof name === "string" ? name.trim() : "";
    const emailStr = typeof email === "string" ? email.trim().toLowerCase() : "";
    const messageStr = typeof message === "string" ? message.trim() : "";
    const companyStr = typeof company === "string" ? company.trim().slice(0, MAX_COMPANY) : "";
    // Optional qualifiers — only stored when they match the whitelist.
    const projectTypeStr =
      typeof projectType === "string" && PROJECT_TYPE_VALUES.has(projectType) ? projectType : undefined;
    const budgetStr = typeof budget === "string" && BUDGET_VALUES.has(budget) ? budget : undefined;

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
      ...(companyStr ? { company: companyStr } : {}),
      ...(projectTypeStr ? { projectType: projectTypeStr } : {}),
      ...(budgetStr ? { budget: budgetStr } : {}),
      status: "new",
      createdAt: new Date(),
    });

    // The lead is safe in the database; the email is a courtesy and never fails the request.
    await notifyNewLead({
      name: nameStr,
      email: emailStr,
      company: companyStr || undefined,
      projectType: projectTypeStr,
      budget: budgetStr,
      message: messageStr,
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
