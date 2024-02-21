import usePartySocket from "partysocket/react";
import { useState } from "react";
import { GameState, Action } from "../../game/logic";


// Nice abstraction of the partykit connection.
export const useGameRoom = (username: string, roomId: string) => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  // Technically, if you would use the useGameRoom hook mulpiple times, you would create that connection
  // multiple times. But I think that the usePartySocket hook internally already has 
  // some logic that would protect you from that. If it would not, this would be something to watch out for.
  const socket = usePartySocket({
    host: "localhost:1999",
    room: roomId,
    id: username,
    onMessage(event: MessageEvent<string>) {
      setGameState(JSON.parse(event.data));
    },
  });

  const dispatch = (action: Action) => {
    socket.send(JSON.stringify(action));
  };

  return {
    gameState,
    dispatch,
  };
};
