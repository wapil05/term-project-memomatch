export interface User {
  id: string;
}

export type Action = DefaultAction | GameAction;
export type ServerAction = WithUser<DefaultAction> | WithUser<GameAction>;

type WithUser<T> = T & { user: User };

export type DefaultAction = { type: "UserEntered" } | { type: "UserExit" };

// This interface holds all the information about your game
export interface GameState {
  users: User[];
  target: number;
  active_player: number | null;
  finished: boolean;
}

// This is how a fresh new game starts out, it's a function so you can make it dynamic!
// In the case of the guesser game we start out with a random target
export const initialGame = () => ({
  users: [],
  target: Math.floor(Math.random() * 10),
  active_player: null,
  finished: false,
});

// Here are all the actions we can dispatch for a user
type GameAction = { type: "guess"; guess: number } | { type: "turn" };

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

    case "turn":
      return {
        ...state,
        active_player: 0,
        finished: false,
      };
      break;

    case "guess":
      if (action.guess === state.target) {
        console.log(
          `user ${action.user.id} guessed ${action.guess} and won! 👑`
        );
        return {
          ...state,
          target: Math.floor(Math.random() * 10),
          finished: true,
        };
      } else {
        return {
          ...state,
          active_player: nextTurn(state),
        };
      }
  }
};
