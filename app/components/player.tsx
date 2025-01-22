"use client";
import { useState } from "react";
import { makeGuess } from "../actions";
import { useGame } from "../hooks/use-game";

interface PlayerProps {
  gameId: string;
}

const Player = ({ gameId }: PlayerProps) => {
  const { word, guesses, isFinished, isLoading, error } = useGame(gameId);
  const [guess, setGuess] = useState<string>("");
  const [submitError, setSubmitError] = useState<string | null>("");

  const handleGuessSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!guess || guess.trim() === "") {
      setSubmitError("Please enter a guess.");
      return;
    }

    try {
      await makeGuess(gameId, guess);
      setGuess("");
    } catch (error) {
      setSubmitError(`Error making guess: ${error}`);
    }
  };

  const guessedLetters = guesses.join("").toLowerCase();

  return (
    <div className="w-full px-10 max-w-5xl mx-auto space-y-4">
      <div className="flex flex-wrap justify-center gap-7 mb-4">
        {word.split(" ").map((wordPart, wordIndex) => (
          <div key={wordIndex} className="flex gap-2">
            {wordPart.split("").map((letter, letterIndex) => (
              <div
                key={`${wordIndex}-${letterIndex}`}
                className={`w-12 h-16 flex items-center justify-center text-2xl font-bold rounded-md ${
                  guessedLetters.includes(letter.toLowerCase())
                    ? "bg-green-500 text-white"
                    : "bg-gray-800"
                }`}
                style={{ fontFamily: "var(--font-jersey)" }}
              >
                {guessedLetters.includes(letter.toLowerCase()) ? letter : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      {isFinished ? (
        <div className="text-center">
          <p
            className="text-gray-800 text-lg"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Congrats! You guessed it baby! And so will you? hehe (p.s I love you)
          </p>
        </div>
      ) : (
        <div className="px-5">
          <form onSubmit={handleGuessSubmit} className="space-y-4">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value.toLowerCase())}
              // maxLength={1}
              placeholder="Enter a word, a phrase, or even a letter"
              className="w-full py-2 px-4 text-center text-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent border border-gray-300 rounded-md"
              style={{ fontFamily: "var(--font-outfit)" }}
            />
            {submitError && (
              <p
                className="text-red-500 text-sm text-center"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {submitError}
              </p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gray-800 text-white text-xl rounded-md hover:bg-gray-700 focus:outline-none transition-colors"
              style={{ fontFamily: "var(--font-jersey)" }}
            >
              Guess phrase or word
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Player;
