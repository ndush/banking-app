import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUser } from "../utils/storage";

export default function Layout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getUser();
    setUser(u);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">

      <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex gap-4">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/receive" className="hover:underline">
            Receive
          </Link>
          <Link href="/transfer" className="hover:underline">
            Send
          </Link>
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      <main className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
