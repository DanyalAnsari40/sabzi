import { NextResponse } from "next/server";
import { createAdminUser } from "@/lib/db-users";

const DEFAULT_EMAIL = "admin@wholegrains.com";
const DEFAULT_PASSWORD = "Admin@123";
const DEFAULT_NAME = "Admin User";

/**
 * POST /api/seed-admin – Create the default admin user if not exists.
 * Call once (e.g. after deploy) to create login credentials.
 */
export async function POST() {
  try {
    const { id } = await createAdminUser(DEFAULT_EMAIL, DEFAULT_PASSWORD, DEFAULT_NAME);
    return NextResponse.json({
      ok: true,
      message: "Admin user ready. Use the credentials below to log in.",
      credentials: {
        email: DEFAULT_EMAIL,
        password: DEFAULT_PASSWORD,
      },
      userId: id,
    });
  } catch (error) {
    console.error("Seed admin error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Seed failed" },
      { status: 500 }
    );
  }
}
