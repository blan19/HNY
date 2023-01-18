import Page, { PageProps } from "../core/Page";
import HTMLElementViewModel from "../core/HTMLElementViewModel";

import "../components/Posting";
import "../components/Comment";

const html = /* html */ `
<hny-posting></hny-posting>
<hny-comment></hny-comment>

<style scoped>
  @import url("/styles/component.css");

  :host {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
</style>
`;

window.customElements.define(
  "hny-posting-page",
  class extends HTMLElementViewModel<{}> {
    constructor() {
      super({
        html,
      });
    }
  }
);

const PostingPage = class extends Page {
  constructor({ target, component }: PageProps) {
    super({ target, component });
  }

  setup(): void {
    const postingPage = document.createElement("hny-posting-page");
    this.$target.appendChild(postingPage);
  }
};

export default PostingPage;
