## Simple Tic Tac toe
Created by William Leung

Original submission to 8th Light.

#### Specifications

- Allow for a human player
- Play against a computer player
- Have some user interface (text is fine)
- Never lose and win whenever possible
- Can use any language

#### How to run
Open html file with any browser.

#### How to build
Used Webpack to bundle my code.
In the command line: `npm run build`

#### How to test
Run the test.js file with mocha: `npm run test`

Have mocha in your local by using:
`npm install --global mocha`


#### Process #1
- I previously created a Tic Tac Toe game in JS to play against an AI using the minimax algorithm. I'm reusing some of the previous code to implement into this assignment.
- This time, I need to build with an option to play against a human player or a computer. I build the application using closures to break my methods with a single responsibility while following the MVC design.
- I used Mocha testing to check all my variables are running as it purpose.

#### Process #2
- I decided to refactor my game into a OOP approach since SOLID is the foundation of OOP. My previous code was a procedural programming approach.
- I separated all my classes into its own files.
