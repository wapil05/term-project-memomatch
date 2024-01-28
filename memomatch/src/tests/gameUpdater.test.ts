import {describe, expect, test} from '@jest/globals';
import { gameUpdater, ServerAction, GameState } from '../../game/logic';


// Generate user data for testing

const user1 = { id: '1', points: 0};
const user2 = { id: '2', points: 0};
const user3 = { id: '3', points: 0};

// Create initial game state for testing

const initialGameState: GameState = {
    users: [user1, user2, user3],
    active_player: null,
    finished: false,
    cards: [],
    pick_a: 0,
    pick_b: 0,
    boardSize: 8,
    theme: 'cats',
};

// Game state after the start action (includes shuffled cards)

const startAction: ServerAction = {
    type: 'start',
    boardSize: 16,
    theme: 'dogs',
    user: user1,
};

const gameStateAfterStart = gameUpdater(startAction, initialGameState);

describe('gameUpdater actions', () => {

    test('if the UserEndered action adds new users correctly', () => {

        let testState = JSON.parse(JSON.stringify(initialGameState)); // deep copy the testing states

        const action: ServerAction = {type: 'UserEntered', user: {id: '4', points: 0}};
        testState = gameUpdater(action, testState);

        expect(testState.users.length).toBe(4);
        expect(testState.users).toContainEqual(action.user);
    });

    test('if the UserExit action removes users correctly', () => {

        let testState = JSON.parse(JSON.stringify(initialGameState));

        const action: ServerAction = {type: 'UserExit', user: user2};
        testState = gameUpdater(action, testState);

        expect(testState.users.length).toBe(2);
        expect(testState.users).not.toContainEqual(user2);
    });

    test('handles the settings action', () => {

        let testState = { ...initialGameState};

        const action: ServerAction = {type: 'settings', user: user1};
        testState = gameUpdater(action, testState);

        expect(testState.active_player).toBeNull();
    });

    test('if the start action set ups the state correctly and properly shuffles the cards', () => {

        let testState = JSON.parse(JSON.stringify(initialGameState));

        const action: ServerAction = {
            type: 'start',
            boardSize: 16,
            theme: 'dogs',
            user: user1,
        };

        testState = gameUpdater(action, testState);

        // Check if the game state is updated correctly
        expect(testState.active_player).toBe(0);
        expect(testState.finished).toBe(false);
        expect(testState.cards.length).toBe(16);
        expect(testState.theme).toBe('dogs');

        // Check if user points are reset
        expect(testState.users[0].points).toBe(0);
        expect(testState.users[1].points).toBe(0);
        expect(testState.users[2].points).toBe(0);

        // Check if cards are shuffled
        const initialCardOrder = initialGameState.cards.map(card => card.src);
        const newCardOrder = testState.cards.map((card: { src: string; }) => card.src);
        expect(newCardOrder).not.toEqual(initialCardOrder);

        // Check if the amount of cards correlates to the board size
        expect(newCardOrder.length).toBe(action.boardSize);

        // Check if no new cards were added in the shuffle process
        initialCardOrder.forEach((element) => {
            expect(newCardOrder).toContain(element);
        });
    });


    test('if the reset action sets the correct values', () => {

        let testState = JSON.parse(JSON.stringify(initialGameState));

        const action: ServerAction = {
            type: 'reset',
            boardSize: 6, // Change the boardSize for testing
            theme: 'dogs', // Change the theme for testing
            user: user1,
        };

        testState = gameUpdater(action, testState);

        expect(testState.active_player).toBe(0);
        expect(testState.finished).toBe(false);
        expect(testState.pick_a).toBe(-1);
        expect(testState.pick_b).toBe(-1);
        expect(testState.boardSize).toBe(6);
        expect(testState.theme).toBe('dogs');
        expect(testState.users[0].points).toBe(0);
    });


    test('if the pick action updates the state with the correct cards', () => {

        let testState = JSON.parse(JSON.stringify(gameStateAfterStart));

        // set up the theoretical pick actions

        const action1: ServerAction = {
            type: 'pick',
            i: 2,
            user: user1
        }

        const action2: ServerAction = {
            type: 'pick',
            i: 5,
            user: user1
        }

        // User 1 picks a card
        testState = gameUpdater(action1, testState);

        // Check if the card state is updated correctly
        expect(testState.cards[action1.i].state).toBe(true);
        expect(testState.pick_a).toBe(2);
        expect(testState.pick_b).toBe(-1);

        // User 1 picks a second card
        testState = gameUpdater(action2, testState);

        // Check if the card state is updated correctly
        expect(testState.cards[5].state).toBe(true);
        expect(testState.pick_a).toBe(2); // First pick remains unchanged
        expect(testState.pick_b).toBe(5);
    });


    test('if the compare action marks matching cards as guessed and increases points', () => {

        let testState = JSON.parse(JSON.stringify(gameStateAfterStart));

        const pickAIndex = 2;
        const pickBIndex = 5;

        // Set up the state to simulate a user picking two cards with the same src value
        testState.pick_a = pickAIndex;
        testState.pick_b = pickBIndex;
        testState.cards[pickAIndex].src = "exampleCard";
        testState.cards[pickBIndex].src = "exampleCard";

        // Simulate the compare action
        const action : ServerAction = { type: "compare", index: 0, user: user1 };
        testState = gameUpdater(action, testState);

        // Check if the state is updated correctly
        expect(testState.cards[pickAIndex].state).toBe("guessed");
        expect(testState.cards[pickBIndex].state).toBe("guessed");
        expect(testState.users[0].points).toBe(1);
        expect(testState.finished).toBe(false);

    });

    test('if the compare action handles non matching cards properly', () => {

        let testState = JSON.parse(JSON.stringify(gameStateAfterStart));

        const pickAIndex = 1;
        const pickBIndex = 3;

        // Set up the state to simulate a user picking two cards with the same src value

        testState.pick_a = pickAIndex;
        testState.pick_b = pickBIndex;
        testState.cards[pickAIndex].src = "Cat";
        testState.cards[pickBIndex].src = "Dog";

        // Simulate the compare action
        const action : ServerAction = { type: "compare", index: 0, user: user1 };
        testState = gameUpdater(action, testState);

        // Check if the state is updated correctly
        expect(testState.cards[pickAIndex].state).toBe(false);
        expect(testState.cards[pickBIndex].state).toBe(false);
        expect(testState.users[0].points).toBe(0);
        expect(testState.finished).toBe(false);
    });
});

