import { AxiosError } from "axios";
import HTMLElementViewModel from "../core/HTMLElementViewModel";
import store from "../store";
import { Message } from "../types";
import fetcher from "../utils/api";
import Router from "../utils/Router";

const html = /* html */ `
  <article m-attr-post-id="postId">
    <img m-prop-src="image" alt="thumbnail" />
    <section>
      <h1 m-prop-text-content="title"></h1>
      <span m-prop-text-content="createdAt"></span>
      <p m-prop-text-content="content"></p>
    </section>
    <div>
      <button type="button" @click="editPosting">
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.4627 0.406653C18.7232 0.146273 19.0764 0 19.4447 0C19.813 0 20.1662 0.146273 20.4266 0.406653L24.5933 4.57337C24.8537 4.83383 25 5.18704 25 5.55532C25 5.92361 24.8537 6.27682 24.5933 6.53728L12.0932 19.0374C11.8328 19.2979 11.4796 19.4443 11.1112 19.4444H6.94453C6.57617 19.4444 6.22289 19.298 5.96242 19.0376C5.70195 18.7771 5.55562 18.4238 5.55562 18.0555V13.8888C5.5557 13.5204 5.70208 13.1672 5.96257 12.9068L18.4627 0.406653V0.406653ZM8.33343 14.4638V16.6666H10.5362L21.6475 5.55532L19.4447 3.35252L8.33343 14.4638ZM0 5.55532C0 4.8186 0.292661 4.11206 0.813602 3.59112C1.33454 3.07018 2.04109 2.77751 2.77781 2.77751H9.72234C10.0907 2.77751 10.444 2.92385 10.7044 3.18432C10.9649 3.44479 11.1112 3.79806 11.1112 4.16642C11.1112 4.53478 10.9649 4.88805 10.7044 5.14852C10.444 5.40899 10.0907 5.55532 9.72234 5.55532H2.77781V22.2222H19.4447V15.2777C19.4447 14.9093 19.591 14.556 19.8515 14.2956C20.1119 14.0351 20.4652 13.8888 20.8336 13.8888C21.2019 13.8888 21.5552 14.0351 21.8157 14.2956C22.0762 14.556 22.2225 14.9093 22.2225 15.2777V22.2222C22.2225 22.9589 21.9298 23.6655 21.4089 24.1864C20.8879 24.7073 20.1814 25 19.4447 25H2.77781C2.04109 25 1.33454 24.7073 0.813602 24.1864C0.292661 23.6655 0 22.9589 0 22.2222V5.55532Z" fill="#0D0D0D"/>
        </svg>
      </button>
      <button type="button" @click="deletePosting">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.59998 2.75999C6.59998 2.08104 6.86969 1.42989 7.34979 0.949796C7.82988 0.469703 8.48103 0.199989 9.15998 0.199989H16.84C17.5189 0.199989 18.1701 0.469703 18.6502 0.949796C19.1303 1.42989 19.4 2.08104 19.4 2.75999V5.31999H24.52C24.8595 5.31999 25.185 5.45485 25.4251 5.69489C25.6651 5.93494 25.8 6.26051 25.8 6.59999C25.8 6.93947 25.6651 7.26504 25.4251 7.50509C25.185 7.74513 24.8595 7.87999 24.52 7.87999H23.1517L22.0419 23.4217C21.9959 24.0676 21.7069 24.6721 21.2331 25.1134C20.7593 25.5547 20.1358 25.8 19.4883 25.8H6.51038C5.86288 25.8 5.23943 25.5547 4.76559 25.1134C4.29176 24.6721 4.00275 24.0676 3.95678 23.4217L2.84958 7.87999H1.47998C1.1405 7.87999 0.814931 7.74513 0.574885 7.50509C0.334838 7.26504 0.199982 6.93947 0.199982 6.59999C0.199982 6.26051 0.334838 5.93494 0.574885 5.69489C0.814931 5.45485 1.1405 5.31999 1.47998 5.31999H6.59998V2.75999ZM9.15998 5.31999H16.84V2.75999H9.15998V5.31999ZM5.4147 7.87999L6.51166 23.24H19.4896L20.5865 7.87999H5.4147ZM10.44 10.44C10.7795 10.44 11.105 10.5748 11.3451 10.8149C11.5851 11.0549 11.72 11.3805 11.72 11.72V19.4C11.72 19.7395 11.5851 20.065 11.3451 20.3051C11.105 20.5451 10.7795 20.68 10.44 20.68C10.1005 20.68 9.77493 20.5451 9.53489 20.3051C9.29484 20.065 9.15998 19.7395 9.15998 19.4V11.72C9.15998 11.3805 9.29484 11.0549 9.53489 10.8149C9.77493 10.5748 10.1005 10.44 10.44 10.44V10.44ZM15.56 10.44C15.8995 10.44 16.225 10.5748 16.4651 10.8149C16.7051 11.0549 16.84 11.3805 16.84 11.72V19.4C16.84 19.7395 16.7051 20.065 16.4651 20.3051C16.225 20.5451 15.8995 20.68 15.56 20.68C15.2205 20.68 14.8949 20.5451 14.6549 20.3051C14.4148 20.065 14.28 19.7395 14.28 19.4V11.72C14.28 11.3805 14.4148 11.0549 14.6549 10.8149C14.8949 10.5748 15.2205 10.44 15.56 10.44V10.44Z" fill="black"/>
        </svg>
      </button>
    </div>
  </article>
  
  <style scoped>
    @import url("/styles/component.css");
    
    :host {
      display: block;
    }
    article {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    img {
      width: 100%;
      height: 265px;
      object-fit: cover;
      border-radius: 4px;
    }
    section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      line-height: 150%;
    }
    h1 {
      font-size: var(--font-24);
      font-weight: 600;
      color: var(--grayscale-6);
    }
    span {
      font-size: var(--font-12);
      font-weight: 600;
      color: var(--grayscale-5);
    }
    p {
      font-size: var(--font-14);
      font-weight: 600;
      color: var(--grayscale-6);
    }
    div {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    button {
      all: unset;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--grayscale-1);
      border: 1px solid var(--grayscale-4);
      border-radius: 4px;
      cursor: pointer;
      padding: 10px;
    }
  </style>
`;

export default window.customElements.define(
  "hny-posting",
  class extends HTMLElementViewModel<Message> {
    constructor() {
      super({
        html,
        data: {
          title: "",
          content: "",
          createdAt: "",
          updatedAt: "",
          postId: "",
          image: "",
        },
        methods: {
          deletePosting: async () => {
            if (!this.$data.postId) return;

            await fetcher(`/post/${this.$data.postId}`, { method: "DELETE" })
              .then(async () => {
                await store.$methods.getMessagesAll();
                Router.push("/");
              })
              .catch((error: AxiosError<{ code: number; message: string }>) => {
                const errorMessage =
                  error.response?.data.message ??
                  "신년 메세지 삭제에 실패했습니다.";

                alert(errorMessage);
              });
          },
          editPosting: () => {},
        },
      });
    }
  }
);
