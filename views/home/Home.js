export default class Home {
  render() {
    const div = document.createElement("div");
    div.innerHTML = `
      <h2>Главная</h2>
      <p>Добро пожаловать в SPA на чистом JavaScript с классами и модулями!</p>
    `;
    return div;
  }
}
