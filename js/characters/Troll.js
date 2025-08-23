import Character from "./Сharacter.js";

export default class Troll extends Character {
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

  attack() {
    return this.choiceRandomSkills();
  }

  choiceRandomSkills(type = 'attack') {
    const map = new Map();
    let count = 0;
    const countSkills = type === 'attack' ? this.countAttack : this.countProtection;
    const arrSkills = this.skills[type]; 
    while(count < countSkills){
      let el = arrSkills[Math.floor(Math.random() * arrSkills.length)]
      if(!map.has(el)) {
        el.active = true;
        map.set(el, el);
        count++;
      }
    }
    
    return Array.from(map.values());
  }

}
// Math.random