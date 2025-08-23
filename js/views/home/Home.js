import { playerCharacter } from "../../characters/charactersData.js";

export default class Home {
 
  render() {
    const div = document.createElement("div");
    const currentHero = this.getHero();

    div.classList.add("home__container");
    div.innerHTML = `
      <div class="card cart-character-home__container ">
        <img src="./assets/img/${currentHero.avater}" alt="${currentHero.name}-knight" class="cart-character__img">
      </div>
      <div class="home__content-conateiner">
        <div class="card info-character__container">
          <code class="name">${currentHero.name}</code>
          <p>Здоровье: <code class="health">${currentHero.health}</code></p>
          <p>Защита: <code class="protection">${currentHero.protection}</code></p>
        </div>
        <button type="button" class="btn btnStart">Начать бой</button>
      </div>
    `;
    const userName = document.querySelector('#nameUser');
    userName.textContent = JSON.parse(localStorage.getItem('User')).name;
    
    const btnStart = div.querySelector('.btnStart');
    btnStart.addEventListener('click', this.startBattle)

    return div;
  }

   startBattle() {
    location.hash = '/battle';
  }
  getHero() {
    const name = JSON.parse(localStorage.getItem('User')).activeHero.toLowerCase();
    return playerCharacter[name];
  }
}
