"use client";
import Game from "@/components/Game";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { usernameAtom } from '../../state/atoms'
import { useAtom } from "jotai";
import { z } from "zod";

const queryParamsValidator = z.object({
  username: z.string().min(1),
});

interface GameSetup {
  username: string | null;
}

export default function Login() {
  const [username, setUsername] = useAtom(usernameAtom)
  const [setup, setSetup] = useState<GameSetup>({
    username: username,
  });

  const router = useRouter();
  const query = useSearchParams();

  useEffect(() => {
    if (router) {
      const parsed = queryParamsValidator.safeParse(query);
      if (parsed.success) {
        setSetup(() => ({
          username: parsed.data.username,
        }));
      }
    }
  }, [router, setSetup, query]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!setup.username) {
      alert("Please provide a username");
    } else {
      router.push(`/game/${setup.username}`);
    }
  };

  return (
    <section className="mydiv">
      <div className=" flex flex-col gap-5 items-center">
        <h3>Login</h3>
        <form className=" flex flex-col gap-5 items-center"
          onSubmit={handleFormSubmit}
        >
          <label htmlFor="username" hidden>
            Username
          </label>
          <input
            className="input"
            type="text"
            value={setup.username || ""}
            onChange={(e) => setSetup({ username: e.currentTarget.value })}
            name="username"
            id="username"
            placeholder="username"
          />
          <input
            className="input"
            type="text"
            value={setup.username || ""}
            onChange={(e) => setSetup({ username: e.currentTarget.value })}
            name="password"
            id="password"
            placeholder="password"
          />

          <button className="btn btn-wide">log in</button>
        </form>
        <button
          className="link"
          onClick={() => {
            router.push("/register");
          }}
        >
          or register now
        </button>
      </div>
    </section>
  );
}
