"use client";
import Game from "@/components/Game";
import { useParams } from "next/navigation";
import { userAtom } from '../../../state/atoms'
import { useAtom } from "jotai";

export default function MyGame() {
  const [user, setUser] = useAtom(userAtom);
  //const params = useParams<{ username: string }>();

  return (
    <div>
      <Game roomId={"my-room"} username={user.name ?? 'Anonymous'}></Game>
    </div>
  );
}
