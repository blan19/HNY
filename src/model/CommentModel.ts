import { Comment } from "../types";

import "../components/MessageItem";

const CommentModel = class {
  #commentId: string;
  #postId: string;
  #content: string;
  constructor({ commentId, postId, content }: Comment) {
    this.#commentId = commentId;
    this.#postId = postId;
    this.#content = content;
  }

  generateElement(): Element {
    const messageItem = document.createElement("hny-comment");

    messageItem.setAttribute("m-data-post-id", this.#postId);
    messageItem.setAttribute("m-data-comment-id", this.#commentId);
    messageItem.setAttribute("m-data-content", this.#content);

    return messageItem;
  }
};

export default CommentModel;
