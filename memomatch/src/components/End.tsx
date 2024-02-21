import { themeAtom, boardSizeAtom } from "../../state/atoms";
import { useAtomValue, atom, useAtom } from "jotai";
import { GameState } from "../../game/logic";
import { useEffect } from "react";

// The winnerAtom does not really need to be an atom, as it's scope
// is limited to the End component. It could be a simple useState within the component as well.
const winnerAtom = atom<string>('');

export const End = ({
    state,
    dispatch,
}: {
    state: GameState;
    dispatch: Function;
}) => {

    const theme = useAtomValue(themeAtom);
    const boardSize = useAtomValue(boardSizeAtom);
    const [winner, setWinner] = useAtom(winnerAtom);

    useEffect(() => {
        var winnerScore: number = 0;
        for (var i = 0; i < state.users.length; i++) {
            if (state.users[i].points > winnerScore) {
                winnerScore = state.users[i].points;
                setWinner(state.users[i].id);
            }
        }
    });

    return (
        <section className="mydiv bg-indigo-700">
            <div className=" flex flex-col gap-1 items-center">
                <h3>Finished</h3>
                <div className="text-center text-white">
                    <h4 className="my-3">Congratulations to </h4>
                    {/* Extremely nitpicky, but the span with the winner could also still be in the h4 */}
                    <span className="uppercase text-xl">{winner}! 🥳</span>
                </div>
                <button
                    className="btn btn-wide mt-7"
                    onClick={() => dispatch({ type: "reset", boardSize: boardSize, theme: theme })}
                >
                    play again
                </button>
            </div>
        </section>

    )
}
