import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma"; // Pastikan import ini benar!

export const runtime = "nodejs"; // Pakai Node.js, bukan Edge

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password harus diisi" },
        { status: 400 }
      );
    }

    // Cek user di database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    // Buat session token
    const token = randomUUID();

    // Hapus session lama
    await prisma.session.deleteMany({ where: { userId: user.id } });

    // Simpan session baru
    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // Expired 1 hari
      },
    });

    // Response dengan Set-Cookie
    const response = NextResponse.json({ message: "Login berhasil!", token });
    response.headers.set(
      "Set-Cookie",
      `session_token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}`
    );

    return response;
  } catch (error) {
    console.error("Error di API login:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
