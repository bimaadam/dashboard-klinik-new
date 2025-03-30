import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const runtime = "edge"; // Tambahin ini

export async function POST() {
  const token = cookies().get("session_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No session found" }, { status: 401 });
  }

  await prisma.session.deleteMany({ where: { token } });

  const response = NextResponse.redirect("/auth/login");

  response.headers.set(
    "Set-Cookie",
    "session_token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict"
  );

  return response;
}
