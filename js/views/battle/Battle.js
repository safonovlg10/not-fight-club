import {
  playerCharacter,
  enemyCharacter,
} from "../../characters/charactersData.js";
import characterCard from "../../components/battleComponent/characterCard.js";
import zoneSelector from "../../components/battleComponent/zoneSelector.js";
import battleLogo from "../../components/battleComponent/LogBattle.js";

export default class Battle {
  render() {
    const playerHero = this.getHero(playerCharacter, "activeHero");
    const enemyHero = this.getHero(enemyCharacter, "enemyHero");

    const div = document.createElement("div");
    div.classList.add("home__container");

    const playerCart = characterCard(
      playerHero.name,
      playerHero.avater,
      playerHero.health,
      playerHero.healthStatic
    );
    const enemyCart = characterCard(
      enemyHero.name,
      enemyHero.avater,
      enemyHero.health,
      enemyHero.healthStatic
    );

    const battleControls = document.createElement("div");
    battleControls.classList.add("skills__container");
    battleControls.innerHTML = `<p class="text-info">Выберите ваши действие</p>`;

    const controlsBox = document.createElement("div");
    controlsBox.classList.add("battle-controls");

    const attack = zoneSelector("attack", playerHero.skills, playerHero);
    const protection = zoneSelector(
      "protection",
      playerHero.skills,
      playerHero
    );

    const separator = document.createElement("div");
    separator.classList.add("separator");

    controlsBox.append(attack, separator, protection);

    const btnAttack = document.createElement("button");
    btnAttack.type = "button";
    btnAttack.classList.add("btn", "btnAttack");
    btnAttack.textContent = "Атаковать";
    btnAttack.disabled = true;
    btnAttack.classList.add("btn--disabled");

    battleControls.append(controlsBox, btnAttack);

    div.append(playerCart, battleControls, enemyCart);

    const logoBox = battleLogo();
    div.append(logoBox);

    btnAttack.addEventListener("click", () => {
      this.battleMode(playerHero, enemyHero, playerCart, enemyCart);
    });

    const userName = document.querySelector("#nameUser");
    userName.textContent = `Ваше имя: ${JSON.parse(localStorage.getItem('User')).name}`;
    return div;
  }

  addLog(message) {
    const ul = document.querySelector(".log-list");
    const li = document.createElement("li");
    li.textContent = message;
    ul.append(li);
  }
  clearLogo() {
    const ul = document.querySelector(".log-list");
    ul.innerHTML = '';
  }

  getHero(playerCharacter, nameId) {
    const playerName = JSON.parse(localStorage.getItem("User"))[
      nameId
    ].toLowerCase();
    return playerCharacter[playerName];
  }

  playerAttack(playerHero, enemyHero, enemyCart) {
    const attack = playerHero.attack();
    const damage = enemyHero.takeDamage(attack);
    this.updateHealth(enemyCart, enemyHero.health, enemyHero.healthStatic);
    this.addLog(`${playerHero.name}: Нанес удар ${this.parseSkillsLog(attack)}, враг защищался: ${this.parseSkillsLog(enemyHero.getActiveProtectionSkills())} → ${damage} урона`);
    return enemyHero.kill;
  }

  parseSkillsLog(skills) {
    return skills.map((el => el.name)).join(', ');
  }
  enemyAttack(playerHero, enemyHero, playerCart) {
    const attack = enemyHero.attack();
    const damage = playerHero.takeDamage(attack);
    this.updateHealth(playerCart, playerHero.health, playerHero.healthStatic);
    this.addLog(`${enemyHero.name}: Нанес удар ${this.parseSkillsLog(attack)}, вы защищался: ${this.parseSkillsLog(playerHero.getActiveProtectionSkills())} → ${damage} урона`);
    return playerHero.kill;
  }

  battleMode(playerHero, enemyHero, playerCart, enemyCart) {
    if (playerHero.health > 0 && enemyHero.health > 0) {
      const enemyProtectionActiveSkills = enemyHero.choiceRandomSkills("protection");
      console.log(enemyProtectionActiveSkills, enemyHero)
      if (this.playerAttack(playerHero, enemyHero, enemyCart)) {
        console.log("бой окончен проиграл enemyHero");
        this.resetBattle(playerHero, enemyHero, playerCart, enemyCart);
        this.clearLogo();
      } else if (this.enemyAttack(playerHero, enemyHero, playerCart)) {
        console.log("бой окончен проиграл playerHero");
        this.resetBattle(playerHero, enemyHero, playerCart, enemyCart);
        this.clearLogo();
      }
    }

    enemyHero.removeAllActiveSkillsInObj(); 

  }

  updateHealth(heroCard, heroHealth, healthStatic) {
    const lable = heroCard.querySelector(".health-bar--label");
    lable.textContent = `${heroHealth}/${healthStatic}`;
    const progress = heroCard.querySelector(".health-bar--progress");
    progress.style.width = `${(heroHealth / healthStatic) * 100}%`;
  }

  resetActiveClass() {
    const listSkils = document.querySelectorAll(".check-box__container");
    listSkils.forEach((el) => el.classList.remove("check-box--active"));
  }

  resetBattle(playerHero, enemyHero, playerCart, enemyCart) {
    enemyHero.resetHero();
    playerHero.resetHero();
    this.updateHealth(enemyCart, enemyHero.health, enemyHero.healthStatic);
    this.updateHealth(playerCart, playerHero.health, playerHero.healthStatic);
    this.resetActiveClass();
    const btnAttack = document.querySelector(".btnAttack");
    btnAttack.classList.add("btn--disabled");
  }
}
