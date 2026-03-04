import { NextResponse } from "next/server";
import { findAdminByEmail } from "@/lib/db-users";
import { verifyPassword, createSession, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth";

function setSessionCookie(response: NextResponse, sessionId: string): void {
  response.cookies.set(SESSION_COOKIE_NAME, sessionId, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
}

function baseUrl(request: Request): string {
  return request.url.replace(/\/api\/auth\/login$/, "");
}

async function getEmailPassword(request: Request): Promise<{ email: string; password: string }> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData();
    const email = (form.get("email") ?? "").toString().trim();
    const password = (form.get("password") ?? "").toString();
    return { email, password };
  }
  const body = await request.json();
  return {
    email: typeof body.email === "string" ? body.email.trim() : "",
    password: typeof body.password === "string" ? body.password : "",
  };
}

export async function POST(request: Request) {
  const isForm = request.headers.get("content-type")?.includes("application/x-www-form-urlencoded");
  try {
    const { email, password } = await getEmailPassword(request);

    if (!email || !password) {
      if (isForm) {
        return NextResponse.redirect(`${baseUrl(request)}/login?error=required`, 302);
      }
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await findAdminByEmail(email);
    if (!user) {
      if (isForm) {
        return NextResponse.redirect(`${baseUrl(request)}/login?error=invalid`, 302);
      }
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = verifyPassword(password, user.passwordHash);
    if (!valid) {
      if (isForm) {
        return NextResponse.redirect(`${baseUrl(request)}/login?error=invalid`, 302);
      }
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const userId = String(user._id);
    const sessionId = await createSession(userId, user.email);

    if (isForm) {
      const res = NextResponse.redirect(new URL("/", request.url));
      setSessionCookie(res, sessionId);
      return res;
    }

    const response = NextResponse.json({
      success: true,
      user: { email: user.email, name: user.name },
    });
    setSessionCookie(response, sessionId);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    if (isForm) {
      return NextResponse.redirect(`${baseUrl(request)}/login?error=server`, 302);
    }
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
