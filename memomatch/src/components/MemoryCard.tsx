import { useEffect, useState } from "react";
import { useGameRoom } from "@/hooks/useGameRoom";
import { GameState } from "../../game/logic";
import Image from "next/image";

const MemoryCard = ({
  img,
  state,
  index,
  dispatch,
  myturn,
  count,
  setCount,
}: {
  img: string;
  state: boolean | "guessed";
  index: number;
  dispatch: Function;
  myturn: boolean;
  count: number;
  setCount: Function;
}) => {
  const handleGuess = () => {
    if (state === false) {
      setCount(count + 1);
      dispatch({ type: "pick", i: index });
    }
  };

  return (
    <>
      <button
        disabled={!myturn || state !== false || count === 2}
        onClick={handleGuess}
      >
        <div className="grid place-content-center">
          <div className={state ? "flip-box flip-box-clicked" : "flip-box"}>
            <div className="flip-box-inner shadow-2xl">
              <div className="flip-box-front bg-[#696CC3] grid place-content-center uppercase text-indigo-800 font-black text-2xl rounded text-center">
                Memo Match
              </div>
              <div className="flip-box-back relative grid place-content-center text-xl overflow-hidden bg-white text-black rounded">
                {/* <Image
                  alt="memory card immage"
                  src={img}
                  width={160}
                  height={160}
                /> */}
                <img
                  alt="memory card immage"
                  className=" object-cover h-[160px] aspect-square"
                  src={img}
                />
                {state === "guessed" ? (
                  <div className="absolute">✅</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </button>
    </>
  );
};

export default MemoryCard;
