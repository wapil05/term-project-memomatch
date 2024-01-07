"use client";

import Game from "@/components/Game";
import { useParams } from "next/navigation";

export default function MyGame() {
  const params = useParams<{ username: string }>();
  return (
    <div>
      <Game roomId={"my-room"} username={params.username}></Game>
    </div>
  );
}
