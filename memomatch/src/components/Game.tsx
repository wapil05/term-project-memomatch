// "use client";
import { useState } from "react";
import { useGameRoom } from "@/hooks/useGameRoom";
import { useRouter } from "next/navigation";
import Memory from "./Memory";
import { themeAtom, boardSizeAtom } from "../../state/atoms";
import { useAtom } from "jotai";

interface GameProps {
  username: string;
  roomId: string;
}

const Game = ({ username, roomId }: GameProps) => {
  const { gameState, dispatch } = useGameRoom(username, roomId);
  const [showSettings, setShowSettings] = useState(true);
  const [theme, setTheme] = useAtom(themeAtom);
  const [boardSize, setBoardSize] = useAtom(boardSizeAtom);

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
        <section className="mydiv w-64 grid">
          <div>
            <h2>User list</h2>
            <ul className="mt-5 uppercase">
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
          </div>
          <button
            className="link self-end"
            onClick={() => {
              router.push("/");
            }}
          >
            log out
          </button>
        </section>

        <section className="mydiv flex flex-col gap-5 grow items-center">
          <h2>settings</h2>
          <br />
          <p>THEME</p>
          <div className="flex flex-row gap-3">
            <button className="btn settings"
              onClick={() => {
                setTheme('cats')
              }}>cats</button>
            <button className="btn settings"
              onClick={() => {
                setTheme('dogs')
              }}>dogs</button>
          </div>
          <p>BOARD SIZE</p>
          <div className="flex flex-row gap-3">
            <button className="btn settings"
              onClick={() => {
                setBoardSize(8)
              }}>4 x 4</button>
            <button className="btn settings"
              onClick={() => {
                setBoardSize(10)
              }}>5 x 4</button>
          </div>
          <br />

          <button
            className="btn"
            onClick={() => dispatch({ type: "start", boardSize: boardSize, theme: theme })}
          >
            start game
          </button>
        </section>
      </div>
    );
  // gameplay
  else
    return (
      <div className=" flex w-8/12 m-auto gap-9">
        <section className="mydiv w-75 h-min flex flex-col gap-2">
          <h2>Leaderboard</h2>
          <ul className="my-4">
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
              <div className="alert alert-success h-min text-center rounded-md">
                <span>😎</span>
                <span> All pairs found!</span>
              </div>
              <button
                className="btn w-full"
                onClick={() => dispatch({ type: "reset", boardSize: boardSize, theme: theme})}
              >
                play again
              </button>
            </>
          ) : (
            <>
              <p className=" my-5 text-center text-xl text-white font-semibold">
                {myturn() ? <>Your</> : <>{getActivePlayer()}&apos;s</>} turn!
              </p>
            </>
          )}

          <button
            className="link"
            onClick={() => dispatch({ type: "settings" })}
          >
            back to settings
          </button>
        </section>

        <section className="mydiv grid gap-5 grow items-center h-[800px]">
          <Memory state={gameState} myturn={myturn()} dispatch={dispatch} />
        </section>
      </div>
    );
};

export default Game;
