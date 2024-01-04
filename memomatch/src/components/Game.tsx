"use client";
import { useState } from "react";
import { useGameRoom } from "@/hooks/useGameRoom";
import { useRouter } from "next/navigation";

interface GameProps {
  username: string;
  roomId: string;
}

const Game = ({ username, roomId }: GameProps) => {
  const { gameState, dispatch } = useGameRoom(username, roomId);
  const [showSettings, setShowSettings] = useState(true);

  const router = useRouter();

  // Local state to use for the UI
  const [guess, setGuess] = useState<number>(0);

  // Indicated that the game is loading
  if (gameState === null) {
    return (
      <p>
        <span className="transition-all w-fit inline-block mr-4 animate-bounce">
          🎲
        </span>
        Waiting for server...
      </p>
    );
  }

  const handleGuess = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // Dispatch allows you to send an action!
    // Modify /game/logic.ts to change what actions you can send
    dispatch({ type: "guess", guess: guess });
  };

  const getActivePlayer = () => {
    return gameState.users[gameState.active_player!]?.id;
  };

  const myturn = () => {
    return getActivePlayer() === username;
  };

  // settings
  if (gameState.active_player === null)
    return (
      <div className=" flex w-8/12 m-auto gap-9">
        <section className="mydiv w-64">
          <h2>User list</h2>
          <ul className="mt-5">
            {gameState.users.map((user) => {
              return (
                <li
                  key={user.id}
                  className={
                    username === user.id
                      ? " font-bold text-center"
                      : "text-center"
                  }
                >
                  {user.id}
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => {
              router.push("/login");
            }}
          >
            log out
          </button>
        </section>
        <section className="mydiv flex flex-col gap-5 grow items-center">
          <h2>settings</h2>
          <p>tbd</p>
          <button className="btn" onClick={() => dispatch({ type: "turn" })}>
            start game
          </button>
        </section>
      </div>
    );
  // gameplay
  else
    return (
      <div className=" flex w-8/12 m-auto gap-9">
        <section className="mydiv w-64 h-min flex flex-col gap-2">
          <h2>Leaderboard</h2>
          <ul className="my-5">
            {gameState.users.map((user) => {
              return (
                <li
                  key={user.id}
                  className={
                    username === user.id
                      ? " font-bold text-center"
                      : "text-center"
                  }
                >
                  {user.id}
                </li>
              );
            })}
          </ul>

          {gameState.finished ? (
            <>
              <div className="alert alert-success h-min text-center">
                {myturn() ? <>You</> : <>{getActivePlayer()}</>} guessed
                correct!
              </div>
              <button
                className="btn w-full"
                onClick={() => dispatch({ type: "turn" })}
              >
                play again
              </button>
            </>
          ) : (
            <>
              <p className=" mt-10 text-center text-xl text-white font-semibold">
                {myturn() ? <>Your</> : <>{getActivePlayer()}&apos;s</>} turn!
              </p>
            </>
          )}
        </section>

        <section className="mydiv grid gap-5 grow items-center h-[800px]">
          <form
            className="flex flex-col gap-4 py-6 items-center"
            onSubmit={handleGuess}
          >
            <label
              htmlFor="guess"
              className="text-7xl font-bold text-stone-50 bg-black rounded p-2 text-"
            >
              {guess}
            </label>
            <input
              type="range"
              name="guess"
              id="guess"
              className="range w-56"
              onChange={(e) => setGuess(Number(e.currentTarget.value))}
              value={guess}
              max={10}
            />
            <button className="btn" disabled={!myturn() || gameState.finished}>
              Guess!
            </button>
          </form>
        </section>
      </div>
    );
};

export default Game;
