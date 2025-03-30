import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function GET() {
  // Skip kalau build di Vercel
  if (
    process.env.NODE_ENV === "production" &&
    !cookies().get("session_token")
  ) {
    return NextResponse.json({ error: "Skip API saat build" }, { status: 200 });
  }

  try {
    const sessionToken = cookies().get("session_token")?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }

    const session = await prisma.session.findFirst({
      where: { token: sessionToken },
      include: { user: true },
    });

    if (!session) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: session.user.id,
        email: session.user.email,
        nama: session.user.nama, // Sesuaikan dengan database
      },
    });
  } catch (error) {
    console.error("Error di API session:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
