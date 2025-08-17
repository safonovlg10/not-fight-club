import Register from "../views/register/Register.js";
import Home from "../views/home/Home.js";
import Setting from "../views/setting/Setting.js";
import Battle from "../views/battle/battle.js";
import Router from "../router/Router.js";


// localStorage.removeItem('User');

const routes = {
  '/': () => new Home(),
  '/register': () => new Register(),
  '/setting': () => new Setting(),
  '/battle': () => new Battle(),
//   '*': () => new NotFound()
};


new Router(routes, '.app');