"use server";
import { supabase } from "@/lib/supabase";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function togglePlace(destinationSlug, placeName, checked) {
  const session = await auth();
  if (!session?.user?.email) return { error: "Not signed in" };

  await supabase.from("checkins").upsert(
    {
      user_email: session.user.email,
      destination_slug: destinationSlug,
      place_name: placeName,
      checked,
    },
    { onConflict: "user_email,destination_slug,place_name" }
  );

  revalidatePath(`/destinations/${destinationSlug}`);
}

export async function markVisited(destinationSlug) {
  const session = await auth();
  if (!session?.user?.email) return { error: "Not signed in" };

  await supabase.from("visits").upsert(
    { user_email: session.user.email, destination_slug: destinationSlug },
    { onConflict: "user_email,destination_slug" }
  );

  revalidatePath(`/destinations/${destinationSlug}`);
}

export async function submitReview(destinationSlug, content) {
  const session = await auth();
  if (!session?.user?.email) return { error: "Not signed in" };
  if (!content?.trim()) return { error: "Empty review" };

  await supabase.from("reviews").insert({
    user_email: session.user.email,
    user_name: session.user.name,
    destination_slug: destinationSlug,
    content: content.trim(),
  });

  revalidatePath(`/destinations/${destinationSlug}`);
}