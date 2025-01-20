"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const WordForm = () => {
  const [word, setWord] = useState("");
  const router = useRouter();

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="word"
          className="block text-lg font-bold text-gray-700"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Enter a word or phrase:
        </label>
        <input
          type="text"
          id="word"
          className="w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent border border-gray-300 rounded-md"
          value={word}
          style={{ fontFamily: "var(--font-outfit)" }}
          onChange={(e) => setWord(e.target.value)}
          placeholder="e.g. hello world"
        />
      </div>
      <button
        type="submit"
        style={{ fontFamily: "var(--font-jersey)" }}
        className="px-4 py-2 bg-gray-800 text-white text-lg rounded hover:bg-gray-700 focus:outline-none"
      >
        Create Game
      </button>
    </form>
  );
};

export default WordForm;
