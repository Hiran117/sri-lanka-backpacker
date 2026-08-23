"use server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

export async function signUp(email, password, name) {
  if (!email || !password) return { error: "Email and password required" };

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) return { error: "Account already exists — try signing in instead" };

  const password_hash = await bcrypt.hash(password, 10);

  const { error } = await supabase.from("users").insert({
    email,
    password_hash,
    name: name || email.split("@")[0],
  });

if (error) {
  console.error("Signup error:", error);
  return { error: error.message };
}
  return { success: true };
}