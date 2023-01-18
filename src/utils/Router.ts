import Page from "../core/Page";
import NotFound from "../page/404";
import ErrorMessage from "./errorMessage";
import { el } from "./lib";

interface Route {
  path: string;
  component: typeof Page;
}

interface RouterConstructor {
  routes: Route[];
}

const Router = class {
  #routes;

  constructor({ routes: __routes }: RouterConstructor) {
    this.#routes = __routes;

    this.#bind();
    this.#routing();
  }

  static push(url: string, options?: CustomEventInit<unknown>) {
    const event = new CustomEvent("CHANGE_ROUTE", options);
    history.pushState(null, "", url);
    window.dispatchEvent(event);
  }

  static pushBack(options?: CustomEventInit<unknown>) {
    const event = new CustomEvent("CHANGE_ROUTE", options);
    history.back();
    window.dispatchEvent(event);
  }

  static replace(url: string, options?: CustomEventInit<unknown>) {
    const event = new CustomEvent("CHANGE_ROUTE", options);
    history.replaceState(null, "", url);
    window.dispatchEvent(event);
  }

  #routing(): void {
    const root = document.querySelector("#hny-app");

    const notFound =
      this.#routes.find((route) => route.path === "/*")?.component || NotFound;

    if (!root) throw Error(ErrorMessage["isNotHTMLElementMsg"]);

    root.innerHTML = "";

    const [, ...currentPath] = window.location.pathname.split("/");

    const target = this.#routes.filter(
      (route) => route.path.split("/").slice(1).length === currentPath.length
    );

    if (target.length < 1) {
      new Page({ target: root, component: notFound });
      return;
    }

    let currectRoute: Route | null = null;

    for (const route of target) {
      const [, ...path] = route.path.split("/");

      if (currentPath.length !== path.length) continue;

      const isCurrectPath = currentPath.every((value, index) => {
        const isParams = path[index].startsWith(":");

        if (isParams) return true;

        return value === path[index];
      });

      if (isCurrectPath) {
        currectRoute = route;
        break;
      }
    }

    if (!currectRoute) {
      new Page({ target: root, component: notFound });
      return;
    }

    new Page({ target: root, component: currectRoute.component });
    return;
  }

  #bind() {
    window.addEventListener("CHANGE_ROUTE", () => {
      this.#routing();
    });

    window.addEventListener("popstate", () => {
      this.#routing();
    });
  }
};

export default Router;
