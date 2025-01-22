"use client";

import { useParams, useSearchParams } from "next/navigation";
import Player from "@/app/components/player";
import Spectator from "@/app/components/spectator";

export default function Game() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "spectator";

  return (
    <div>
      {role === "player" ? (
        <Player gameId={id as string} />
      ) : (
        <Spectator gameId={id as string} />
      )}
    </div>
  );
}
