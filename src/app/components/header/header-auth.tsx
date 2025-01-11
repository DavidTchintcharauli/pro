"use client";
import { signOutAction } from "../../actions/actions";
import { Button } from "./ui/button";
import { createClient } from "../../../utils/supabase/client";
import Link from "next/link";
import { useEffect } from "react";

export default function AuthButton({ user, setUser }) {
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [setUser, supabase]);

  const handleSignOut = async () => {
    await signOutAction();
    setUser(null); // Update user state to null on sign out
  };

  return user ? (
    <div className="flex items-center gap-4">
      {user.email}!
      <Button type="submit" variant={"outline"} onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
