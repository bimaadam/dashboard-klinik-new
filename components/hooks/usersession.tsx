"use client";

import { useEffect, useState } from "react";

interface SessionData {
  nama: string;
  // tambahin properti lain kalau ada, misal: email, role, dll
}

export default function useUserSession() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true); // opsional, buat ngatur loading state
  const [error, setError] = useState<string | null>(null); // opsional, kalau error

  useEffect(() => {
    const getSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        if (!res.ok) throw new Error("Failed to fetch session");

        const data: SessionData = await res.json();
        setSession(data);
      } catch (err) {
        setError((err as Error).message);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  return { session, loading, error };
}
