export default class Home {
 
  render() {
    const div = document.createElement("div");
    div.classList.add("home__container");
    div.innerHTML = `
      <div class="card cart-character__container">
        <img src="./assets/img/491-4918344_purple-medieval-knight-fantasy-knight-png-transparent-png.png" alt="fantasy-knight" class="cart-character__img">
      </div>
      <div class="home__content-conateiner">
        <div class="card info-character__container">
          <code class="name">TYnK</code>
          <p>Здоровье: <code class="health">1500</code></p>
          <p>Защита: <code class="protection">750</code></p>
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
}
