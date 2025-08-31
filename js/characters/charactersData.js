import Knight from "./Knight.js";
import LadyBlade from "./LadyBlade.js";
import Archer from "./archer.js";
import Troll from "./Troll.js";
import Shaman from "./Shaman.js";
import Skeleton from "./Skeleton.js";
import Vampire from "./Vampire.js";

const knight = new Knight({
  name: "Knight",
  avater: "Knight.jpeg",
  health: 1500,
  protection: 50,
  countAttack: 1,
  countProtection: 3,
});

const archer = new Archer({
  name: "Archer",
  avater: "2_1.jpeg",
  health: 1100,
  protection: 200,
  countAttack: 2,
  countProtection: 2,
});
const solitaryMagician = new Archer({
  name: "Solitarymagician",
  avater: "solitary-magician.jpg",
  health: 1100,
  protection: 100,
  countAttack: 2,
  countProtection: 2,
});
const ladyBlade = new LadyBlade({
  name: "LadyBlade",
  avater: "LadyBlade.jpg",
  health: 1200,
  protection: 30,
  countAttack: 3,
  countProtection: 3,
});



const troll = new Troll({
  name: "Troll",
  avater: "troll2.jpg",
  health: 1750,
  protection: 50,
  countAttack: 2,
  countProtection: 3,
});
const shaman = new Shaman({
  name: "Shaman",
  avater: "shaman.jpg",
  health: 950,
  protection: 50,
  countAttack: 2,
  countProtection: 1,
});
const skeleton = new Skeleton({
  name: "Skeleton",
  avater: "skeleton.jpg",
  health: 1300,
  protection: 80,
  countAttack: 1,
  countProtection: 3,
});
const vampire = new Vampire({
  name: "Vampire",
  avater: "vampire.jpg",
  health: 1300,
  protection: 100,
  countAttack: 1,
  countProtection: 3,
});

export const playerCharacter = {
  knight: knight,
  archer: archer,
  solitarymagician: solitaryMagician,
  ladyblade: ladyBlade,
};

export const enemyCharacter = {
  troll: troll,
  shaman: shaman,
  skeleton: skeleton,
  vampire: vampire,
   
};
