"use client";

import { useState } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

export function PlayPageContent() {
  const { data: session, status } = useSession();
  const [score, setScore] = useState(0);
  const submitScore = api.game.submitScore.useMutation();

  const handlePlayClick = () => {
    const newScore = Math.floor(Math.random() * 1000);
    setScore(newScore);
  };

  const handleSubmitScore = async () => {
    try {
      console.log("Submitting score:", score);
      const result = await submitScore.mutateAsync({ score });
      console.log("Mutation result:", result);
      alert("Score submitted successfully!");
      setScore(0);
    } catch (error) {
      console.error("Error submitting score:", error);
      alert(`Error submitting score: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  if (status === "loading") {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div className="text-center text-white">Please log in to play and submit scores.</div>;
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Play Game</h1>
      <div className="flex flex-col items-center space-y-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors"
          onClick={handlePlayClick}
        >
          Play
        </button>
        <p className="text-xl text-gray-300">Your score: {score}</p>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmitScore}
          disabled={score === 0 || submitScore.isPending}
        >
          {submitScore.isPending ? "Submitting..." : "Submit Score"}
        </button>
      </div>
    </div>
  );
}