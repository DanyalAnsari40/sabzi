import { cookies } from "next/headers";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { getDb } from "./mongodb";

const SESSION_COOKIE = "admin_session";
const SALT_LEN = 16;
const KEY_LEN = 64;
const SESSION_TTL_SEC = 60 * 60 * 24 * 7; // 7 days
const SESSIONS_COLLECTION = "admin_sessions";

export function hashPassword(password: string): string {
  const salt = randomBytes(SALT_LEN).toString("hex");
  const hash = scryptSync(password, salt, KEY_LEN).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const computed = scryptSync(password, salt, KEY_LEN);
  const hashBuf = Buffer.from(hash, "hex");
  return timingSafeEqual(computed, hashBuf);
}

/** Create a session in DB and return the session id to put in the cookie. */
export async function createSession(userId: string, email: string): Promise<string> {
  const db = await getDb();
  const coll = db.collection<{ _id: string; userId: string; email: string; exp: number }>(SESSIONS_COLLECTION);
  // TTL index: MongoDB auto-deletes docs when exp is in the past (idempotent)
  await coll.createIndex({ exp: 1 }, { expireAfterSeconds: 0 });
  const id = randomBytes(32).toString("hex");
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SEC;
  await coll.insertOne({ _id: id, userId, email, exp });
  return id;
}

export async function getSession(): Promise<{ userId: string; email: string } | null> {
  const cookieStore = await cookies();
  const id = cookieStore.get(SESSION_COOKIE)?.value?.trim();
  if (!id) return null;
  const db = await getDb();
  const coll = db.collection<{ _id: string; userId: string; email: string; exp: number }>(SESSIONS_COLLECTION);
  const doc = await coll.findOne({ _id: id });
  if (!doc) return null;
  if (doc.exp < Math.floor(Date.now() / 1000)) {
    await coll.deleteOne({ _id: id });
    return null;
  }
  return { userId: doc.userId, email: doc.email };
}

export async function clearSession() {
  const cookieStore = await cookies();
  const id = cookieStore.get(SESSION_COOKIE)?.value?.trim();
  if (id) {
    const db = await getDb();
    await db.collection(SESSIONS_COLLECTION).deleteOne({ _id: id });
  }
  cookieStore.delete(SESSION_COOKIE);
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
export const SESSION_MAX_AGE = SESSION_TTL_SEC;
