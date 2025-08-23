import Character from "./Сharacter.js";

export default class Archer extends Character {
    constructor({name, avater, health, protection}) {
        super({name, avater, health, protection})
    }

    attack() {
        console.log("Knight");
    }
}