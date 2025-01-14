import HTMLElementViewModel from "../core/HTMLElementViewModel";
import store from "../store";
import { ApiError, Comment } from "../types";
import fetcher, { errorHandler } from "../utils/api";

const html = /* html */ `
  <li m-attr-comment-id="commentId" m-attr-post-id="postId">
    <span m-prop-text-content="content"></span>
    <button type="button" @click="deleteComment">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.05752 4.99999L9.28251 1.78249C9.42374 1.64126 9.50308 1.44971 9.50308 1.24999C9.50308 1.05026 9.42374 0.858714 9.28251 0.717486C9.14129 0.576259 8.94974 0.496918 8.75002 0.496918C8.55029 0.496918 8.35874 0.576259 8.21752 0.717486L5.00002 3.94249L1.78252 0.717486C1.64129 0.576259 1.44974 0.496918 1.25002 0.496918C1.05029 0.496918 0.858743 0.576259 0.717515 0.717486C0.576287 0.858714 0.496946 1.05026 0.496946 1.24999C0.496946 1.44971 0.576287 1.64126 0.717515 1.78249L3.94252 4.99999L0.717515 8.21749C0.647219 8.28721 0.591423 8.37016 0.553347 8.46155C0.51527 8.55295 0.495667 8.65098 0.495667 8.74999C0.495667 8.84899 0.51527 8.94702 0.553347 9.03842C0.591423 9.12981 0.647219 9.21276 0.717515 9.28249C0.787237 9.35278 0.870188 9.40858 0.961583 9.44665C1.05298 9.48473 1.15101 9.50433 1.25002 9.50433C1.34902 9.50433 1.44705 9.48473 1.53845 9.44665C1.62984 9.40858 1.71279 9.35278 1.78252 9.28249L5.00002 6.05749L8.21752 9.28249C8.28724 9.35278 8.37019 9.40858 8.46158 9.44665C8.55298 9.48473 8.65101 9.50433 8.75002 9.50433C8.84902 9.50433 8.94705 9.48473 9.03845 9.44665C9.12984 9.40858 9.21279 9.35278 9.28251 9.28249C9.35281 9.21276 9.40861 9.12981 9.44668 9.03842C9.48476 8.94702 9.50436 8.84899 9.50436 8.74999C9.50436 8.65098 9.48476 8.55295 9.44668 8.46155C9.40861 8.37016 9.35281 8.28721 9.28251 8.21749L6.05752 4.99999Z" fill="#0A0A0A"/>
      </svg>
    </button>
  </li>
  
  <style scoped>
    :host {
      display: block;
    }
    li {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 80px;
    }
    span {
      flex: 1;
      font-size: var(--font-12);
      font-weight: 400;
    }
    button {
      all: unset;
      cursor: pointer;
      padding: 8px 12px;
      border: 1px solid var(--grayscale-3);
      border-radius: 8px;
    }
  </style>
`;

export default window.customElements.define(
  "hny-comment",
  class extends HTMLElementViewModel<Comment> {
    constructor() {
      super({
        html,
        data: {
          commentId: "",
          postId: "",
          content: "",
        },
        methods: {
          deleteComment: async ({ target }: { target: Element }) => {
            const button = target;
            const li = button.closest("li");
            const commentId = li?.getAttribute("commentid");
            const postId = li?.getAttribute("postid");

            if (!(commentId || postId)) return;

            await fetcher(`/comment/${commentId}`, { method: "DELETE" })
              .then(() => {
                store.$methods.getMessageById(postId);
              })
              .catch((error: ApiError) =>
                errorHandler("댓글 등록에 실패했습니다.", error)
              );
          },
        },
      });
    }
  }
);
