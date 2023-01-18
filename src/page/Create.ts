import HTMLElementViewModel from "../core/HTMLElementViewModel";
import Page, { PageProps } from "../core/Page";

import "../components/CreateForm";

const html = /* html */ `
<hny-create-form></hny-create-form>

<style scoped>
  :host {
    display: block;
    height: 100%;
  }
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
