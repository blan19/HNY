import HTMLElementViewModel from "../core/HTMLElementViewModel";

const html = /* html */ `
  <article>
    <h1>Posting Page</h1>
  </article>
  
  <style scoped>
    :host {
      display: block;
    }
  </style>
`;

export default window.customElements.define(
  "hny-posting",
  class extends HTMLElementViewModel<{}> {
    constructor() {
      super({
        html,
      });
    }
  }
);
