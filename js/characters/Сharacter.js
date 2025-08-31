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
    this.isCrit = false;
    (this.critChance = 0.20), (this.countActiveAttack = 0);
    this.countActiveProtection = 0;

    this.skills = {
      attack: [
        {
          name: "head",
          damage: (isCrit, protection) =>
            this.calculateDamage(125, protection, isCrit),
          active: false,
        },
        {
          name: "neck",
          damage: (isCrit, protection) =>
            this.calculateDamage(120, protection, isCrit),
          active: false,
        },
        {
          name: "body",
          damage: (isCrit, protection) =>
            this.calculateDamage(115, protection, isCrit),
          active: false,
        },
        {
          name: "legs",
          damage: (isCrit, protection) =>
            this.calculateDamage(110, protection, isCrit),
          active: false,
        },
      ],
      protection: [
        { name: "head", active: false },
        { name: "neck", active: false },
        { name: "body", active: false },
        { name: "legs", active: false },
      ],
    };
  }
  restoreSkills(obj) {
        this.skills = {
      attack: [
        {
          name: "head",
          damage: (isCrit, protection) =>
            this.calculateDamage(125, protection, isCrit),
          active: obj.attack[0].active,
        },
        {
          name: "neck",
          damage: (isCrit, protection) =>
            this.calculateDamage(120, protection, isCrit),
          active: obj.attack[1].active,
        },
        {
          name: "body",
          damage: (isCrit, protection) =>
            this.calculateDamage(115, protection, isCrit),
          active: obj.attack[2].active,
        },
        {
          name: "legs",
          damage: (isCrit, protection) =>
            this.calculateDamage(110, protection, isCrit),
          active: obj.attack[3].active,
        },
      ],
      protection: [
        { name: "head", active: obj.protection[0].active },
        { name: "neck", active: obj.protection[1].active },
        { name: "body", active: obj.protection[2].active },
        { name: "legs", active: obj.protection[3].active },
      ],
    };
  }
  getActiveProtectionSkills() {
    return this.skills.protection.filter((el) => el.active === true);
  }

  calculateDamage(baseDamage, protection, isCrit, critMultiplier = 1.5) {
    let damage = baseDamage;

    if (isCrit) {
      damage *= critMultiplier;
    }

    const finalDamage = Math.floor(damage * (100 / (100 + protection)));

    return finalDamage;
  }










  takeDamage(attack, isCrit, protectionHero, skillsProtection) {
    let sumDamage = 0;
    
      if (isCrit) {
        const damage = attack.damage(isCrit, protectionHero);
        this.health -= damage;
        sumDamage = damage;
        if (this.health <= 0) {
          this.health = 0;
          this.kill = true;
        }
      } else {
        skillsProtection.forEach((protection) => {
          if (attack.name === protection.name) {
            if (!protection.active) {
              const damage = attack.damage(isCrit, protectionHero);
              this.health -= damage;
              sumDamage = damage;
              if (this.health <= 0) {
                this.health = 0;
                this.kill = true;
              }
            }
          }
        });
      }
    
    return sumDamage;
  }
  attack() {
    const activeAttack = this.skills.attack.filter(
      (objAttack) => objAttack.active === true
    );
    return activeAttack;
  }

  checkCountActiveSkills(list, id) {
    const [type] = id.split("-");
    if (type === "attack") {
      const count = list[type].filter((el) => el.active === true).length;
      if (count >= this.countAttack) return false;
    } else if (type === "protection") {
      const count = list[type].filter((el) => el.active === true).length;
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
        if (skills === "attack") {
          if (!element.active) {
            this.countActiveAttack++;
          } else {
            this.countActiveAttack--;
          }
        }
        if (skills === "protection") {
          if (!element.active) {
            this.countActiveProtection++;
          } else {
            this.countActiveProtection--;
          }
        }
        element.active = !element.active;
      }
    }
  }

  removeAllActiveSkillsInObj() {
    for (const key in this.skills) {
      for (const element of this.skills[key]) {
        if (element.active) {
          element.active = false;
        }
      }
    }
  }
  resetHero() {
    this.removeAllActiveSkillsInObj();
    this.countActiveAttack = 0;
    this.countActiveProtection = 0;
    this.health = this.healthStatic;
    this.kill = false;
  }
}
