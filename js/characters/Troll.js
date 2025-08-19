import Character from "./Сharacter.js";

export default class Troll extends Character {
    constructor(name, avater, health, protection) {
        super(name, avater, health, protection)
    }

    attack() {
        console.log("Troll");
    }
}