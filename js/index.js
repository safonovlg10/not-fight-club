import Register from "../views/register/Register.js";
import Home from "../views/home/Home.js";
import Setting from "../views/setting/Setting.js";
import Router from "../router/Router.js";


// localStorage.removeItem('username');

const routes = {
  '/': () => new Home(),
  '/register': () => new Register(),
  '/setting': () => new Setting(),
//   '/about': () => new About(),
//   '*': () => new NotFound()
};


new Router(routes, '.app');