"use strict";

// standard card game setup
// 52-card deck
// player prototype with hand property and draw method


// Deck object
exports.Deck = function() {
	this.suits = ['spades','hearts','clubs','diamonds'];
	this.ranks = ['ace','two','three','four','five','six','seven','eight','nine','ten','jack','queen','king'];
	let suitsLength = this.suits.length,
			ranksLength = this.ranks.length,
			deck = [];

	for (let i = 0; i < suitsLength; i++) {
		for (let j = 0; j < ranksLength; j++) {

			deck.push(
				{
					name : this.ranks[j]+' of '+this.suits[i],
					suit : this.suits[i],
					rank : this.ranks[j]
				}
			)
		}
	}

	console.log("Grabbed your favorite deck of cards")
	return deck
}

// player object
exports.Player = function(name) {
	this.name = name;
	this.hand = [];
	// draw method gives player ability to remove elements from Deck array
	this.draw = function playerDraw(deck) {
		let card = deck.splice(Math.floor(Math.random()*deck.length),1);
		this.hand.push(card);
	}

	return this;
}

// // hand object
// exports.Hand = function() {
//
// }
