import { getCatPics, getDogPics } from "../api/api";

export interface User {
  id: string;
}

export type Action = DefaultAction | GameAction;
export type ServerAction = WithUser<DefaultAction> | WithUser<GameAction>;

type WithUser<T> = T & { user: User };

export type DefaultAction = { type: "UserEntered" } | { type: "UserExit" };

type mycard = { src: string; state: boolean | "guessed" };

// This interface holds all the information about your game
export interface GameState {
  users: User[];
  target: number;
  active_player: number | null;
  finished: boolean;
  cards: mycard[];
  pick_a: number;
  pick_b: number;
  boardSize: number;
  theme: string;
}

// This is how a fresh new game starts out, it's a function so you can make it dynamic!
// In the case of the guesser game we start out with a random target
export const initialGame = () => ({
  users: [],
  target: Math.floor(Math.random() * 10),
  active_player: null,
  finished: false,
  cards: cards(),
  pick_a: -1,
  pick_b: -1,
  boardSize: 8,
  theme: 'cats',
});

const cards = () => {
  //let card_values = ["0", "1", "2", "3", "4", "5", "6", "7"]; // to do: => cat/dog images
  let card_values: string[] = [];

  switch() {
    case 8:
      card_values = ["0", "1", "2", "3", "4", "5", "6", "7"];
      break;
    case 10:
      card_values = ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];
      break;
  }

  /*
  switch(theme) {
    case 'cats':
      card_values = getCatPics(boardSize);
      break;
    case 'dogs':
      card_values = getDogPics(boardSize);
      break;
  }
  */  

  function shuffle(array: string[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  //duplicate and shuffel values
  card_values = shuffle(card_values.flatMap((i) => [i, i]));

  // adding the state value
  const arr = card_values.map((c: string) => {
    return { src: c, state: false };
  });

  console.log(arr);
  return arr;
};

// Here are all the actions we can dispatch for a user
type GameAction =
    { type: "start"; boardSize: number; theme: string}
  | { type: "reset" }
  | { type: "settings" }
  | { type: "pick"; i: number }
  | { type: "compare" };
    

const nextTurn = (state: GameState) => {
  if (state.active_player === state.users.length - 1) return 0;
  else return state.active_player! + 1;
};

export const gameUpdater = (
  action: ServerAction,
  state: GameState
): GameState => {
  // This switch should have a case for every action type you add.

  // "UserEntered" & "UserExit" are defined by default

  // Every action has a user field that represent the user who dispatched the action,
  // you don't need to add this yourself
  switch (action.type) {
    case "UserEntered":
      return {
        ...state,
        users: [...state.users, action.user],
      };

    case "UserExit":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.user.id),
      };
    case "settings":
      return { ...state, active_player: null };

    case "start":
      return {
        ...state,
        active_player: 0,
        finished: false,
        cards: cards(),
        pick_a: -1,
        pick_b: -1,
        boardSize: action.boardSize,
        theme: action.theme,
      };

    case "reset":
      return {
        ...state,
        active_player: 0,
        finished: false,
        cards: cards(),
        pick_a: -1,
        pick_b: -1,
        boardSize: 8,
        theme: 'cats',
      };

    case "pick":
      // show card and save picked card index
      if (state.pick_a === -1 || state.pick_b === -1) {
        state.cards[action.i].state = true;
        if (state.pick_a === -1) state.pick_a = action.i;
        else state.pick_b = action.i;
      }
      return { ...state, cards: state.cards };

    case "compare":
      if (state.pick_a === -1 && state.pick_b === -1) return state;
      else {
        //check if a pair was picked
        if (state.cards[state.pick_a].src === state.cards[state.pick_b].src) {
          state.cards[state.pick_a].state = "guessed";
          state.cards[state.pick_b].state = "guessed";
          // to do: add points

          // check if all cards are guessed
          if (state.cards.filter((c) => c.state === false).length === 0) {
            state.finished = true;
          }
          // flipp cards if no pair was found
        } else {
          state.pick_a = -1;
          state.pick_b = -1;
          return {
            ...state,
            // set all cards which aren't guessed to false
            cards: state.cards.map((c) =>
              c.state === "guessed" ? c : { src: c.src, state: false }
            ),
            active_player: nextTurn(state),
          };
        }
        state.pick_a = -1;
        state.pick_b = -1;
        return { ...state, cards: state.cards };
      }
  }
};
