import HomePage from "./page/Home";
import PostingPage from "./page/Posting";
import CreatePage from "./page/Create";
import NotFound from "./page/404";
import Router from "./utils/Router";
import store from "./store";

import "./components/Header";
import HTMLElementViewModel from "./core/HTMLElementViewModel";

// const App = class {
//   constructor() {
//     store.$methods.getMessagesAll();

//     new Router({
//       routes: [
//         {
//           path: "/",
//           component: HomePage,
//         },
//         {
//           path: "/posting/:id",
//           component: PostingPage,
//         },
//         {
//           path: "/create",
//           component: CreatePage,
//         },
//         {
//           path: "/*",
//           component: NotFound,
//         },
//       ],
//     });
//   }
// };

// window.onload = () => {
//   new App();
// };

const html = /* html */ `
<div id="hny-app"></div>
<style scoped>
  @import url("/styles/component.css");

  :host {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  #hny-app {
    position: relative;
    padding: 0 16px;
    margin: 0 auto;
    font-family: "Pretendard";
    height: 100%;
  }
  @media (min-width: 1201px) {
    #hny-app {
      width: 1200px;
    }
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    #hny-app {
      width: 768px;
    }
  }
  @media (max-width: 767px) {
    #hny-app {
      width: 360px;
    }
  }
</style>
`;

export default window.customElements.define(
  "hny-app",
  class extends HTMLElementViewModel<{}> {
    constructor() {
      super({
        html,
        mounted: () => {
          store.$methods.getMessagesAll();

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
        },
      });
    }
  }
);
