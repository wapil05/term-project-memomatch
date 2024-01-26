"use client";
import { atom, useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { z } from "zod";

const queryParamsValidator = z.object({
  username: z.string().min(1),
});

interface GameSetup {
  username: string | null;
}

const GameSetupAtom = atom<GameSetup>({ username: null });

export default function Login() {
  const [setup, setSetup] = useAtom(GameSetupAtom);

  const router = useRouter();

  return (
    <section className="mydiv">
      <div className=" flex flex-col gap-5 items-center">
        <h3>Login</h3>
        <a className="btn btn-wide" href="/api/auth/login?returnTo=/game">
          Login
        </a>
      </div>
    </section>
  );
}
