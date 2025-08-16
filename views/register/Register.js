export default class Register {
  render() {
    const div = document.createElement("div");
    div.classList.add("register-container");
    div.innerHTML = `
        <h2>Регистрация</h2>
        <input type="text" id="username" placeholder="Ваше имя" autocomplete="additional-name">
        <button type="button" class="btn" id="regBtn">Зарегистрироваться</button>
    `;
    const inputName = div.querySelector('#username');
    const regBtn = div.querySelector('#regBtn');

    regBtn.addEventListener('click', () => {
      if(inputName.value === '') return false;
      let name = inputName.value.trim();
      localStorage.setItem('username', name);
      location.hash = '/';
    })
    

    return div;
  }
}
