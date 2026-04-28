import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('Missing MONGODB_URI. Add it to .env.local (see .env.example).');
  }
  if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(uri, {
      // Vercel + Atlas can intermittently fail TLS handshakes over IPv6 paths.
      // Forcing IPv4 stabilizes connections for many serverless deployments.
      family: 4,
      maxPoolSize: 5,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    globalForMongo._mongoClientPromise = client.connect();
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  const dbName = process.env.MONGODB_DB || "apex";
  return client.db(dbName);
}

export const COLLECTIONS = {
  newsletterSubscribers: "newsletter_subscribers",
  contactMessages: "contact_messages",
  payments: "payments",
} as const;
