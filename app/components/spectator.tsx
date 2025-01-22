"use client";
import { useGame } from "../hooks/use-game";

interface SpectatorProps {
  gameId: string;
}

const Spectator = ({ gameId }: SpectatorProps) => {
  const { word, guesses } = useGame(gameId);

  const guessedLetters = guesses.join("").toLowerCase();

  return (
    <div className="w-full px-10 max-w-5xl mx-auto space-y-10">
      <div className="px-5">
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
        <p
          className="text-gray-700 text-center mb-4 font-semibold text-xl"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          You are a spectator. Watch as the player tries to guess your word:{" "}
          {word}
        </p>
      </div>
    </div>
  );
};

export default Spectator;
