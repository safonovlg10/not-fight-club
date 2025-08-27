import Character from "./Сharacter.js";

export default class Archer extends Character {
    constructor({name, avater, health, protection, countAttack, countProtection}) {
        super({name, avater, health, protection, countAttack, countProtection})
    }

    // attack() {
    //     console.log("Knight");
    // }
}