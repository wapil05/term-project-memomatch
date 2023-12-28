[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/az7rpZTG)

# Memo Match

This is the repository for the Web Applications Project `Memo Match`. We are using React based on TypeScript/DaisyUI approach.

Resources to get started:
- [React documentation](https://react.dev/learn)
- [DaisyUI](https://daisyui.com/docs/use/)

## Project Structure
All the code is in the `src\app` folder. The `src` folder is structured as follows:
- `src/app/layout.tsx`: contains the root layout with the required `<html>` and `<body>` tags.
- `src/app/page.tsx`: is the homepage and will be rendered when the user visits the root of the application (/).
- `src/components`: contains all the components used in the project, `.tsx` files alike.
- `public`: to store static assets such as images, fonts, etc. Files inside public directory can then be referenced by your code starting from the base URL (/).

**Routing**:
Next.js uses file-system routing, which means the routes in your application are determined by how you structure your files.
The project is usind the App Router:
- Next.js uses a file-system based router where folders are used to define routes.
- Each folder represents a route segment that maps to a URL segment. To create a nested route, you can nest folders inside each other.
- A special page.tsx file is used to make route segments publicly accessible.
- Special file conventions are used to create UI for each route segment. The most common are `pages` to show UI unique to a route, and `layouts` to show UI that is shared across multiple routes. [See also](https://nextjs.org/docs/app/building-your-application/routing#file-conventions)

## How to run the project

### Prerequisites
- [Node.js](https://nodejs.org/en/) (2021 installed or higher should be just fine)

### Installation
1. Clone the repository
2. Run `npm install` in the root folder of the project
3. Run `npm run dev` to start the development server
4. Open [localhost:3000](http://localhost:3000/) in your browser

## Development

### Collaboration & Git
We are working with a `feature branch based development`. Changes are made on individual branches and are merged via pull requests into the main branch.
There is 1 fixed branche `main`. Additionally, for every `feature` and `bugfix` a new branch is created. Below are the naming conventions:
- Main branch main / master
- Feature branches feature/*
- Bugfix branch fix/*

## Documentation
The development regarding to the required topics `Authorization`, `Client-Server Communication`, `Testing` and `Continuous Integration` will be summarized in the following paragraphs:

### Summary
Describe briefly what the project was about. What were the challenges that you were facing and how did you solve them.

### Authorization
Which form of authorization did you use in your application? Briefly describe why you picked

### Client-Server Communication
Which approaches to a client-server communication did you use? Outline why you have made that choice and detail some challenges that you encountered.

### Testing
Did you integrate tests into you application. If yes, which sorts of tests were you running? Did you feel that the precense of the tests made certain development tasks easier / result in a more stable application?

### Continuous Integration (optional)
Did you use continuous integration in you setup? If yes, which tasks were running on the CI?

