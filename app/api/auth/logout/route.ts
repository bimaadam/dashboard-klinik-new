import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const token = cookies().get("session_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No session found" }, { status: 401 });
  }

  try {
    await prisma.session.deleteMany({ where: { token } });
    cookies().delete("session_token");

    return NextResponse.json({ message: "Logged out" }, { status: 200 });
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
  }
}
