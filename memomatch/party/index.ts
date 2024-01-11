import type * as Party from "partykit/server";
import { gameUpdater, initialGame, Action, ServerAction } from "../game/logic";
import { GameState } from "../game/logic";

interface ServerMessage {
  state: GameState;
}

// Data fetching function - gets called on initial load and when user clicks 'start'
export async function fetchCardValues(url: string): Promise<string[]> {
  const res = await fetch(url);
  const imgs = await res.json();
  const card_values = imgs.map((c: { url: any }) => c.url);

  return card_values;
}

// function for returningn the senders index in users: User[]
function getIndex(gameState: GameState, id: string): number {
  let index: number = 0;
  for (let i = 0; i < gameState.users.length; i++) {
    if (gameState.users[i].id == id) {
      index = i;
    }
  }
  return index;
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
      { type: "UserEntered", user: { id: connection.id, points: 0 } },
      this.gameState
    );
    this.party.broadcast(JSON.stringify(this.gameState));
  }

  onClose(connection: Party.Connection) {
    this.gameState = gameUpdater(
      {
        type: "UserExit",
        user: { id: connection.id, points: 0 },
      },
      this.gameState
    );
    this.party.broadcast(JSON.stringify(this.gameState));
  }

  onMessage(message: string, sender: Party.Connection) {
    const action: ServerAction = {
      ...(JSON.parse(message) as Action),
      user: {
        id: sender.id,
        points:
          this.gameState.users[getIndex(this.gameState, sender.id)].points ?? 0,
      },
    };
    console.log(`Received action ${action.type} from user ${sender.id}`);

    // data fetching after action 'start' or 'restart'
    let fetched_urls: string[];
    if (action.type === "start" || action.type === "reset") {
      if (this.party.env.CAT_API_KEY && this.party.env.DOG_API_KEY != null) {
        if (action.theme === "cats") {
          fetchCardValues(
            "https://api.thecatapi.com/v1/images/search?&limit=" +
              action.boardSize +
              "&order=RAND&api_key=" +
              this.party.env.CAT_API_KEY
          )
            .then((data) => (fetched_urls = data))
            .then((data) => {
              this.gameState = gameUpdater(
                { ...action, urls: data },
                this.gameState
              );
              this.party.broadcast(JSON.stringify(this.gameState));
            });
        } else {
          fetchCardValues(
            "https://api.thedogapi.com/v1/images/search?&limit=" +
              action.boardSize +
              "&order=RAND&api_key=" +
              this.party.env.DOG_API_KEY
          )
            .then((data) => (fetched_urls = data))
            .then((data) => {
              this.gameState = gameUpdater(
                { ...action, urls: data },
                this.gameState
              );
              this.party.broadcast(JSON.stringify(this.gameState));
            });
        }
      } else {
        fetched_urls = ["0", "1", "2", "3", "4", "5", "6", "7"];
        this.gameState = gameUpdater(
          { ...action, urls: fetched_urls },
          this.gameState
        );
        this.party.broadcast(JSON.stringify(this.gameState));
      }
    } else if (action.type === "compare") {
      this.gameState = gameUpdater(
        { ...action, index: getIndex(this.gameState, sender.id) },
        this.gameState
      );
      this.party.broadcast(JSON.stringify(this.gameState));
    } else {
      this.gameState = gameUpdater(action, this.gameState);
      this.party.broadcast(JSON.stringify(this.gameState));
    }
  }
}

Server satisfies Party.Worker;
