import HomePage from "./page/Home";
import PostingPage from "./page/Posting";
import CreatePage from "./page/Create";
import NotFound from "./page/404";
import Router from "./utils/Router";
import HTMLElementViewModel from "./core/HTMLElementViewModel";

const html = /* html */ `
<main>
  <h1>Hello World..!</h1>
</main>

<style scoped>
:host {
  display: block;
}
</style>
`;

const App = class {
  constructor() {
    window.customElements.define(
      "hny-app",
      class extends HTMLElementViewModel<{}> {
        constructor() {
          super({
            html,
          });
        }
      }
    );

    new Router({
      routes: [
        {
          path: "/",
          component: HomePage,
        },
        {
          path: "/posting/:id",
          component: PostingPage,
        },
        {
          path: "/create",
          component: CreatePage,
        },
        {
          path: "/*",
          component: NotFound,
        },
      ],
    });
  }
};

window.onload = () => {
  new App();
};

export default App;
