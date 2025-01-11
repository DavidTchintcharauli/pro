import { createClient } from "./supaBase/server";

const supabase = createClient();

export async function getUserIdFromSupabase(): Promise<string | null> {
  try {
    const {
      data: { user },
      error,
    } = await (await supabase).auth.getUser();

    if (error) {
      // console.error("Error fetching user from Supabase auth:", error);
      return null;
    }

    if (!user) {
      console.warn("No user logged in. Supabase auth returned null.");
      return null;
    }

    return user.id;
  } catch (unexpectedError) {
    console.error(
      "Unexpected error fetching user ID from Supabase:",
      unexpectedError
    );
    return null;
  }
}
