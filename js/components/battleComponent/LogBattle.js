export default function battleLogo() {
  const div = document.createElement("div");
  div.classList.add("card", "battle-log__container");

  div.innerHTML = `<h4>Журнал боя</h4><ul class="log-list"></ul>`;
  return div;
}

