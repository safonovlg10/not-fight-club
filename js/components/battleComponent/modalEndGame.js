import { api } from "../../api.js";

export default function modalEndGame(hero, message) {
  const div = document.createElement("div");
  div.classList.add("modal-content");
  div.innerHTML = `
        <span class="close-btn">&times;</span>
        <div class="card cart-character-home__container ">
            <img src="./assets/img/${hero.avater}" alt="${
    hero.name
  }-knight" class="cart-character__img">
        </div>
        <div class="home__content-conateiner">
          <div class="card info-character__container">
            <code class="name">${hero.name}</code>
            <span class="statistics--win">win: ${api.getSatistics(
              hero.name,
              "win"
            )}</span>
            <span class="statistics--los">los: ${api.getSatistics(
            hero.name,
            "los"
            )}</span>
         </div>
         <code class="card message">${message}</code>
        <button type="button" class="btn btnRedirect">Назад в Home</button>
      </div>
    `;

  return div;
}
