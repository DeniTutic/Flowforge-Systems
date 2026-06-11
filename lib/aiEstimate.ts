import type { EstimateInput } from "@/lib/projectEstimate";
import { describeInput, formatUsd } from "@/lib/projectEstimate";

type AiNarrative = { summary: string; factors: string[] };

const MODEL = process.env.OPENAI_ESTIMATE_MODEL || "gpt-4o-mini";

export async function generateAiEstimateNarrative(
  input: EstimateInput,
  numbers: { low: number; high: number }
): Promise<AiNarrative | null> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return null;

  const described = describeInput(input);
  const range = formatUsd(numbers.low, numbers.high);

  const system = `You write brief project estimate explanations for Flowforge Systems, a US web & AI studio serving American small businesses, startups, and growing companies.

Rules:
- The price range is FIXED at ${range}. Never suggest different dollar amounts.
- Be realistic and conservative for the US market. Do not inflate or use enterprise/agency hype.
- Tone: professional, plain English, trustworthy consulting—not salesy.
- Audience: US business owners evaluating a website or automation project.
- Output valid JSON only: {"summary":"...","factors":["...","...","...","..."]}
- summary: 2-3 sentences, plain text (no markdown). Mention the fixed range once as "${range}".
- factors: exactly 4 short bullets explaining what drove the estimate (size, complexity, integrations, AI, timeline).`;

  const user = `Project inputs:
- Size & depth: ${described.sizeDepth}/10
- Complexity: ${described.complexity}
- Integrations: ${described.integrations}
- AI scope: ${described.aiScope}
- Timeline: ${described.timeline}

Write the JSON explanation for this US client.`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (!res.ok) {
      console.error("[aiEstimate] OpenAI HTTP", res.status, await res.text().catch(() => ""));
      return null;
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;

    const parsed = JSON.parse(content) as { summary?: unknown; factors?: unknown };
    if (typeof parsed.summary !== "string" || !Array.isArray(parsed.factors)) return null;

    const factors = parsed.factors.filter((f): f is string => typeof f === "string").slice(0, 5);
    if (factors.length < 3) return null;

    return { summary: parsed.summary.trim(), factors };
  } catch (e) {
    console.error("[aiEstimate]", e);
    return null;
  }
}
