"use server";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { COLLECTIONS, getDb } from "@/lib/mongodb";

/**
 * Server Actions are only reachable as `POST /admin`, so the Basic Auth check in
 * middleware.ts gates them exactly like the page itself. Nothing here trusts the client
 * beyond the document id, which is validated before it touches the database.
 */

export type ActionResult = { ok: true } | { ok: false; error: string };

export type MessageStatus = "new" | "done";
const MESSAGE_STATUSES = new Set<MessageStatus>(["new", "done"]);

const OBJECT_ID = /^[a-f0-9]{24}$/i;

function toObjectId(id: unknown): ObjectId | null {
  return typeof id === "string" && OBJECT_ID.test(id) ? new ObjectId(id) : null;
}

async function run(
  label: string,
  work: () => Promise<boolean>,
  notFound: string
): Promise<ActionResult> {
  try {
    if (!(await work())) return { ok: false, error: notFound };
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    console.error(`[admin/${label}]`, e);
    return { ok: false, error: "Could not reach the database. Try again." };
  }
}

export async function setMessageStatus(id: string, status: MessageStatus): Promise<ActionResult> {
  const _id = toObjectId(id);
  if (!_id || !MESSAGE_STATUSES.has(status)) return { ok: false, error: "Invalid request." };

  return run(
    "setMessageStatus",
    async () => {
      const db = await getDb();
      const res = await db
        .collection(COLLECTIONS.contactMessages)
        .updateOne({ _id }, { $set: { status } });
      return res.matchedCount === 1;
    },
    "That message no longer exists. Refresh the page."
  );
}

export async function deleteMessage(id: string): Promise<ActionResult> {
  const _id = toObjectId(id);
  if (!_id) return { ok: false, error: "Invalid request." };

  return run(
    "deleteMessage",
    async () => {
      const db = await getDb();
      const res = await db.collection(COLLECTIONS.contactMessages).deleteOne({ _id });
      return res.deletedCount === 1;
    },
    "That message was already deleted. Refresh the page."
  );
}
