import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const PASSPHRASE = (process.env.MARAUDERS_PASSWORD ?? "mischief is managed")
  .trim()
  .toLowerCase();
const COOKIE_NAME = "marauders-unlocked";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const submitted = typeof body?.password === "string" ? body.password : "";

  if (submitted.trim().toLowerCase() !== PASSPHRASE) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  cookies().set(COOKIE_NAME, "true", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365
  });

  return NextResponse.json({ ok: true });
}
