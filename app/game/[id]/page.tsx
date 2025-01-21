"use client";

import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "@/app/utils";
import { fetchGame, makeGuess } from "@/app/actions";

export default function Game() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "spectator";
  const [word, setWord] = useState<string>("");
  const [guess, setGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const game = await fetchGame(id as string);
        setWord(game.word);
        setGuesses(game.guesses);
        setIsFinished(game.finished);
      } catch (error) {
        throw new Error(`Error fetching game: ${error}`);
      }
    };

    fetchData();

    const channel = supabase
      .channel(`realtime:games:${id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "games",
          filter: `public_id=eq.${id}`,
        },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            const updatedData = payload.new;
            setGuesses(updatedData.guesses || []);
            setIsFinished(updatedData.finished || false);
            if (updatedData.finished) {
              console.log("Game finished. Removing channel...");
              supabase.removeAllChannels();
            }
          }
        }
      )
      .subscribe();

    // Cleanup the channel on unmount
    return () => {
      console.log("Cleaning up channel...");
      supabase.removeChannel(channel);
    };
  }, [id]);

  const handleGuessSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!guess || guess.trim() === "") {
      alert("Please enter a guess.");
      return;
    }

    try {
      await makeGuess(id as string, guess);
      setGuess("");
    } catch (error) {
      throw new Error(`Error making guess: ${error}`);
    }
  };

  return (
    <div className="min-h-screen p-10">
      <h1
        className="text-5xl font-bold text-gray-700 text-center"
        style={{ fontFamily: "var(--font-jersey)" }}
      >
        hints
      </h1>
      <div className="flex items-center justify-center">
        <div className="w-1/3">
          {role === "spectator" ? (
            <div>
              <p
                className="text-gray-700"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                You are a spectator. The player is currently guessing the word.
              </p>
            </div>
          ) : null}
          {/* {role === "player" && !isFinished ? (
            <form onSubmit={handleGuessSubmit} className="space-y-4">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter your guess"
                className="w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent border border-gray-300 rounded-md"
                style={{ fontFamily: "var(--font-outfit)" }}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none"
                style={{ fontFamily: "var(--font-jersey)" }}
              >
                Submit Guess
              </button>
            </form>
          ) : null} */}
          {isFinished ? (
            <p className="text-green-500 text-lg">
              The game is over! The word was <strong>{word}</strong>.
            </p>
          ) : (
            <>
              <ul className="mb-4 space-y-2">
                {guesses.map((g, index) => (
                  <li key={index} className="text-gray-700">
                    {g}
                  </li>
                ))}
              </ul>
              {role === "player" && !isFinished ? (
                <form onSubmit={handleGuessSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Enter your guess"
                    className="w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent border border-gray-300 rounded-md"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none"
                    style={{ fontFamily: "var(--font-jersey)" }}
                  >
                    Submit Guess
                  </button>
                </form>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
