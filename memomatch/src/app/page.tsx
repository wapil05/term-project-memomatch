"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useAtom, atom } from "jotai";
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
  //const query = useSearchParams();

  /*
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
*/

  return (
    <section className="mydiv">
      <div className=" flex flex-col m-atuo gap-7 items-center">
        <h3>Login</h3>
        <a className="btn btn-wide" href="/api/auth/login?returnTo=/game">
          Login
        </a>
      </div>
    </section>
  );
}
