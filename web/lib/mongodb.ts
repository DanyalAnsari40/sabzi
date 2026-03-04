import { MongoClient, Db } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please add MONGODB_URI to your .env.local. Example: mongodb+srv://user:pass@cluster0.xxx.mongodb.net/?appName=Cluster0"
  );
}

const uri = process.env.MONGODB_URI;
const options = {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri, options).connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri, options).connect();
}

/**
 * Get the MongoDB client (cached in dev to survive HMR).
 */
export async function getClient(): Promise<MongoClient> {
  return clientPromise;
}

const DB_NAME = process.env.MONGODB_DB_NAME || "sabzi";

/**
 * Get the default database. Use this in API routes or server components.
 */
export async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db(DB_NAME);
}
