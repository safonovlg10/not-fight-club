import Character from "./Сharacter.js";

export default class Troll extends Character {
    constructor({name, avater, health, protection, countAttack, countProtection}) {
        super({name, avater, health, protection})
        this.countAttack = countAttack;
        this.countProtection = countProtection;
    }

    attack() {
      const activeAttack = this.skills.attack.filter(
      (objAttack) => objAttack.active === true
    );
    return activeAttack;
  }
}