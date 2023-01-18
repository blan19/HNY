import { Message } from "../types";

import "../components/MessageItem";

const MessageItemModel = class {
  #postId: string;
  #title: string;
  #content: string;
  #image: string;
  #createdAt: string;
  #updatedAt: string;
  constructor({
    postId,
    title,
    content,
    image,
    createdAt,
    updatedAt,
  }: Message) {
    this.#postId = postId;
    this.#title = title;
    this.#content = content;
    this.#image = image;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  generateElement(): Element {
    const messageItem = document.createElement("hny-message-item");

    messageItem.setAttribute("m-data-postId", this.#postId);
    messageItem.setAttribute("m-data-title", this.#title);
    messageItem.setAttribute("m-data-content", this.#content);
    messageItem.setAttribute("m-data-image", this.#image);
    messageItem.setAttribute("m-data-content", this.#content);
    messageItem.setAttribute("m-data-createAt", this.#createdAt);
    messageItem.setAttribute("m-data-updateAt", this.#updatedAt);

    return messageItem;
  }
};

export default MessageItemModel;
