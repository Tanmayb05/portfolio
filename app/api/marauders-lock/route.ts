import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = "marauders-unlocked";

export async function POST() {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });

  return NextResponse.json({ ok: true });
}
