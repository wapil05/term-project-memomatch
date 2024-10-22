[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/az7rpZTG)

# MemoMatch 🎲

This is the repository for the Web Applications Project `MemoMatch`. We are using React based on TypeScript/DaisyUI approach.

Resources to get started:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/learn)
- [DaisyUI](https://daisyui.com/docs/use/)
- [Tailwind CSS](https://tailwindcss.com/docs/utility-first)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
## Project Structure
All the code is in the `src\app` folder. The `src` folder is structured as follows:
- `src/app/layout.tsx`: contains the root layout with the required `<html>` and `<body>` tags.
- `src/app/page.tsx`: is the homepage and will be rendered when the user visits the root of the application (/).
- `src/components`: contains all the components used in the project, `.tsx` files alike.
- `public`: to store static assets such as images, fonts, etc. Files inside public directory can then be referenced by your code starting from the base URL (/).

**Routing**:
The project is using the App Router framework:
- Next.js uses a file-system based router where folders are used to define routes.
- Each folder represents a route segment that maps to a URL segment. To create a nested route, you can nest folders inside each other.
- A special page.tsx file is used to make route segments publicly accessible.
- Special file conventions are used to create UI for each route segment. The most common are `pages` to show UI unique to a route, and `layouts` to show UI that is shared across multiple routes. For further information about special file conventions [Click here](https://nextjs.org/docs/app/building-your-application/routing#file-conventions)

**PartyKit and Game Logic**

We build our game on top of a [community starter template](https://docs.partykit.io/examples/starter-kits/game-starter-nextjs-redux/).
- `party/index.ts`: containes the functionality for the partykit server. When a client action is dispatched an update function is called which then broadcastes an updated GameState to all the users. 
- `game/logic.ts`: contains all the logic for the game, the most important parts are the GameState interface, the GameAction type and the gameUpdater function.
- `src/hooks/useGameRoom.tsx`: provides the client with 
    - `gameState`, the current GameState for the party room 
    - `dispatch`, the function with which a client can send Actions to the server


## Getting started

### Prerequisites
[Node.js](https://nodejs.org/en/) (2021 installed or higher should be just fine)

### Development Server
Clone the repository
```bash
git clone https://github.com/wapil05/term-project-memomatch.git
```
Switch to the project's root folder
```bash
cd .\memomatch\
```
Install the dependencies in the root folder of the project
```bash
npm install
```
Start the development server
```bash
npm run dev
```
Open [localhost:3000](https://localhost:3000/) in your browser

### Partykit server

Start the partykit dev server in the project's root folder:

```bash
npx partykit dev
```

### Testing
Run the tests in the project's root folder

```bash
npm test
```


### Enviorment Variables

For the authorization the follwing variables need to be stored in the `.env.local` file. They are listed below for convenience.

```bash
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='https://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://dev-6nw16umezarw38ei.us.auth0.com'
AUTH0_CLIENT_ID='Fqoh1lC9gjaea9fVwkWbUaYhOm9k2FoT'
AUTH0_CLIENT_SECRET='DmgDWgbf58eGcytr4Ay7sdk-1-zF4IWcbxxAJ82oZ25WPkv5sgsc5JUYwrG3cy1L'
```

For the cat and dog pictures the keys were requested from [theCatAPI](https://thecatapi.com/) and [theDogAPI](https://www.thedogapi.com/) and inserted into `partykit.json`, which was excluded from gitignore since we won't be deploying the website.



## Development

### Collaboration & Git
We are working with a `feature branch based development`. Changes are made on individual branches and are merged via `pull requests` into the main branch.
There is 1 fixed branche `main`. Additionally, for every `feature` and `bugfix` a new branch is created. Below are the naming conventions:
- Main branch main / master
- Feature branches feature/*
- Bugfix branch fix/*

## Documentation
The development regarding to the required topics `Authorization`, `Client-Server Communication`, `Testing` and `Continuous Integration` will be summarized in the following paragraphs:

### Summary
<!-- *TODO: Describe briefly what the project was about. What were the challenges that you were facing and how did you solve them.* -->
__MemoMatch__ is an online version of the wellknown card game *Memory*. The players can choose between cat 🐱 and dog 🐶 Memory cards. They can also choose between a 4x4 (8 card pairs) and 5x4 (10 card pairs)
game.

The biggest challenge was time. But beside that we also encounterd some challenges with Authorization. It wasn't clear which approach to choose - the one for [Auth0 with Next.js](https://auth0.com/docs/quickstart/webapp/nextjs/01-login) or the one for [Auth0 and React](https://auth0.com/docs/quickstart/spa/react/01-login). It turned out that the first approach was the right one, because Next.js alsways builds a server side variant of the pages and so the <Aut0Provider> component couldn't be supported.

### Authorization
<!-- *TODO: Which form of authorization did you use in your application? Briefly describe why you picked* -->
The Authorization Provider [*Auth0*](https://auth0.com/de) has been used. The reason for choosing oAuth honestly was, to avoid settiung up a database with the login data.
The Authentication is used to only enable logged-in users access to the Game-Play.
<!--
**How much authentication should be implemented?**
Authentication be used to login a user and specific routes or at least the API should be protected by authorization. This means that without being logged in, some API calls should not be possible.
-->

### Client-Server Communication
<!-- *TODO: Which approaches to a client-server communication did you use? Outline why you have made that choice and detail some challenges that you encountered.* -->
We used [*PartyKit*](https://docs.partykit.io/how-partykit-works) for Client-Server Communication. The reason for our choice was, that PartyKit provides multiple App exampels for different use cases, which developer can use as a foundation.
In our case we build our Game Setup on top of a [community starter template](https://docs.partykit.io/examples/starter-kits/game-starter-nextjs-redux/) for turn-based multiplayer games with Next.js.

It was fascinating for us, how real the real-time experience feels with PartyKit! ✨

The one and only barrier was to get an overview at first and to understand how the Client-Server Communication works. After that, the implementation of PartyKit works nearly trouble-free.

### Testing
<!-- *TODO: Did you integrate tests into you application. If yes, which sorts of tests were you running? Did you feel that the precense of the tests made certain development tasks easier / result in a more stable application?* -->
We integrated unit tests via ts-jest to test the actions in the gameUpdater function from logic.ts.
The tests result in a more stable application, since errors in the game logic can be identified immediately with the help of tests.
<!--
**Do I need to write automated tests for the project?**
Yes, but not your entire application needs to be tested. Unit tests for some smaller parts of your logic or UI will be fine. If you have a lot of real time interaction (reliance on websockets etc), this does not need to be tested. The goal of this requirement for you to at least write some tests, not achieve a 100% test coverage.
-->

### Continuous Integration
<!-- *TODO: Did you use continuous integration in you setup? If yes, which tasks were running on the CI?* -->

If changes are push to the main branch the test and the linting commands are executed in the memomatch directory. The github action file is based on the Workflow for [Node.js](https://github.com/wapil05/term-project-memomatch/actions/new?category=continuous-integration&query=Node.js).

<!--
**Is a continous integration setup required?**
Yes, but again, do not go overboard with it. A simple github action for the jest unit tests or an eslint setup (as we have set up in the continous integration unit) will be 100% enough. The goal of this requirement is for you to familiarize yourself with the continous integration setups.
-->
