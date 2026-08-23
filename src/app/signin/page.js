"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SigninPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="font-display font-bold text-2xl mb-6">Sign in</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-ink/10 rounded-lg p-3 text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border border-ink/10 rounded-lg p-3 text-sm"
        />
        {error && <p className="text-terracotta text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-tea text-cream rounded-lg p-3 text-sm font-medium hover:bg-tea/90 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <button
        onClick={() => signIn("google")}
        className="w-full border border-ink/10 rounded-lg p-3 text-sm font-medium hover:bg-ink/5"
      >
        Continue with Google
      </button>

      <p className="text-sm text-ink/60 mt-4 text-center">
        No account?{" "}
        <Link href="/signup" className="text-tea hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}