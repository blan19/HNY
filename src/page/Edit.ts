import HTMLElementViewModel from "../core/HTMLElementViewModel";
import Page, { PageProps } from "../core/Page";

import "../components/MessageForm";

const html = /* html */ `
<hny-message-form m-bidata-type="type"></hny-message-form>

<style scoped>
  :host {
    display: block;
    height: 100%;
  }
</style>
`;

window.customElements.define(
  "hny-edit-page",
  class extends HTMLElementViewModel<{
    postId: string;
    type: string;
  }> {
    constructor() {
      super({
        html,
        data: {
          postId: "",
          type: "",
        },
        mounted: () => {
          this.$data.type = "edit";
        },
      });
    }
  }
);

const EditPage = class extends Page {
  constructor({ target, component }: PageProps) {
    super({ target, component });
  }

  setup(): void {
    const editPage = document.createElement("hny-edit-page");
    this.$target.appendChild(editPage);
  }
};

export default EditPage;
