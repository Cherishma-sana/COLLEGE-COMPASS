"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    setLoggedIn(!!token);

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.name || "");
      } catch {
        setUserName("");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setLoggedIn(false);
    setUserName("");

    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-blue-700"
        >
          College Compass
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </Link>

          <Link
            href="/colleges"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Colleges
          </Link>

          <Link
            href="/compare"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Compare
          </Link>

          {loggedIn && (
            <Link
              href="/saved-colleges"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              ❤️ Saved
            </Link>
          )}

          {!loggedIn ? (
            <>
              <Link
                href="/login"
                className="text-blue-600 font-semibold"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">
                Hi, {userName}
              </span>

              <button
                onClick={handleLogout}
                className="border border-red-300 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}