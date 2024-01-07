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
  // //reshape array to 2d
  // while (state.cards.length) cards.push(state.cards.splice(0, 4));

  const [pickCount, setPickCount] = useState(0);

  useEffect(() => {
    // console.log(index, state, flipped);
    // console.log(gamestate.cards[index].state);
    // console.log(count, "in effect");
    if (pickCount == 2) {
      setTimeout(function () {
        dispatch({ type: "compare" });
        setPickCount(0);
      }, 1000);
    }
  }, [pickCount]);

  return (
    <>
      <div className="grid grid-cols-4 gap-2 w-[664px] place-self-center">
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
