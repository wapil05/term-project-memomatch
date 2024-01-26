"use client";
import Game from "@/components/Game";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { userAtom, User } from '../../state/atoms'
import { useAtom, atom } from "jotai";
import { z } from "zod";
import { useAuth0 } from "@auth0/auth0-react";


const queryParamsValidator = z.object({
  username: z.string().min(1),
});

interface GameSetup {
  username: string | null;
}

const GameSetupAtom = atom<GameSetup>({ username: null });

export default function Login() {
  const [user, setUser] = useAtom(userAtom)
  const [setup, setSetup] = useAtom(GameSetupAtom); 
  const { loginWithRedirect } = useAuth0();

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

    if (!user.name) {
      alert("Please provide a username!");
    }
    /*
        else if (!user.password) {
          alert("Please provide a password!");
        }
    */

    else {
      loginWithRedirect()
      //router.push('/api/auth/login');
      //router.push('/game')
      
    }

  };

  return (
    <section className="mydiv">
      <div className=" flex flex-col gap-5 items-center">
        <h3>Login</h3>
        <form className=" flex flex-col gap-7 items-center"
          onSubmit={handleFormSubmit}
        >
          <label htmlFor="username" hidden>
            Username
          </label>
          <input
            className="input"
            type="text"
            value={user.name || ""}
            onChange={(e) => {
              setUser({ name: e.currentTarget.value, password: user.password });
              setSetup({ username: user.name });
            }}
            name="username"
            id="username"
            placeholder="username"
          />
          {/*}
          <input
            className="input"
            type="password" // password is hidden
            value={user.password || ""}
            onChange={(e) => setUser({ name: user.name, password: e.currentTarget.value })}
            name="password"
            id="password"
            placeholder="password"
          />
          {*/}
          <button className="btn btn-wide">log in</button>
        </form>

        {/*}
        <button
          className="link"
          onClick={() => {
            router.push("/register");
          }}
        >
          or register now
        </button>
        {*/}
      </div>
    </section>
  );
}
