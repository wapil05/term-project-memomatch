import { useState } from "react";
import { useGameRoom } from "@/hooks/useGameRoom";
import { useRouter } from "next/navigation";
import Memory from "./Memory";
import { End } from "./End";
import { themeAtom, boardSizeAtom } from "../../state/atoms";
import { useAtom } from "jotai";

interface GameProps {
  username: string;
  roomId: string;
}

const Game = ({ username, roomId }: GameProps) => {
  const { gameState, dispatch } = useGameRoom(username, roomId);
  const [theme, setTheme] = useAtom(themeAtom);
  const [boardSize, setBoardSize] = useAtom(boardSizeAtom);

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
  // show settings no active player is set
  if (gameState.active_player === null)
    return (
      <div className=" flex flex-col lg:flex-row  w-full lg:gap-5 m-auto justify-center items-center lg:items-stretch">
        <section className="mydiv mx-0 w-full lg:w-64 grid">
          <div>
            <h2>User list</h2>
            <ul className="mt-5 uppercase">
              {gameState.users.map((user) => {
                return (
                  <li
                    key={user.id}
                    className={
                      username === user.id
                        ? " font-bold text-center my-2"
                        : "text-center my-2"
                    }
                  >
                    {user.id}
                  </li>
                );
              })}
            </ul>
          </div>
          <a
            className="link self-end justify-self-center"
            href="/api/auth/logout"
          >
            logout
          </a>
        </section>

        <section className="mydiv mx-0 flex flex-col gap-5 grow items-center max-w-[830px]">
          <h2>settings</h2>
          <p className="uppercase mt-3">theme</p>
          <div role="tablist" className="tabs tabs-boxed lg:tabs-lg">
            {theme === "cats" ? (
              <>
                <a role="tab" className="tab tab-active">
                  Cats
                </a>
                <a
                  role="tab"
                  className="tab"
                  onClick={() => {
                    setTheme("dogs");
                  }}
                >
                  Dogs
                </a>
              </>
            ) : (
              <>
                <a
                  role="tab"
                  className="tab"
                  onClick={() => {
                    setTheme("cats");
                  }}
                >
                  Cats
                </a>
                <a role="tab" className="tab tab-active">
                  Dogs
                </a>
              </>
            )}
          </div>
          <p className="uppercase mt-3">board size</p>
          <div role="tablist" className="tabs tabs-boxed lg:tabs-lg">
            {boardSize === 8 ? (
              <>
                <a role="tab" className="tab tab-active ">
                  4 x 4
                </a>
                <a
                  role="tab"
                  className="tab"
                  onClick={() => {
                    setBoardSize(10);
                  }}
                >
                  5 x 4
                </a>
              </>
            ) : (
              <>
                <a
                  role="tab"
                  className="tab"
                  onClick={() => {
                    setBoardSize(8);
                  }}
                >
                  4 x 4
                </a>
                <a role="tab" className="tab tab-active">
                  5 x 4
                </a>
              </>
            )}
          </div>
          {/* hide start button till two users have joined */}
          {/* set to 0 for testing purposes */}
          {gameState.users.length > 0 ? (
            <button
              className="btn my-4"
              onClick={() =>
                dispatch({ type: "start", boardSize: boardSize, theme: theme })
              }
            >
              start game
            </button>
          ) : (
            <></>
          )}
        </section>
      </div>
    );
  // gameplay
  else
    return (
      <div className=" flex flex-col lg:flex-row  w-full lg:gap-5 justify-center items-center lg:items-start">
        {/* Leaderboard */}
        <section className="mydiv mx-0 w-full lg:w-min h-min flex flex-col gap-2">
          <h2>Leaderboard</h2>
          <div className="grid grid-cols-2 gap-2 gap-x-8 my-5 self-center">
            <div className="uppercase text-white">Player</div>
            <div className="uppercase text-white">Points</div>
            {gameState.users.map((user, index) => {
              return (
                <div
                  key={index + "_" + user.id}
                  className="grid grid-cols-2 gap-2 gap-x-8 self-center col-span-2"
                >
                  <div
                    key={user.id}
                    className={`uppercase text-ellipsis overflow-clip ${
                      username === user.id ? " text-indigo-500" : ""
                    }`}
                  >
                    {user.id}
                  </div>

                  <div
                    key={index + "_pts_" + user.id}
                    className={username === user.id ? " font-bold" : ""}
                  >
                    {user.points} Pts.
                  </div>
                </div>
              );
            })}
          </div>

          {gameState.finished ? (
            <End state={gameState} dispatch={dispatch} />
          ) : (
            <>
              <p className=" my-5 text-center text-xl text-white font-semibold">
                <>
                  {myturn() ? (
                    <>Your</>
                  ) : (
                    <>
                      <span className="uppercase">{getActivePlayer()}</span>
                      &apos;s
                    </>
                  )}{" "}
                  turn!
                </>
              </p>
              <button
                className="link"
                onClick={() => dispatch({ type: "settings" })}
              >
                back to settings
              </button>
            </>
          )}
        </section>
        {/* Memory area */}
        <section
          className={`mydiv mx-0 grid items-center grow w-full ${
            gameState.boardSize === 8 ? "lg:max-w-[720px]" : "lg:max-w-[880px]"
          }`}
        >
          <Memory state={gameState} myturn={myturn()} dispatch={dispatch} />
        </section>
      </div>
    );
};

export default Game;
