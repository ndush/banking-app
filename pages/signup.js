import { useState } from "react";
import { useRouter } from "next/router";
import { getUsers, addUser, setUser } from "../utils/storage";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      alert("Email is required");
      return;
    }

    const existing = getUsers().find((u) => u.email === trimmedEmail);
    if (existing) {
      alert("User already exists");
      return;
    }

    const newUser = { email: trimmedEmail, balance: 5000 };
    addUser(newUser);
    setUser(newUser);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <input
        className="border p-2 w-64"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 w-64"
        onClick={handleSignup}
      >
        Sign Up
      </button>
      <p>
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
}
