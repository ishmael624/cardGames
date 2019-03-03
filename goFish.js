"use strict";

// play go fish with the console in your browser

// const cardGame = require('./cardGame');
let Deck = cardGame.Deck();
let Player = cardGame.Player;

// Add functionality to the Player prototype
Player.pairs = [];
Player.score = function playerScore() {
	return this.pairs.length;
}
Player.ask = function playerAsk(card,opponent) {
	// check function to find and element in a set
	function inSet(elem,set) {
		let l = set.length;
		for (let i = 0; i < l; i++) {
			if (set[i] == elem) {
				return true;
			} else {
				return false
			}
		}
	}
	// is the card being asked for even in the player's hand?
	card = card.toLowerCase();

	if (inSet(card,Player.hand)) {
		if (inSet(card,opponent.hand)) {
			console.log("You got a match!")
			let match = [Player.hand.splice(card,1),
										opponent.hand.splice(card,1)]; // obviously dumb, how do we translate the card arg to a useable reference for the deck?
			Player.pairs.push(match);
		} else {
			console.log("You gotta draw another one")
			Player.draw();
		}
	} else {
		return console.error("Card ain't in your hand, mack");
	}
}
