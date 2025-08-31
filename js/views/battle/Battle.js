import {
  playerCharacter,
  enemyCharacter,
} from "../../characters/charactersData.js";
import characterCard from "../../components/battleComponent/characterCard.js";
import zoneSelector from "../../components/battleComponent/zoneSelector.js";
import battleLogo from "../../components/battleComponent/LogBattle.js";
import modalEndGame from "../../components/battleComponent/modalEndGame.js";


export default class Battle {
  render() {

    let playerHero;
    let enemyHero;
    const isSaveBattle = JSON.parse(localStorage.getItem('User')).battle;
    
    if(isSaveBattle){

      const playerHeroObj = this.getHeroIsLocalStorage('playerHero');
      const enemyHeroObj = this.getHeroIsLocalStorage('enemyHero');
  
      Object.setPrototypeOf(playerHeroObj, playerCharacter[playerHeroObj.name.toLowerCase()]);
      Object.setPrototypeOf(enemyHeroObj, enemyCharacter[enemyHeroObj.name.toLowerCase()]);

      playerHeroObj.restoreSkills(playerHeroObj.skills);
      enemyHeroObj.restoreSkills(enemyHeroObj.skills);
   
      playerHero = playerHeroObj;
      enemyHero = enemyHeroObj;
    } else {

      playerHero = this.getHero(playerCharacter, "activeHero");
      enemyHero = this.getHero(enemyCharacter, "enemyHero");
    }


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
    this.updateHealth(playerCart, playerHero.health, playerHero.healthStatic);
    this.updateHealth(enemyCart, enemyHero.health, enemyHero.healthStatic);

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

    if(playerHero.countActiveAttack === playerHero.countAttack && playerHero.countActiveProtection === playerHero.countProtection) {
      btnAttack.disabled = false;
      btnAttack.classList.remove('btn--disabled');
    } else {
      btnAttack.classList.add('btn--disabled');
      btnAttack.disabled = true;
    }

    const logoBox = battleLogo();
    div.append(logoBox);
    if(isSaveBattle) {
      const logoList = logoBox.querySelector('.log-list');
      logoList.innerHTML = isSaveBattle.logo;
    }
    
    

    const modalWindowEndGame = document.createElement("div");
    modalWindowEndGame.id = "modal-end-game";
    modalWindowEndGame.classList.add('modal' ,"modal-end-game");
    div.append(modalWindowEndGame);

    btnAttack.addEventListener("click", () => {
      this.battleMode(playerHero, enemyHero, playerCart, enemyCart);
    });

    const userName = document.querySelector("#nameUser");
    userName.textContent = `Ваше имя: ${
      JSON.parse(localStorage.getItem("User")).name
    }`;
   
    return div;
  }
  getPrototypeOfObj(obj, name) {
    return obj[name.toLowerCase()];
  }

  setSatistics(hero, type) {
    const user = JSON.parse(localStorage.getItem('User'));
    console.log(user)
    if(user.statistics.length === 0) {
      const obj = {
        name: hero,
        win: 0,
        los: 0,
      }
      obj[type] += 1;
      user.statistics.push(obj);
      localStorage.setItem('User', JSON.stringify(user));
    } else {
      
      const obj = user.statistics.find((el) => el.name === hero);
      if(!obj) {
        
        const obj = {
          name: hero,
          win: 0,
          los: 0,
        }
        obj[type] += 1;
        user.statistics.push(obj);
      } else {
        obj[type] += 1;
      }
      
      localStorage.setItem('User', JSON.stringify(user));
      
    }
  }

  openModalEndGame(hero, massage) {
    const modal = document.querySelector('.modal-end-game');
    modal.innerHTML = '';
    modal.append(modalEndGame(hero, massage));
    modal.style.display= 'block';

    modal.querySelector('.close-btn').addEventListener('click', () => {
      modal.style.display= 'none';
    })
    modal.querySelector('.btnRedirect').addEventListener('click', () => {
      location.hash = '/';
    })
  }

  addLog(message) {
    const ul = document.querySelector(".log-list");
    const li = document.createElement("li");
    li.innerHTML = message;
    ul.append(li);
    return ul.innerHTML;
  }
  clearLogo() {
    const ul = document.querySelector(".log-list");
    ul.innerHTML = "";
  }

  getHero(playerCharacter, nameId) {
    const playerName = JSON.parse(localStorage.getItem("User"))[nameId].toLowerCase();
    return playerCharacter[playerName];
  }
   getHeroIsLocalStorage(player) {
    const hero = JSON.parse(localStorage.getItem("User"));
    return hero.battle[player];
   }

