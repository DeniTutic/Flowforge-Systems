import { NextResponse } from "next/server";
import {
  computeProjectEstimate,
  type AiScope,
  type Complexity,
  type Timeline,
} from "@/lib/projectEstimate";

const VALID_COMPLEXITY = new Set<Complexity>(["focused", "standard", "large"]);
const VALID_TIMELINE = new Set<Timeline>(["flexible", "normal", "rush"]);
const VALID_AI = new Set<AiScope>(["none", "light", "moderate", "advanced"]);

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

    const rec = body as Record<string, unknown>;
    const sizeDepth = typeof rec.sizeDepth === "number" ? rec.sizeDepth : Number(rec.sizeDepth);
    const integrations =
      typeof rec.integrations === "number" ? rec.integrations : Number(rec.integrations);
    const complexity = rec.complexity as Complexity;
    const timeline = rec.timeline as Timeline;
    const aiScope = rec.aiScope as AiScope;

    if (!Number.isFinite(sizeDepth) || sizeDepth < 1 || sizeDepth > 10) {
      return NextResponse.json({ error: "sizeDepth must be 1–10" }, { status: 400 });
    }
    if (!Number.isFinite(integrations) || integrations < 0 || integrations > 10) {
      return NextResponse.json({ error: "integrations must be 0–10" }, { status: 400 });
    }
    if (!VALID_COMPLEXITY.has(complexity)) {
      return NextResponse.json({ error: "Invalid complexity" }, { status: 400 });
    }
    if (!VALID_TIMELINE.has(timeline)) {
      return NextResponse.json({ error: "Invalid timeline" }, { status: 400 });
    }
    if (!VALID_AI.has(aiScope)) {
      return NextResponse.json({ error: "Invalid aiScope" }, { status: 400 });
    }

    const result = computeProjectEstimate({
      sizeDepth,
      integrations,
      complexity,
      timeline,
      aiScope,
    });

    return NextResponse.json(result);
  } catch (e) {
    console.error("[api/estimate]", e);
    return NextResponse.json({ error: "Could not compute estimate." }, { status: 500 });
  }
}
