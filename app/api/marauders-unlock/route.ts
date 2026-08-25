import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DEV_PASSPHRASE = "mischief is managed";
const COOKIE_NAME = "marauders-unlocked";

export async function POST(request: Request) {
  const configuredPassphrase = process.env.MARAUDERS_PASSWORD;
  const passphrase =
    configuredPassphrase ??
    (process.env.NODE_ENV === "production" ? undefined : DEV_PASSPHRASE);

  if (!passphrase) {
    return NextResponse.json(
      { ok: false, error: "Unlock is not configured." },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const submitted = typeof body?.password === "string" ? body.password : "";

  if (submitted.trim().toLowerCase() !== passphrase.trim().toLowerCase()) {
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
