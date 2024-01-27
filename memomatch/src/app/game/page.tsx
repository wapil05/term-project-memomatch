"use client";

import Game from "@/components/Game";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function MyGame() {
  const { user, error, isLoading } = useUser();

  if (isLoading || user === undefined) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <Game roomId={"my-room"} username={user.nickname ?? "Anonymous"}></Game>
      </div>
    )
  );
});
