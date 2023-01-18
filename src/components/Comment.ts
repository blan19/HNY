import HTMLElementViewModel from "../core/HTMLElementViewModel";

const html = /* html */ `
  <ul>
    <h1>Comments..</h1>
  </ul>
  
  <style scoped>
    :host {
      display: block;
    }
  </style>
`;

export default window.customElements.define(
  "hny-comment",
  class extends HTMLElementViewModel<{}> {
    constructor() {
      super({
        html,
      });
    }
  }
);
