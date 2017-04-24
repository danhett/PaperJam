# Game Jam Framework
A skeleton ES6 Phaser project for game jam usage. Created and shared in order to qualify for the Ludum Dare compo, and as a useful starting point for general quick-fire games projects.

## Setup
To set up, just do `npm install` (you might need `sudo`) in the root directory and wait for the million billion dependencies to download. Node, innit.

## Develop
To run in dev/watch mode, do `npm start` which will host the game on `localhost:3000` (or the best nearest guess if that port is busy).

Additionally it'll activate BrowserSync, so you can hit the URL on the same network from a different machine/device and test your game out that way (it prints both out in the console when you build)

This process will also watch for changes, so when you save your code the game should update in your browser automatically. Handy. Gulp also handles Babel translation, so your shiny ES6 code will be compiled into something that'll work in most places. Not that you care, this is a game jam, right?

## Build
To build a full production game, do `npm run production`

## Issues
Sometimes this seems to ignore new binaries pllaced in `static` until you kick the process. No idea why.

## License
Released unde the Do What The Fuck You Want To public license. So, please do. (See `LICENSE.md` for the full terms of this extensive licensing model)
