import Link from "next/link";

export function NavBar() {
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
        </div>
      </div>
    </nav>
  );
}