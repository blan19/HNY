import HTMLElementViewModel from "../core/HTMLElementViewModel";
import Page, { PageProps } from "../core/Page";

import "../components/MessageForm";
import store from "../store";

const html = /* html */ `
<hny-message-form 
m-bidata-type="type"
m-bidata-image="image"
m-bidata-title="title"
m-bidata-content="content"
m-bidata-post-id="postId"
>
</hny-message-form>

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
    image: string;
    content: string;
    title: string;
  }> {
    constructor() {
      super({
        html,
        data: {
          postId: "",
          type: "",
          image: "",
          content: "",
          title: "",
        },
        mounted: () => {
          this.$data.type = "edit";

          const [, , postId] = window.location.pathname.split("/");
          const message = store.$data.message;

          if (!(postId && message)) return;

          this.$data.postId = postId;
          this.$data.image = message.image;
          this.$data.title = message.title;
          this.$data.content = message.content;
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
