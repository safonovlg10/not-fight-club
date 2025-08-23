import { playerCharacter, enemyCharacter } from "../../characters/charactersData.js";
import characterCard from "../../components/battleComponent/characterCard.js";
import zoneSelector from "../../components/battleComponent/zoneSelector.js";


export default class Battle {
  render() {
    const playerHero = this.getHero(playerCharacter,'activeHero');
    const enemyHero = this.getHero(enemyCharacter, 'enemyHero');

    const div = document.createElement("div");
    div.classList.add("home__container");
    
    const playerCart = characterCard(playerHero.name, playerHero.avater, playerHero.health, playerHero.healthStatic);
    const enemyCart = characterCard(enemyHero.name, enemyHero.avater, enemyHero.health, enemyHero.healthStatic);

    const battleControls = document.createElement('div');
    battleControls.classList.add('skills__container');
    battleControls.innerHTML = `<p class="text-info">Выберите ваши действие</p>`;

    const controlsBox = document.createElement('div');
    controlsBox.classList.add('battle-controls');

    const attack = zoneSelector('attack', playerHero.skills, playerHero);
    const protection = zoneSelector('protection', playerHero.skills, playerHero);

    const separator = document.createElement('div');
    separator.classList.add('separator');

    controlsBox.append(attack, separator, protection);
    
    const btnAttack = document.createElement('button');
    btnAttack.type = 'button';
    btnAttack.classList.add('btn', 'btnAttack');
    btnAttack.textContent = 'Атаковать';

    battleControls.append(controlsBox, btnAttack);

    console.log(playerHero);

    div.append(playerCart, battleControls, enemyCart);

    btnAttack.addEventListener('click', () => {
      this.battleMode(playerHero, enemyHero, playerCart, enemyCart);
    });

    
    const userName = document.querySelector("#nameUser");
    userName.textContent = JSON.parse(localStorage.getItem("User")).name;
    return div;
  }

  getHero(playerCharacter, nameId) {
    const playerName = JSON.parse(localStorage.getItem('User'))[nameId].toLowerCase();
    return playerCharacter[playerName];
  }

  playerAttack(playerHero, enemyHero, playerCart, enemyCart) {
    const attack = playerHero.attack();
    enemyHero.takeDamage(attack);
    console.log(playerHero, enemyHero);
    this.updateHealth(enemyCart, enemyHero.health, enemyHero.healthStatic);
    return enemyHero.kill;

  }

  enemyAttack(playerHero, enemyHero) {
    return playerHero.kill;
  }

  battleMode(playerHero, enemyHero, playerCart, enemyCart) {

      if(playerHero.health > 0 && enemyHero.health > 0) {
        if(this.playerAttack(playerHero, enemyHero, playerCart, enemyCart)) {
          console.log('бой окончен проиграл enemyHero');
        } else if(this.enemyAttack(playerHero, enemyHero)) {
          console.log('бой окончен проиграл playerHero');
        }

      }
  }

  updateHealth(heroCard, heroHealth, healthStatic) {
    const lable = heroCard.querySelector('.health-bar--label');
    lable.textContent = `${heroHealth}/${healthStatic}`;
    const progress = heroCard.querySelector('.health-bar--progress');
    progress.style.width = `${(heroHealth / healthStatic) * 100}%`;
  }

  
}
