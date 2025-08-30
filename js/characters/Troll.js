import EnemyСharacter from "./enemyСharacter.js";

export default class Troll extends EnemyСharacter {
  constructor({
    name,
    avater,
    health,
    protection,
    countAttack,
    countProtection,
  }) {
    super({ name, avater, health, protection });
    this.countAttack = countAttack;
    this.countProtection = countProtection;
  }

}
// Math.random