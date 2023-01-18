import HTMLElementViewModel from "../core/HTMLElementViewModel";

const html = /* html */ `
  <li m-attr-post-id="postId">
    <div>
      <img m-prop-src="image">
    </div>
    <section>
      <h1 m-prop-text-content="title"></h1>
      <p m-prop-text-content="content"></p>
    </section>
  </li>

  <style scoped>
    @import url("./src/styles/component.css");

    li {
      display: flex;
      gap: 16px;
      list-style: none;
      background: var(--grayscale-1);
      border: 1.5px solid var(--grayscale-3);
      border-radius: 12px;
    }
    div {
      display: flex;
      align-item: center;
      justify-content: center;
    }
    section {
      flex: 1;
      width: 100%;
      max-width: calc(100% - 116px);
      display: flex;
      flex-direction: column;
      align-item: center;
      justify-content: center;
      gap: 10px;
      table-layout: fixed;
    }
    img {
      width: 76px;
      height: 76px;
      border-radius: 12px 0px 0px 12px;
    }
    h1 {
      font-size: var(--font-20);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: var(--font-16);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  </style>
`;

export default window.customElements.define(
  "hny-message-item",
  class extends HTMLElementViewModel<{
    postId: string;
    title: string;
    content: string;
    image: string;
  }> {
    constructor() {
      super({
        html,
        data: {
          postId: "",
          title: "",
          content: "",
          image: "",
        },
      });
    }
  }
);
