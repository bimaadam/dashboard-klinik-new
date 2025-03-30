import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
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
}
