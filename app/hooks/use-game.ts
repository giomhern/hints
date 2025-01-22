"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/app/utils"
import { fetchGame } from "@/app/actions"

export function useGame(gameId: string) {
  const [word, setWord] = useState<string>("")
  const [guesses, setGuesses] = useState<string[]>([])
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const game = await fetchGame(gameId)
        setWord(game.word)
        setGuesses(game.guesses)
        setIsFinished(game.finished)
      } catch (error) {
        setError(`Error fetching game: ${error}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    const channel = supabase
      .channel(`realtime:games:${gameId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "games",
          filter: `public_id=eq.${gameId}`,
        },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            const updatedData = payload.new
            setGuesses(updatedData.guesses || [])
            setIsFinished(updatedData.finished || false)
            if (updatedData.finished) {
              console.log("Game finished. Removing channel...")
              supabase.removeAllChannels()
            }
          }
        },
      )
      .subscribe()

    return () => {
      console.log("Cleaning up channel...")
      supabase.removeChannel(channel)
    }
  }, [gameId])

  return { word, guesses, isFinished, isLoading, error }
}

