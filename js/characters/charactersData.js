import Knight from "./Knight.js";
import Troll from "./Troll.js";
import Archer from "./archer.js";

const knight = new Knight({
  name: "Knight",
  avater:
    "491-4918344_purple-medieval-knight-fantasy-knight-png-transparent-png.png",
  health: 1500,
  protection: 20,
  countAttack: 2,
  countProtection: 2,
});

const archer = new Archer({
  name: "Archer",
  avater:
    "pngtree-ornate-white-and-gold-fantasy-knight-armor-with-swords-insectoid-legs-png-image_16699743.webp",
  health: 1200,
  protection: 200,
  countAttack: 2,
  countProtection: 2,
});

const troll = new Troll({
  name: "Troll",
  avater: "default.jpg",
  health: 1750,
  protection: 50,
  countAttack: 2,
  countProtection: 2,
});

export const playerCharacter = {
  knight: knight,
  archer: archer,
};

export const enemyCharacter = {
  troll: troll,
};

// export const Heroes = {
//     playerCharacterData: playerCharacter,
//     enemyCharacterData: enemyCharacter,
// }
