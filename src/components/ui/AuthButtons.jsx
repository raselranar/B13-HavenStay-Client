"use client";
import { Button } from "./button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function AuthButtons({ session }) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.info("Logged out successfully");
          router.push("/login");
        },
      },
    });
  };

  return (
    <div className="flex items-center gap-4">
      {!session ? (
        <>
          <Button variant="outline" size="lg" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="lg" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </>
      ) : (
        <Button
          type="submit"
          onClick={handleLogout}
          size="lg"
          variant="destructive">
          Logout
        </Button>
      )}
    </div>
  );
}
