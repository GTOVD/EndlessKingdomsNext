"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export function ClientNavBar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Endless Kingdoms
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/play" className="text-gray-300 hover:text-white transition-colors">
            Play
          </Link>
          <Link href="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
            Leaderboard
          </Link>
          {status === "loading" ? (
            <span className="text-gray-300">Loading...</span>
          ) : session ? (
            <button
              onClick={() => void signOut()}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => void signIn()}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}