export default class Router {
  constructor(routes, rootId) {
    this.routes = routes;
    this.root = document.querySelector(rootId);
    window.addEventListener("hashchange", () => this.purse());
    this.purse();
  }

  purse() {
    const isRegistered = !!localStorage.getItem("User");
    const hash = location.hash.replace("#", "") || "/";

    if (!isRegistered && hash !== "/register") {
      location.hash = "/register";
      return;
    }
    this.route(hash);
  }

  async route(path) {
    const route = this.routes[path] || this.routes["*"];
    const Viwe = route();
    this.root.innerHTML = "";
    this.root.append(await Viwe.render());
  }
}
