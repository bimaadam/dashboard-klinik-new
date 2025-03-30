import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function getSessionUser() {
  const sessionToken = cookies().get("session_token")?.value;
  if (!sessionToken) return null;

  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true },
  });

  return session?.user || null;
}
