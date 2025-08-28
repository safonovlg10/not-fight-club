import Character from "./Сharacter.js";

export default class Knight extends Character {
    constructor({name, avater, health, protection, countAttack, countProtection}) {
        super({name, avater, health, protection, countAttack, countProtection})
        this.countAttack = countAttack;
        this.countProtection = countProtection;
        
    }

    // attack() {
    //     console.log("Knight");
    // }
}