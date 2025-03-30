import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // Pakai Node.js, bukan Edge

export async function POST(req: NextRequest) {
  try {
    // Parsing request body
    const { email, password } = await req.json();

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password harus diisi" },
        { status: 400 }
      );
    }

    console.log("Email:", email);
    console.log("Password:", password);

    // Cek user di database
    const user = await prisma.user.findUnique({ where: { email } });

    console.log("User dari DB:", user);

    // Cek apakah user ada dan password cocok (TANPA bcryptjs)
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    // Generate token session
    const token = randomUUID();

    // Hapus session lama sebelum buat yang baru
    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    // Buat session baru
    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 hari
      },
    });

    // Set cookie session
    cookies().set("session_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari
    });

    return NextResponse.json({ message: "Login berhasil!", token });
  } catch (error) {
    console.error("Error di API login:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
