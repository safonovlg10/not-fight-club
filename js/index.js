import Register from "./views/register/Register.js";
import Home from "./views/home/Home.js";
import Setting from "./views/setting/Setting.js";
import Battle from "./views/battle/Battle.js";
import Router from "./router/Router.js";
import Users from "./views/users/users.js";


// import charactersData from "./characters/charactersData.js";

// localStorage.removeItem("User");

const routes = {
  "/": () => new Home(),
  "/register": () => new Register(),
  "/setting": () => new Setting(),
  "/battle": () => new Battle(),
  "/users": () => new Users(),
  //   '*': () => new NotFound()
};

new Router(routes, ".app");
