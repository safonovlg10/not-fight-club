import Knight from "./Knight.js";
import Troll from "./Troll.js";
import Archer from "./archer.js";

const knight = new Knight({
  name: "Knight",
  avater:
    "491-4918344_purple-medieval-knight-fantasy-knight-png-transparent-png.png",
  health: 1500,
  protection: 300,
  countAttack: 1,
  countProtection: 2,
  skills: {
    attack: [
        { name: 'head', damage: 125, active: false }, 
        { name: 'neck', damage: 80, active: false }, 
        { name: 'body', damage: 50, active: false }, 
        { name: 'legs', damage: 25, active: false },  
    ],
    protection: [
        { name: 'head', active: false }, 
        { name: 'neck', active: false }, 
        { name: 'body', active: false }, 
        { name: 'legs', active: false },
    ],
  },
});

const archer = new Archer({
  name: "Archer",
  avater:
    "pngtree-ornate-white-and-gold-fantasy-knight-armor-with-swords-insectoid-legs-png-image_16699743.webp",
  health: 750,
  protection: 200,
  countAttack: 2,
  countProtection: 2,
});

const troll = new Troll({
  name: "Troll",
  avater: "default.jpg",
  health: 1750,
  protection: 300,
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
