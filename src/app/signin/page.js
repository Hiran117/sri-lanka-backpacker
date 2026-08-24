"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="mr-2">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

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

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full flex items-center justify-center bg-white border border-ink/15 rounded-lg p-3 text-sm font-medium hover:bg-ink/5 transition-colors mb-5"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="flex items-center gap-3 mb-5">
        <span className="flex-1 h-px bg-ink/10" />
        <span className="text-xs text-ink/40 font-mono">or with email</span>
        <span className="flex-1 h-px bg-ink/10" />
      </div>

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
        {error && <p className="text-rust text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-jungle text-parchment rounded-lg p-3 text-sm font-medium hover:bg-jungle/90 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="text-sm text-ink/60 mt-4 text-center">
        No account?{" "}
        <Link href="/signup" className="text-jungle hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
