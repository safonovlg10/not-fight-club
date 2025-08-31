export default class Setting {
  render() {
    const div = document.createElement("div");
    div.classList.add("register-container");
    div.innerHTML = `
        <h2>РSetting</h2>
        <input type="text" id="new-username" placeholder="Ваше имя" autocomplete="additional-name">
        <button type="button" class="btn" id="saveBtn">Save</button>
    `;
    const inputName = div.querySelector('#new-username');
    const regBtn = div.querySelector('#saveBtn');

    regBtn.addEventListener('click', () => {
      if(inputName.value === '') return false;
      const userName = document.querySelector('#nameUser');
      let name = inputName.value.trim();
      
      const objUser = JSON.parse(localStorage.getItem('User'));
      objUser.name = name;
      userName.textContent = `Ваше имя: ${objUser.name}`;
      localStorage.setItem('User', JSON.stringify(objUser));
      inputName.value = '';
      
      
    });
    

    return div;
  }
}
