import HTMLElementViewModel from "../core/HTMLElementViewModel";

const html = /* html */ ``;

export default window.customElements.define(
  "hny-message-item",
  class extends HTMLElementViewModel<{}> {
    constructor() {
      super({
        html,
      });
    }
  }
);
