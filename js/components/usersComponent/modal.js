import { playerCharacter } from "../../characters/charactersData.js";
import { api } from "../../api.js";
export default function modal(hero) {
  const div = document.createElement("div");
  div.classList.add("modal-content");
  div.innerHTML = `
        <span class="close-btn">&times;</span>
        <div class="card cart-character-home__container ">
            <img src="./assets/img/${hero.avater}" alt="${
    hero.name
  }-knight" class="cart-character__img">
            <div class="statistics__container">
              <span class="statistics--win">win: ${api.getSatistics(
                hero.name,
                "win"
              )}</span>
              <span class="statistics--los">los: ${api.getSatistics(
                hero.name,
                "los"
              )}</span>
            </div>
        </div>
        <div class="home__content-conateiner">
          <div class="card info-character__container">
            <code class="name">${hero.name}</code>
            <p>Здоровье: <code class="health">${hero.health}</code></p>
            <p>Защита: <code class="protection">${hero.protection}</code></p>
         </div>
        <button type="button" class="btn btnSet">Выбрать</button>
      </div>
    `;

  return div;
}

// function getSatistics(name, type) {
//   const user = JSON.parse(localStorage.getItem("User"));
//   if (user.statistics.length === 0) {
//     return 0;
//   }
//   const obj = user.statistics.find((el) => el.name === name);
//   if (!obj) return 0;

//   return obj[type];
// }
