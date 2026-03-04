import { getDb } from "./mongodb";
import { hashPassword } from "./auth";

export const USERS_COLLECTION = "users";

export interface AdminUserDoc {
  _id?: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "admin";
  createdAt: Date;
  updatedAt: Date;
}

export async function findAdminByEmail(email: string): Promise<AdminUserDoc | null> {
  const db = await getDb();
  const user = await db.collection<AdminUserDoc>(USERS_COLLECTION).findOne({
    email: email.trim().toLowerCase(),
    role: "admin",
  });
  return user;
}

export async function createAdminUser(
  email: string,
  password: string,
  name: string
): Promise<{ id: string }> {
  const db = await getDb();
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await findAdminByEmail(normalizedEmail);
  if (existing) {
    return { id: String(existing._id) };
  }
  const now = new Date();
  const doc: Omit<AdminUserDoc, "_id"> = {
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    name,
    role: "admin",
    createdAt: now,
    updatedAt: now,
  };
  const result = await db.collection<AdminUserDoc>(USERS_COLLECTION).insertOne(doc as AdminUserDoc);
  return { id: String(result.insertedId) };
}
