import HTMLElementViewModel from "../core/HTMLElementViewModel";
import Page, { PageProps } from "../core/Page";

const html = /* html */ `
<h1>
  Create Page
</h1>

<style scoped>
  :host {}
</style>
`;

window.customElements.define(
  "hny-create-page",
  class extends HTMLElementViewModel<{}> {
    constructor() {
      super({
        html,
        mounted: () => {},
      });
    }
  }
);

const CreatePage = class extends Page {
  constructor({ target, component }: PageProps) {
    super({ target, component });
  }

  setup(): void {
    const createPage = document.createElement("hny-create-page");
    this.$target.appendChild(createPage);
  }
};

export default CreatePage;
