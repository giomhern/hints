"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const WordForm = () => {
  const [word, setWord] = useState("");
  const router = useRouter();

  return (
    <form className="space-y-4">
      <div>
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
          className="w-full p-2"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
      </div>
    </form>
  );
};

export default WordForm;
