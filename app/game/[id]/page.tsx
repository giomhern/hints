"use client";


import { useParams } from "next/navigation";

export default function Game() {
  const { id } = useParams();
  return <div>Game: {id}</div>;
}
