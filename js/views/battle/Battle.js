import { Heroes } from "../../characters/charactersData.js";
export default class Battle {
  render() {
    const div = document.createElement("div");
    div.classList.add("home__container");
    div.innerHTML = `
     <div class="card cart-character__container">
          <div class="character-name">
            <code><b>Titanblcak</b></code>
          </div>
          <img
            src="./assets/img/491-4918344_purple-medieval-knight-fantasy-knight-png-transparent-png.png"
            alt="fantasy-knight"
            class="cart-character__img"
          >
          <div class="health-bar__container">
            <div class="health-bar">
              <div class="health-bar--progress">
                <p class="health-bar--label">1500/1500</p>
              </div>
            </div>
          </div>
        </div>
        <div class="skills__container">
          <p class="text-info">Выберите ваши действие</p>
          <div class="battle-controls">
            <div class="attac-zones">
               <p>Attack Zones</p>
               <div class="check-box__container">
                <label class="check-box--label">Head</label>
                <input type="radio" class="check-box--input">
               </div>
               <div class="check-box__container">
                <label class="check-box--label">Neck</label>
                <input type="radio" class="check-box--input">
               </div>
               <div class="check-box__container">
                <label class="check-box--label">Body</label>
                <input type="radio" class="check-box--input">
               </div>
               <div class="check-box__container">
                <label class="check-box--label">legs</label>
                <input type="radio" class="check-box--input">
               </div>
            </div>
            <div class="separator"></div>
              <div class="protection-zones">
               <p>Separator Zones</p>
               <div class="check-box__container">
                 <input type="radio" class="check-box--input">
                <label class="check-box--label">Head</label>
               </div>
               <div class="check-box__container">
                 <input type="radio" class="check-box--input">
                <label class="check-box--label">Neck</label>
               </div>
               <div class="check-box__container">
                 <input type="radio" class="check-box--input">
                <label class="check-box--label">Body</label>
               </div>
               <div class="check-box__container">
                 <input type="radio" class="check-box--input">
                <label class="check-box--label">legs</label>
               </div>
            </div>
          </div>
        </div>
        <div class="card cart-character__container">
          <div class="character-name">
            <code><b>Titanblcak</b></code>
          </div>
          <img
            src="./assets/img/491-4918344_purple-medieval-knight-fantasy-knight-png-transparent-png.png"
            alt="fantasy-knight"
            class="cart-character__img"
          >
          <div class="health-bar__container">
            <div class="health-bar">
              <div class="health-bar--progress">
                <p class="health-bar--label">1500/1500</p>
              </div>
            </div>
          </div>
        </div>
    `;
    Heroes.playerCharacterData.knight.attack()
    const userName = document.querySelector("#nameUser");
    userName.textContent = JSON.parse(localStorage.getItem("User")).name;
    return div;
  }
}
