"use client";

import { useAuth } from "@/hooks/useAuth";
import { getSession } from "@/libs/authen";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Home() {
  const auth = useAuth();
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/logout");
      router.replace("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <h1>Public Home Page</h1>
      <header>
        <button onClick={logout}>Logout</button>
        <nav>
          {auth ? (
            <p>
              logged in <Link href="/profile">Profile</Link>
            </p>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </nav>
      </header>
    </>
  );
}
