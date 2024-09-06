"use client";

import { api } from "~/utils/api";

export function LeaderboardContent() {
  const { data: leaderboard, isLoading } = api.game.getLeaderboard.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Leaderboard</h1>
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="text-left py-2">Rank</th>
            <th className="text-left py-2">Player</th>
            <th className="text-left py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard?.map((entry, index) => (
            <tr key={entry.id} className="border-b border-gray-700">
              <td className="py-2 text-gray-300">{index + 1}</td>
              <td className="py-2 text-white">{entry.playerName}</td>
              <td className="py-2 text-gray-300">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}