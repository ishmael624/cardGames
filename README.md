# Card Games
cardGame.js features a Deck object and a Player object. These are imported (I'm using Node.js here) into the game at hand. So far it's just Go Fish.
## Go Fish
goFish.js will deal 5 random cards from Deck to the player at the console and an automated player. A Player on their turn can ask their opponent to match a card from the player's hand; 
the match exists the player gains the pair, and if not the player must draw. When a hand diminishes to 0 cards, the game is done and the player with the greater number of pairs wins.
