"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { signUp } from "./actions";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signUp(form.email, form.password, form.name);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    await signIn("credentials", { email: form.email, password: form.password, redirect: false });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="font-display font-bold text-2xl mb-6">Create your account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-ink/10 rounded-lg p-3 text-sm"
        />
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
          minLength={6}
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
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full border border-ink/10 rounded-lg p-3 text-sm font-medium hover:bg-ink/5"
      >
        Continue with Google
      </button>

      <p className="text-sm text-ink/60 mt-4 text-center">
        Already have an account?{" "}
        <Link href="/signin" className="text-tea hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}