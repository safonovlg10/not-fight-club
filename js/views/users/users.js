import { playerCharacter } from "../../characters/charactersData.js";
import userCard from "../../components/usersComponent/userCard.js";
import modal from "../../components/usersComponent/modal.js";

playerCharacter;
export default class Users {
  render() {
    const arrCharacters = Object.values(playerCharacter);
    console.log(arrCharacters, playerCharacter);
    const div = document.createElement("div");
    div.classList.add("home__container");

    const modalWindow = document.createElement("div");
    modalWindow.id = "modal";
    modalWindow.classList.add("modal");

    arrCharacters.forEach((character) => {
      const card = userCard(character.name, character.avater);
      card.addEventListener("click", (e) => {
        const id = e.target.closest(".cart-character").id.toLowerCase();

        this.openMadal(id, modalWindow, div);

        modalWindow
          .querySelector(".close-btn")
          .addEventListener("click", () => {
            this.closeModal(modalWindow);
          });

        modalWindow
          .querySelector(".btnSet")
          .addEventListener("click", () => {
            this.resetActiveCard();
            this.setActiveClass(card);
            this.setHero(id);
            this.closeModal(modalWindow);
          });
      });
    
      div.append(card);
      
    });

    return div;
  }

  closeModal(modalWindow) {
    modalWindow.style.display = "none";
  }

  openMadal(id, modalWindow, div) {
    modalWindow.innerHTML = "";
    modalWindow.append(modal(playerCharacter[id]));
    div.append(modalWindow);
    modalWindow.style.display = "block";
  }

  setHero(hero) {
    const user = JSON.parse(localStorage.getItem("User"));
    user.activeHero = hero;
    localStorage.setItem("User", JSON.stringify(user));
  }
  setActiveClass(card) {
    card.classList.add('card-active');

  }
  resetActiveCard(){
    const cards = document.querySelectorAll(".cart-character");
    cards.forEach(el => {
      el.classList.remove('card-active');
    })
  }
}
