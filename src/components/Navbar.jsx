"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../services/authService";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return localStorage.getItem("user");
}

function getServerSnapshot() {
  return null;
}

export default function Navbar() {
  const router = useRouter();

  const storedUser = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const user = storedUser ? JSON.parse(storedUser) : null;

  function handleLogout() {
    logout();
    router.push("/login");
  }

  useEffect(() => {
    if (!storedUser) {
      return;
    }
  }, [storedUser]);

  if (!user) {
    return null;
  }

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900"
        >
          YBA Mobilindo
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900"
          >
            Dashboard
          </Link>

          <Link
            href="/car-stocks"
            className="text-gray-600 hover:text-gray-900"
          >
            Stok Mobil
          </Link>

          <span className="text-sm text-gray-600">
            {user.username}
          </span>

          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}