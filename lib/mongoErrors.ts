import { MongoServerError } from "mongodb";

/** Maps common MongoDB driver errors to actionable UI messages. */
export function getMongoUserMessage(error: unknown): string | undefined {
  if (!(error instanceof MongoServerError)) return undefined;
  const text = `${error.errmsg ?? ""} ${error.message}`;
  if (error.code === 8000 || /bad auth|authentication failed/i.test(text)) {
    return "Database login failed. In .env.local, use your Atlas database user and password in MONGODB_URI (not your MongoDB.com sign-in). If the password has @ : / # ? encode them (e.g. @ → %40). Reset the DB user password in Atlas → Database Access if unsure.";
  }
  return undefined;
}
