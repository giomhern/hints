"use server";

import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";

export async function createGame(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const word = new FormData(e.currentTarget).get("word") as string;
  if (!word || word.trim().length === 0) {
    throw new Error("Word is required");
  }
  const creatorId = uuid();
  await redirect(`/game/${creatorId}?word=${word}`);
}
