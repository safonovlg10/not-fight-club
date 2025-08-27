export default function userCard(name, avater) {
  const div = document.createElement("div");
  // const currentHero = this.getHero();

  div.classList.add("card", "cart-character");
  if(name.toLowerCase() === getHero()){
    div.classList.add("card-active");
  }  
  div.id = name;
  div.innerHTML = `
            <div class="character-name">    
                <code><b>${name}</b></code>
              </div>
              <img
                src="./assets/img/${avater}"
                alt="fantasy-knight"
                class="cart-character__img"
              >
            </div>
        `;

  // const btnStart = div.querySelector('.btnStart');
  // btnStart.addEventListener('click', this.startBattle)

  return div;
}

function getHero() {
  const name = JSON.parse(
    localStorage.getItem("User")
  ).activeHero.toLowerCase();
  return name;
}
