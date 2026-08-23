import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function AuthButton() {
  const session = await auth();

  if (session) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="text-sm font-medium text-terracotta hover:underline">
          Sign out
        </button>
      </form>
    );
  }

  return (
    <Link href="/signin" className="text-sm font-medium text-tea hover:underline">
      Sign in
    </Link>
  );
}