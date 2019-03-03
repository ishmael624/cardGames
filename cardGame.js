"use strict";

// standard card game setup
// 52-card deck
// player prototype with hand property and draw method


// Should the CardGame get to shuffle, or the player? kinda think the player
function CardGame() {
	this.suits = ['spades','hearts','clubs','diamonds'];
	this.ranks = ['ace','two','three','four','five','six','seven','eight','nine','ten','jack','queen','king'];
	this.deck = [];
	this.buildDeck = function buildDeck() {
		let suitsLength = this.suits.length,
				ranksLength = this.ranks.length;
		for (let i = 0; i < suitsLength; i++) {
			for (let j = 0; j < ranksLength; j++) {
				this.deck.push({
						suit : this.suits[i],
						rank : this.ranks[j],
						get name() {
							return `${this.suit} of ${this.rank}`
						}
					})
				}
			}
		console.log("Grabbed your favorite deck of cards.");
		return this.deck;
	}
	this.shuffleDeck = function shuffleDeck() {
		let shuffled = [],
			  deck = this.deck;
		while (deck.length) {
			let nextCard = deck.splice( Math.floor(Math.random()*deck.length),1 );
			shuffled.push(nextCard);
		}
		this.deck = shuffled;
		console.log("Your deck is all shuffled up.");
		return this.deck;
	}
	return this;
};

function Player (name) {
	this.name = name;
	this.hand = [];
	this.draw = function draw(deck) {
		let card = deck.pop();
		this.hand.push(card);
	};
	this.deal = function deal(deck,handSize,players) {
		for (let i = 0; i<handSize; i++) {
			for (let j = 0; j<players.length; j++) {
				let nextCard = deck.pop();
				players[j].hand.push(nextCard);
			}
		}
	};
	return this;
}
