import { COLLECTIONS, getDb } from "@/lib/mongodb";
import { BUDGETS, PROJECT_TYPES, labelFor } from "@/lib/contactOptions";

type Subscriber = {
  email: string;
  subscribedAt?: Date;
  source?: string;
};

type ContactMessage = {
  name: string;
  email: string;
  message: string;
  company?: string;
  projectType?: string;
  budget?: string;
  status?: string;
  createdAt?: Date;
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const db = await getDb();

  const [subscribers, messages] = await Promise.all([
    db
      .collection<Subscriber>(COLLECTIONS.newsletterSubscribers)
      .find({}, { projection: { _id: 0 } })
      .sort({ subscribedAt: -1 })
      .limit(100)
      .toArray(),
    db
      .collection<ContactMessage>(COLLECTIONS.contactMessages)
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray(),
  ]);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-text dark:text-white">
              Admin inbox
            </h1>
            <p className="mt-2 text-text-light dark:text-gray-400">
              Latest newsletter subscribers and contact messages.
            </p>
          </div>
          <div className="text-sm text-text-light dark:text-gray-400">
            <div>
              DB: <span className="font-medium text-text dark:text-white">{db.databaseName}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-text dark:text-white">
                Newsletter subscribers
              </h2>
              <p className="text-sm text-text-light dark:text-gray-400 mt-1">
                Collection: <span className="font-mono">{COLLECTIONS.newsletterSubscribers}</span>
              </p>
            </div>
            <div className="p-6">
              {subscribers.length === 0 ? (
                <p className="text-text-light dark:text-gray-400">No subscribers yet.</p>
              ) : (
                <ul className="space-y-3">
                  {subscribers.map((s, i) => (
                    <li
                      key={`${s.email}-${i}`}
                      className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/30 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <div className="font-medium text-text dark:text-white break-all">
                          {s.email}
                        </div>
                        <div className="text-xs text-text-light dark:text-gray-400 mt-1">
                          {s.source ? `source: ${s.source}` : "source: unknown"}
                        </div>
                      </div>
                      <div className="text-xs text-text-light dark:text-gray-400 shrink-0">
                        {s.subscribedAt ? new Date(s.subscribedAt).toLocaleString() : ""}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-text dark:text-white">
                Contact messages
              </h2>
              <p className="text-sm text-text-light dark:text-gray-400 mt-1">
                Collection: <span className="font-mono">{COLLECTIONS.contactMessages}</span>
              </p>
            </div>
            <div className="p-6">
              {messages.length === 0 ? (
                <p className="text-text-light dark:text-gray-400">No messages yet.</p>
              ) : (
                <ul className="space-y-4">
                  {messages.map((m, i) => (
                    <li
                      key={`${m.email}-${i}`}
                      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/30 px-4 py-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-semibold text-text dark:text-white">
                            {m.name}
                          </div>
                          <div className="text-sm text-text-light dark:text-gray-400 break-all">
                            {m.email}
                            {m.company ? ` · ${m.company}` : ""}
                          </div>
                          {(m.projectType || m.budget) && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {m.projectType && (
                                <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                                  {labelFor(PROJECT_TYPES, m.projectType) ?? m.projectType}
                                </span>
                              )}
                              {m.budget && (
                                <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                                  {labelFor(BUDGETS, m.budget) ?? m.budget}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-text-light dark:text-gray-400">
                          <span className="px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                            {m.status || "new"}
                          </span>
                          <span>
                            {m.createdAt ? new Date(m.createdAt).toLocaleString() : ""}
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-text dark:text-gray-200 whitespace-pre-wrap">
                        {m.message}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
