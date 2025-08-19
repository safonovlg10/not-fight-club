import Knight from "./Knight.js";
import Troll from "./Troll.js";
import Archer from "./archer.js";

const knight = new Knight(
  "Knight",
  "491-4918344_purple-medieval-knight-fantasy-knight-png-transparent-png.png",
  1500,
  300
);
const archer = new Archer(
  "Archer",
  "pngtree-ornate-white-and-gold-fantasy-knight-armor-with-swords-insectoid-legs-png-image_16699743.webp",
  750,
  200
);
const troll = new Troll(
  "Troll",
  "491-4918344_purple-medieval-knight-fantasy-knight-png-transparent-png.png",
  1500,
  300
);

const playerCharacter = {
  knight: knight,
  archer: archer,
};

const enemyCharacter = {
  troll: troll,
};

export const Heroes = {
    playerCharacterData: playerCharacter,
    enemyCharacterData: enemyCharacter,
} 
