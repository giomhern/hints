"use server";

import { supabase } from "./utils";

export async function createGame(word: string) {
  if (!word || word.trim() === "") {
    throw new Error("Please enter a word or phrase.");
  }

  try {
    const { data, error } = await supabase
      .from("games")
      .insert({ word: word })
      .select("public_id")
      .single();

    if (error) {
      throw new Error(`Error inserting game: ${error.message}`);
    }

    console.log("Redirecting to:", `/game/${data.public_id}`);
    return data 
  } catch (error) {
    throw new Error(`Error creating game: ${error}`);
  }
}


