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
    // if picked card is still flipped
    if (state === false) { 
      setCount(count + 1); 
      // send picked card index to the server
      dispatch({ type: "pick", i: index }); 
    }
  };

  return (
    <>
      <button
        disabled={!myturn || state !== false || count === 2}
        onClick={handleGuess}
      >
        <div className="grid place-content-center aspect-square">
          <div className={state ? "flip-box  flip-box-clicked" : "flip-box "}>
            <div className="flip-box-inner shadow-2xl">
              <div className="flip-box-front bg-[#696CC3] grid place-content-center uppercase text-indigo-800 font-black sm:text-2xl rounded text-center">
                Memo Match
              </div>
              <div className="flip-box-back relative grid place-content-center text-xl overflow-hidden bg-white text-black rounded">
                {/* <Image
                  alt="memory card immage"
                  src={img}
                /> */}
                <img
                  alt="memory card immage"
                  className=" object-cover h-full aspect-square "
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
