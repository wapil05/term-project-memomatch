import { useEffect, useState } from "react";
import { GameState } from "../../game/logic";
import MemoryCard from "./MemoryCard";

const Memory = ({
  state,
  myturn,
  dispatch,
}: {
  state: GameState;
  myturn: boolean;
  dispatch: Function;
}) => {
  const [pickCount, setPickCount] = useState(0);

  useEffect(() => {
    if (pickCount == 2) {
      // waiting 1s after the second pick so that the users can memorize the card
      setTimeout(function () {
        dispatch({ type: "compare" }); //check if picked cards are a pair
        setPickCount(0);
      }, 1000);
    }
  }, [pickCount]);

  return (
    <>
      <div
        className={`grid grid-cols-4 ${
          // if boardSize 5x4 => 5 grid cols
          state.boardSize !== 8 ? "md:grid-cols-5" : ""
        } gap-2 place-self-center `}
      >
        {state.cards.map((c, index) => {
          return (
            <MemoryCard
              img={c.src}
              key={index}
              state={c.state}
              index={index}
              dispatch={dispatch}
              myturn={myturn}
              count={pickCount}
              setCount={setPickCount}
            />
          );
        })}
      </div>
    </>
  );
};

export default Memory;
