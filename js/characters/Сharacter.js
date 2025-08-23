export default class Character {
  constructor({
    name,
    avater,
    health,
    protection,
    countAttack,
    countProtection,
  }) {
    if (new.target === Character) {
      throw new Error("Нельзя создать экземпляр абстрактного класса Character");
    }
    this.bodyParts = {
      head: { type: "helmet", protection: 20 },
      torso: {},
      legs: {},
      arms: {},
    };
    this.healthStatic = health;
    this.kill = false;
    this.name = name;
    this.avater = avater;
    this.health = health;
    this.protection = protection;
    this.inventory = [];
    this.countAttack = countAttack;
    this.countProtection = countProtection;
    this.skills = {
      attack: [
        { name: "head", damage: 125, active: false },
        { name: "neck", damage: 80, active: false },
        { name: "body", damage: 50, active: false },
        { name: "legs", damage: 25, active: false },
      ],
      protection: [
        { name: "head", active: false },
        { name: "neck", active: false },
        { name: "body", active: false },
        { name: "legs", active: false },
      ],
    };
  }
  takeDamage(damage) {
    damage.forEach((attack) => {
      this.skills.protection.forEach((protection) => {
        if (attack.name === protection.name) {
          if (protection.active) {
            this.health -= attack.damage;

            if (this.health <= 0) {
              this.health = 0;
              this.kill = true;
            }
          }
        }
      });
    });
  }
  attack() {
    const activeAttack = this.skills.attack.filter(
      (objAttack) => objAttack.active === true
    );
    return activeAttack;
  }

  checkCountActiveSkills(list, id) {
    const [skills] = id.split("-");
    if (skills === "attack") {
      const count = list[skills].filter((el) => el.active === true).length;
      if (count >= this.countAttack) return false;
    } else if (skills === "protection") {
      const count = list[skills].filter((el) => el.active === true).length;
      if (count >= this.countProtection) return false;
    }
    return true;
  }

  checkActiveSkill(listSkils, id) {
    const [skills, nameSkills] = id.split("-");

    for (const element of listSkils[skills]) {
      if (element.name === nameSkills) {
        return element.active;
      }
    }
  }

  setActiveSkillInObj(listSkils, id) {
    const [skills, nameSkills] = id.split("-");
    for (const element of listSkils[skills]) {
      if (element.name === nameSkills) {
        element.active = !element.active;
      }
    }
  }

  removeAllActiveSkillsInObj(listSkils) {
    for (const skills of listSkils) {
      for (const element of skills) {
        if (element.active) {
          element.active = false;
        }
      }
    }
  }
}
