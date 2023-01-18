import HTMLElementViewModel from "../core/HTMLElementViewModel";
import Page, { PageProps } from "../core/Page";
import store from "../store";
import Router from "../utils/Router";

import "../components/MessageItem";
import { Message } from "../types";
import MessageItemModel from "../model/MessageItemModel";

const html = /* html */ `
<button @click="clickBtn">
  <div>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5319 0.364125C16.7651 0.130976 17.0814 0 17.4111 0C17.7409 0 18.0572 0.130976 18.2904 0.364125L23.265 5.33874C23.4982 5.57196 23.6292 5.88823 23.6292 6.218C23.6292 6.54777 23.4982 6.86405 23.265 7.09726L7.09753 23.2648C6.86435 23.498 6.54808 23.6291 6.21827 23.6292H1.24365C0.913816 23.6292 0.597488 23.4981 0.364258 23.2649C0.131027 23.0317 0 22.7153 0 22.3855V17.4109C7.04373e-05 17.0811 0.131144 16.7648 0.36439 16.5316L12.8009 4.09509L16.5319 0.364125ZM13.6802 6.73287L2.48731 17.9258V21.1418H5.7034L16.8963 9.94896L13.6802 6.73287ZM18.6548 8.19044L20.6272 6.218L17.4111 3.00191L15.4387 4.97435L18.6548 8.19044Z" fill="white"/>
    </svg>
  </div>
  <h1>
    새 글 작성하기
  </h1>
</button>
<ul m-ref="messages"></ul>

<style scoped>
  @import url("/styles/component.css");

  :host {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  button {
    all: unset;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: var(--primary);
    padding: 22px 80px;
    margin-top: 20px;
    border-radius: 4px;
    cursor: pointer;
    box-sizing: border-box;
  }
  div {
    display: flex;
  }
  h1 {
    color: var(--grayscale-1);
    font-size: var(--font-20);
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
</style>
`;

window.customElements.define(
  "hny-home-page",
  class extends HTMLElementViewModel<{}> {
    constructor() {
      super({
        html,
        methods: {
          clickBtn() {
            Router.push("/create");
          },
        },
        mounted: async () => {
          store.$watcher.messages.push((_, messages) => {
            messages.reverse().forEach((message: Message) => {
              const messageItem = new MessageItemModel({
                ...message,
              });

              this.$ref.messages.appendChild(messageItem.generateElement());
            });
          });

          await store.$methods.getMessagesAll();
        },
      });
    }
  }
);

const HomePage = class extends Page {
  constructor({ target, component }: PageProps) {
    super({ target, component });
  }

  setup(): void {
    const createPage = document.createElement("hny-home-page");
    this.$target.appendChild(createPage);
  }
};

export default HomePage;
