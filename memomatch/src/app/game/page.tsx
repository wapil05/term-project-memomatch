"use client";
import Game from "@/components/Game";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function MyGame() {
  const { user, error, isLoading } = useUser();

  if (isLoading || user === undefined) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <Game roomId={"my-room"} username={user.name ?? "Anonymous"}></Game>
    </div>
  );
}
