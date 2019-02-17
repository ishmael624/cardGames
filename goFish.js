"use strict";

// play go fish with the console in your browser

const cardGame = require('./cardGame')
let deck = cardGame.Deck(),
	  Player = cardGame.Player();

// Add functionality to the Player prototype
Player.pairs = [];
Player.score = function playerScore() {
	return this.pairs.length;
}
// ask function is going to need a lot of work I think
// so far I think the matching aspect is a workable block; the issue comes with id'ing cards
// this.hand.inlcudes(card) would always return false because hand is a 2d array
// search the 2d array for the text?
// if 'card' is rank only ('ace'), check hand[i][2], if full name ('ace of hearts'), check hand[i][0]
// OR hand is not an array but an object with a method to check for a particular card...
Player.ask = function playerAsk(card,opponent) {
	card = card.toLowerCase();
	if (this.hand.includes(card)) {
		for (let i = 0; i < opponent.hand.length; i++) {
			if (card[2] == opponent.hand[i][2]) {
				this.pairs.push( [this.hand.splice(card,1),opponent.hand.splice(i,1)] )
				break;
			}
		}
	}
}
