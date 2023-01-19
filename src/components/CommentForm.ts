import HTMLElementViewModel from "../core/HTMLElementViewModel";
import store from "../store";
import { ApiError } from "../types";
import fetcher, { errorHandler } from "../utils/api";

const html = /* html */ `
  <form>
    <input @input="changeContentValue" m-prop-value="content"></input>
    <button @click="submit" type="submit">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.5 4.66665C24.4879 4.55948 24.4644 4.45389 24.43 4.35165V4.24665C24.3741 4.11681 24.295 3.99822 24.1967 3.89665C24.0977 3.80363 23.9832 3.72861 23.8583 3.67499H23.7533C23.6458 3.59286 23.5228 3.53334 23.3917 3.49999H23.3333C23.2173 3.48239 23.0993 3.48239 22.9833 3.49999L1.98334 10.5C1.74993 10.5767 1.5467 10.7252 1.40262 10.9242C1.25854 11.1232 1.18097 11.3626 1.18097 11.6083C1.18097 11.854 1.25854 12.0934 1.40262 12.2925C1.5467 12.4915 1.74993 12.6399 1.98334 12.7167L11.935 16.03L15.2483 25.9817C15.3251 26.2151 15.4735 26.4183 15.6725 26.5624C15.8716 26.7065 16.111 26.784 16.3567 26.784C16.6024 26.784 16.8418 26.7065 17.0408 26.5624C17.2398 26.4183 17.3883 26.2151 17.465 25.9817L24.465 4.98165C24.4909 4.87873 24.5027 4.77276 24.5 4.66665ZM19.0167 7.33832L12.5183 13.8367L6.02001 11.6667L19.0167 7.33832ZM16.3333 21.98L14.1633 15.4817L20.6617 8.98332L16.3333 21.98Z" fill="#E2E2E2"/>
      </svg>
    </button>
  </form>
  
  <style scoped>
    @import url("/styles/component.css");
    :host {
    }
    form {
      display: flex;
      align-items: center;
      height: 40px;
      gap: 8px;
      border-radius: 4px;
      margin-bottom: 16px;
    }
    input {
      all: unset;
      height: 100%;
      flex: 1;
      background: var(--grayscale-3);
      padding: 0 7.5px;
    }
    button {
      all: unset;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--grayscale-1);
      border: 1px solid var(--grayscale-3);
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
`;

export default window.customElements.define(
  "hny-comment-form",
  class extends HTMLElementViewModel<{
    content: string;
  }> {
    constructor() {
      super({
        html,
        data: {
          content: "",
        },
        methods: {
          changeContentValue: ({ target }: { target: HTMLInputElement }) => {
            this.$data.content = target.value;
          },
          submit: async (e: SubmitEvent) => {
            e.preventDefault();

            if (!this.$data.content) return;

            const [, , postId] = window.location.pathname.split("/");

            const data = {
              content: this.$data.content,
            };

            await fetcher(`/comment/${postId}`, {
              method: "POST",
              data,
            })
              .then(() => {
                store.$methods.getMessageById(postId);
              })
              .catch((error: ApiError) =>
                errorHandler("댓글 등록에 실패했습니다.", error)
              );

            this.$data.content = "";
          },
        },
      });
    }
  }
);