  playerAttack(playerHero, enemyHero, enemyCart) {
    enemyHero.isCrit = Math.random() < enemyHero.critChance;
    let logo = null;
    const attack = playerHero.attack();
    const damage = enemyHero.takeDamage(attack, enemyHero.isCrit, enemyHero.protection, enemyHero.skills.protection);
    this.updateHealth(enemyCart, enemyHero.health, enemyHero.healthStatic);
    if (enemyHero.isCrit) {
      logo = this.addLog(
        `<span class="logo-name-player">${
          playerHero.name
        }</span>: <span class="logo-crit-damage"> Нанес Критический удар </span>${this.parseSkillsLog(
          attack
        )}, враг защищался: ${this.parseSkillsLog(
          enemyHero.getActiveProtectionSkills()
        )} → <span class="logo-crit-damage">${damage} урона</span>`
      );
      const logoConteiner = document.querySelector('.battle-log__container');
      logoConteiner.scrollTop = logoConteiner.scrollHeight;
    } else {
      logo = this.addLog(
        `<span class="logo-name-player">${
          playerHero.name
        }</span>: Нанес удар ${this.parseSkillsLog(
          attack
        )}, враг защищался: ${this.parseSkillsLog(
          enemyHero.getActiveProtectionSkills()
        )} → ${damage} урона`
      );
      const logoConteiner = document.querySelector('.battle-log__container');
      logoConteiner.scrollTop = logoConteiner.scrollHeight;
    }
    this.saveCurrentBattle(playerHero, enemyHero, logo)
    return enemyHero.kill;
  }

  parseSkillsLog(skills) {
    return skills.map((el) => el.name).join(", ");
  }
  enemyAttack(playerHero, enemyHero, playerCart) {
    playerHero.isCrit = Math.random() < playerHero.critChance;
    let logo = null;
    const attack = enemyHero.attack();
    const damage = playerHero.takeDamage(attack, playerHero.isCrit, playerHero.protection, playerHero.skills.protection);
    this.updateHealth(playerCart, playerHero.health, playerHero.healthStatic);
    if (playerHero.isCrit) {
      logo = this.addLog(
        `<span class="logo-name-enemy">${
          enemyHero.name
        }</span>: <span class="logo-crit-damage"> Нанес Критический удар </span>${this.parseSkillsLog(
          attack
        )}, вы поставили защиту: ${this.parseSkillsLog(
          playerHero.getActiveProtectionSkills()
        )} → <span class="logo-crit-damage">${damage} урона</span>`
      );
      const logoConteiner = document.querySelector('.battle-log__container');
      logoConteiner.scrollTop = logoConteiner.scrollHeight;
    } else {
      logo = this.addLog(
        `<span class="logo-name-enemy">${
          enemyHero.name
        }</span>: Нанес удар ${this.parseSkillsLog(
          attack
        )}, вы поставили защиту: ${this.parseSkillsLog(
          playerHero.getActiveProtectionSkills()
        )} → ${damage} урона`
      );
      const logoConteiner = document.querySelector('.battle-log__container');
      logoConteiner.scrollTop = logoConteiner.scrollHeight;
    }
    this.saveCurrentBattle(playerHero, enemyHero, logo);
    return playerHero.kill;
  }

  saveCurrentBattle(playerHero, enemyHero, logo) {
    const user = JSON.parse(localStorage.getItem('User'));
    if(!user.battle){
      const obj = {
        playerHero: playerHero,
        enemyHero: enemyHero,
        logo: [logo],
      }
      user.battle = obj;
      localStorage.setItem('User', JSON.stringify(user));
    }
    
    user.battle.playerHero = playerHero;
    user.battle.enemyHero = enemyHero;
    user.battle.logo = logo;
    localStorage.setItem('User', JSON.stringify(user));
  }
  deleteCurrentBattle() {
    const user = JSON.parse(localStorage.getItem('User'));
    user.battle = null;
    localStorage.setItem('User', JSON.stringify(user));

  }

  battleMode(playerHero, enemyHero, playerCart, enemyCart) {
    if (playerHero.health > 0 && enemyHero.health > 0) {
        enemyHero.choiceRandomSkills("protection");

      if (this.playerAttack(playerHero, enemyHero, enemyCart)) {
        this.setSatistics(playerHero.name, 'win');
        this.openModalEndGame(playerHero, 'Бой окончен Вы одержали победу');
        this.resetBattle(playerHero, enemyHero, playerCart, enemyCart);
        this.clearLogo();
        this.deleteCurrentBattle();

      } else if (this.enemyAttack(playerHero, enemyHero, playerCart)) {
        this.setSatistics(playerHero.name, 'los');
        this.openModalEndGame(playerHero, 'Бой окончен Вы одержали порожение');
        this.resetBattle(playerHero, enemyHero, playerCart, enemyCart);
        this.clearLogo();
        this.deleteCurrentBattle();

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
