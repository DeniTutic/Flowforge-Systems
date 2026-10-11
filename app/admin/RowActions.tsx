"use client";

import { useState, useTransition } from "react";
import { deleteMessage, setMessageStatus, type ActionResult } from "./actions";

type Props = { id: string; done: boolean; who: string };

const buttonBase =
  "inline-flex items-center justify-center min-h-[36px] px-3.5 rounded-full text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

export default function RowActions(props: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const run = (action: () => Promise<ActionResult>) => {
    setError("");
    startTransition(async () => {
      const result = await action();
      if (!result.ok) setError(result.error);
    });
  };

  const onDelete = () => {
    if (!window.confirm(`Delete this message from ${props.who}? This cannot be undone.`)) return;
    run(() => deleteMessage(props.id));
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => run(() => setMessageStatus(props.id, props.done ? "new" : "done"))}
        className={
          props.done
            ? `${buttonBase} border border-gray-300 dark:border-gray-600 text-text dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`
            : `${buttonBase} bg-emerald-600 text-white hover:bg-emerald-700`
        }
      >
        {props.done ? "Reopen" : "Done"}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={onDelete}
        className={`${buttonBase} border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40`}
      >
        Delete
      </button>
      {pending && <span className="text-xs text-text-light dark:text-gray-400">Saving…</span>}
      {error && (
        <span role="alert" className="text-xs text-rose-700 dark:text-rose-300">
          {error}
        </span>
      )}
    </div>
  );
}
