import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { findAdminByEmail } from "@/lib/db-users";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null });
  }
  const user = await findAdminByEmail(session.email);
  if (!user) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({
    user: { email: user.email, name: user.name },
  });
}
