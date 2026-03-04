import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

/**
 * GET /api/db – Check MongoDB connection (ready to use).
 */
export async function GET() {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    return NextResponse.json({
      ok: true,
      db: "connected",
      database: db.databaseName,
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      {
        ok: false,
        db: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
