import type * as Party from "partykit/server";
import { gameUpdater, initialGame, Action, ServerAction } from "../game/logic";
import { GameState } from "../game/logic";

interface ServerMessage {
  state: GameState;
}

export default class Server implements Party.Server {
  private gameState: GameState;
  constructor(readonly party: Party.Party) {
    this.gameState = initialGame(party);
    console.log("Room created:", party.id);
  }

  onConnect(connection: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log(
      `Connected:
      id: ${connection.id}
      room: ${this.party.id}
      url: ${new URL(ctx.request.url).pathname}`
    );

    // let's send a message to the connection
    // conn.send();
    this.gameState = gameUpdater(
      { type: "UserEntered", user: { id: connection.id } },
      this.gameState
    );
    this.party.broadcast(JSON.stringify(this.gameState));
  }

  onClose(connection: Party.Connection) {
    this.gameState = gameUpdater(
      {
        type: "UserExit",
        user: { id: connection.id },
      },
      this.gameState
    );
    this.party.broadcast(JSON.stringify(this.gameState));
  }
  onMessage(message: string, sender: Party.Connection) {
    const action: ServerAction = {
      ...(JSON.parse(message) as Action),
      user: { id: sender.id },
    };
    console.log(`Received action ${action.type} from user ${sender.id}`);
    if (action.type === "settings")
      //to-do: check settings for key + board size
      this.gameState = gameUpdater(
        { ...action, apikey: this.party.env.CAT_API_KEY },
        this.gameState
      );
    else this.gameState = gameUpdater(action, this.gameState);
    this.party.broadcast(JSON.stringify(this.gameState));
  }

  static async onFetch(
    req: Party.Request,
    lobby: Party.FetchLobby,
    ctx: Party.ExecutionContext
  ) {
    return new Response(req.url, { status: 403 });
  }
}

Server satisfies Party.Worker;
