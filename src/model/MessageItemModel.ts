import { Message } from "../types";

import "../components/MessageItem";

const MessageItemModel = class {
  #postId: string;
  #title: string;
  #content: string;
  #image: string;
  constructor({
    postId,
    title,
    content,
    image,
  }: Omit<Message, "creatAt" | "updateAt">) {
    this.#postId = postId;
    this.#title = title;
    this.#content = content;
    this.#image = image;
  }

  generateElement(): Element {
    const messageItem = document.createElement("hny-message-item");

    messageItem.setAttribute("m-data-post-id", this.#postId);
    messageItem.setAttribute("m-data-title", this.#title);
    messageItem.setAttribute("m-data-content", this.#content);
    messageItem.setAttribute("m-data-image", this.#image);
    messageItem.setAttribute("m-data-content", this.#content);

    return messageItem;
  }
};

export default MessageItemModel;
