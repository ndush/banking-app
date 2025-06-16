
import { useState } from "react";
import { useRouter } from "next/router";
import { getUsers, setUser } from "../utils/storage";
import Link from "next/link";


export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const user = getUsers().find((u) => u.email === email);
    if (!user) return alert("User not found. Please sign up first.");
    setUser(user);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <input
        className="border p-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleLogin}
      >
        Login
      </button>
      <p>
        Don’t have an account?{" "}
        <Link href="/signup" className="text-blue-600 underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
