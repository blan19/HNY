import HTMLElementViewModel from "../core/HTMLElementViewModel";
import Page, { PageProps } from "../core/Page";

import "../components/MessageForm";
import Router from "../utils/Router";

const html = /* html */ `
  <div>
    <h1>404 Not Found</h1>
    <button @click="clickBtn">홈</button>
  </div>
  <style scoped>
    @import url("/styles/component.css");

    :host {
      display: block;
      height: 100%;
    }
    div {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 100px;
    }
    h1 {
      font-size: 56px;
      font-weight: 500;
      color: var(--grayscale-6);
    }
    button {
      all: unset;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--primary);
      color: var(--grayscale-1);
      font-size: 32px;
      font-weight: 500;
      padding: 16px 0;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
`;

window.customElements.define(
  "hny-404-page",
  class extends HTMLElementViewModel<{}> {
    constructor() {
      super({
        html,
        methods: {
          clickBtn: () => {
            Router.replace("/");
          },
        },
      });
    }
  }
);

const NotFound = class extends Page {
  constructor({ target, component }: PageProps) {
    super({ target, component });
  }

  setup(): void {
    const notFoundPage = document.createElement("hny-404-page");
    this.$target.appendChild(notFoundPage);
  }
};

export default NotFound;
