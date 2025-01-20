"use server";
import { supabase } from "./utils";

export async function createGame(word: string) {
  if (!word || word.trim() === "") {
    throw new Error("Please enter a word or phrase.");
  }

  try {
    const { data, error } = await supabase
      .from("games")
      .insert({ word: word.toUpperCase() })
      .select("public_id")
      .single();

    if (error) {
      throw new Error(`Error inserting game: ${error.message}`);
    }

    console.log("Redirecting to:", `/game/${data.public_id}`);
    return data;
  } catch (error) {
    throw new Error(`Error creating game: ${error}`);
  }
}

export async function fetchGame(publicId: string) {
  try {
    const { data, error } = await supabase
      .from("games")
      .select("words, guesses, finished")
      .eq("public_id", publicId)
      .single();

    if (error) {
      throw new Error(`Error fetching game: ${error.message}`);
    }
    return data;
  } catch (error) {
    throw new Error(`Error fetching game: ${error}`);
  }
}

export async function makeGuess(publicId: string, guess: string) {
  try {
    const { data, error } = await supabase
      .from("games")
      .select("guesses, word,finished")
      .eq("public_id", publicId)
      .single();

    if (error) {
      throw new Error(`Error fetching game: ${error.message}`);
    }

    const isCorrect = data.word.toUpperCase() === guess.toUpperCase();

    const { error: updateError } = await supabase.from("games").update({
      guesses: [...data.guesses, guess],
      finished: isCorrect,
    });

    if (updateError) {
      throw new Error(`Error updating game: ${updateError.message}`);
    }

    return { isCorrect, guesses: [...data.guesses, guess] };
  } catch (error) {
    throw new Error(`Error making guess: ${error}`);
  }
}
