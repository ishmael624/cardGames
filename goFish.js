"use strict";

// logging
const { createLogger, format, transports } = require('winston');
const { prettyPrint } = format;
const logger = createLogger({
  format: prettyPrint(),
  transports: [ new transports.File({ filename: 'game-history.log', level: 'silly' }) ]
})
// custom functions a la Marijn Haverbeke
function forEach(arr,func) {
  let len = arr.length;
  for(let i = 0; i < len; i++){
    func(arr[i])
  }
}
function rand(lowerBound,upperBound) {
  return lowerBound + Math.floor(Math.random()*upperBound)
}


// create the deck
let suits = ['spades','hearts','clubs','diamonds'];
let ranks = ['ace','two','three','four','five','six','seven','eight','nine','ten','jack','queen','king'];
let deck = [];
for (let s = 0; s < suits.length; s++) {
  for (let r = 0; r < ranks.length; r++) {
    deck.push({
      suit : suits[s],
      rank : ranks[r],
      name : `${ranks[r]} of ${suits[s]}`,
      value : r + 1
    })
  }
}

// Player class
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.score = 0;
        this.draw = function draw() {
          this.hand.push(deck.pop()[0])
        };
        this.ask = function ask(play,opponent) {
          let match = false;
          for (let card = 0; card < opponent.hand.length; card++ ) {
            if (opponent.hand[card].rank == this.hand[play]) {
              match = true;
              opponent.splice(card,1);
              this.hand.splice(play,1);
              this.score++;
              break;
            }
          }
          return match;
        };
        return this;
    }
}

// create players
let p1 = new Player('One');
let p2 = new Player('Two');
let players = [p1,p2];

// shuffle the deck
let shuffledDeck = [];
while (deck.length) {
    shuffledDeck.push(deck.splice( rand(0,deck.length), 1 )
  )
};
deck = shuffledDeck;
shuffledDeck = null;
// logger.info(deck)

// deal hands
function deal(player,handSize=5) {
  while (player.hand.length < handSize) {
    let card = deck.pop()[0];
    player.hand.push(card)
  }
}
forEach(players,deal);

// log our initial conditions
// logger.info(p1.name + " hand: " + JSON.stringify(p1.hand));
// logger.info(p2.name + " hand: " + JSON.stringify(p2.hand));
// logger.info('Deck: ' + JSON.stringify(deck))

// GAME LOOP
let turn = 0; // turn counter
while (p2.hand.length && p1.hand.length && deck.length) { // stop the game if someone runs out of cards, or if the deck depletes

    let activePlayer = players[turn%2]; // even turns are for the first player, odd turns are for the second
    let opponent = players[(turn+1)%2]; // sets the opponent
    let play = rand(0,activePlayer.hand.length)// the play is the index of random a card from the activePlayer's hand
    // let match = false;

    // log info about our current player
    // logger.log({
    //   level: 'info',
    //   activePlayer: activePlayer.name,
    //   play: activePlayer.hand[play]
    // });

    let match = activePlayer.ask(play,opponent);

    if (match == false && deck.length) { activePlayer.draw() }; // if we got through the whole loop without setting match to TRUE, then activePlayer draws
    turn++; // increment the turn

    // log our output for each turn
    // logger.log({
    //   level : 'info',
    //   message : 'Turn ended',
    //   p1Score : p1.score,
    //   p1hand : JSON.stringify(p1.hand),
    //   p2score : p2.score,
    //   p2hand : JSON.stringify(p2.hand)
    // })

} // while loop ends if someone runs out of cards or if the deck depletes

let gameInfo = {
  numTurns: 0,
  winner: '',
  playerScores: {}
}

gameInfo.numTurns = turn;
if (p1.score > p2.score) {
  gameInfo.winner = p1.name;
} else if (p1.score < p2.score) {
  gameInfo.winner = p2.name;
} else {
  gameInfo.winner = 'Tie';
};

gameInfo.playerScores[p1.name] = p1.score;
gameInfo.playerScores[p2.name] = p2.score;

logger.info(JSON.stringify(gameInfo))
