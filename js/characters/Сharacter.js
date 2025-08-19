export default class Character {
  constructor(name, avatar, health, protection) {
    if (new.target === Character) {
      throw new Error("Нельзя создать экземпляр абстрактного класса Character");
    }
    this.bodyParts = {
      head: {type: 'helmet', protection: 20},
      torso: {},
      legs: {},
      arms: {},
    };

    this.name = name;
    this.avater = avatar;
    this.health = health;
    this.protection = protection;
    this.inventory = [];

  }  
  takeDamage(damage) {

  }
  attack(target) {

  }
}
