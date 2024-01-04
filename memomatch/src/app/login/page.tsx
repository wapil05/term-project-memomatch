"use client";
import Game from "@/components/Game";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const queryParamsValidator = z.object({
  username: z.string().min(1),
});

interface GameSetup {
  username: string | null;
}

export default function Login() {
  const [setup, setSetup] = useState<GameSetup>({
    username: null,
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
      <form
        className=" flex flex-col gap-2 items-center"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="username" hidden>
          Username
        </label>
        <input
          className="input w-[529px]"
          type="text"
          value={setup.username || ""}
          onChange={(e) => setSetup({ username: e.currentTarget.value })}
          name="username"
          id="username"
          placeholder="username"
        />

        <button className="btn w-[222px]">log in</button>
      </form>
    </section>
  );
}
