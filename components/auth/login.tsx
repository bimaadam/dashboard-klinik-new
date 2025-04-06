"use client";

import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";

export const Login = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // 💫 Tambah loading state

  const initialValues: LoginFormType = {
    email: "",
    password: "",
  };

  const handleLogin = async (values: LoginFormType) => {
    setError(null);
    setLoading(true); // 😼 Set loading on

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error);
        setLoading(false); // 🚫 Jangan lupa matikan loading
        return;
      }

      const data = await res.json();
      console.log("Login berhasil:", data);

      router.replace("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan, coba lagi.");
      setLoading(false); // ⛔ Matikan loading kalau error
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-[25px] font-bold mb-6">Login</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleLogin}>
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <div className="flex flex-col w-1/2 gap-4">
            <Input
              variant="bordered"
              label="Email"
              type="email"
              value={values.email}
              isInvalid={!!errors.email && !!touched.email}
              errorMessage={errors.email}
              onChange={handleChange("email")}
            />
            <Input
              variant="bordered"
              label="Password"
              type="password"
              value={values.password}
              isInvalid={!!errors.password && !!touched.password}
              errorMessage={errors.password}
              onChange={handleChange("password")}
            />
            <Button
              isDisabled={loading}
              isLoading={loading}
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        )}
      </Formik>

      <div className="font-light text-slate-400 mt-4 text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-bold">
          Register here
        </Link>
      </div>
    </div>
  );
};
