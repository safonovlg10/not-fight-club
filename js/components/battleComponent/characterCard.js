export default function characterCard(name, avatar, health, healthStatic) {
    const div = document.createElement('div');
    div.classList.add('card', 'cart-character__container');
    div.innerHTML = `
          <div class="character-name">
            <code><b>${name}</b></code>
          </div>
          <img
            src="./assets/img/${avatar}"
            alt="fantasy-knight"
            class="cart-character__img"
          >
          <div class="health-bar__container">
            <div class="health-bar">
              <p class="health-bar--label">${health}/${healthStatic}</p>
              <div class="health-bar--progress"></div>
            </div>
          </div>
        </div>
    `
    return div;

}