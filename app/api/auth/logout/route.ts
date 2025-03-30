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

    const response = NextResponse.json(
      { message: "Logged out" },
      { status: 200 }
    );
    response.headers.set(
      "Set-Cookie",
      "session_token=; Path=/; Max-Age=0; HttpOnly"
    );

    return response;
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
  }
}
