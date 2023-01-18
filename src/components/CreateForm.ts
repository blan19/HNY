import axios, { AxiosError } from "axios";
import HTMLElementViewModel from "../core/HTMLElementViewModel";
import store from "../store";
import fetcher from "../utils/api";
import Router from "../utils/Router";

const html = /* html */ `
  <form>
    <section @click="uploadImage" m-ref="thumbnail">
      <div>
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M38 0.5H8C6.01088 0.5 4.10322 1.29018 2.6967 2.6967C1.29018 4.10322 0.5 6.01088 0.5 8V38C0.5 39.9891 1.29018 41.8968 2.6967 43.3033C4.10322 44.7098 6.01088 45.5 8 45.5H38C39.9891 45.5 41.8968 44.7098 43.3033 43.3033C44.7098 41.8968 45.5 39.9891 45.5 38V8C45.5 6.01088 44.7098 4.10322 43.3033 2.6967C41.8968 1.29018 39.9891 0.5 38 0.5ZM8 5.5H38C38.663 5.5 39.2989 5.76339 39.7678 6.23223C40.2366 6.70107 40.5 7.33696 40.5 8V28.9L32.5 22.075C31.2605 21.0551 29.7052 20.4975 28.1 20.4975C26.4948 20.4975 24.9395 21.0551 23.7 22.075L5.5 37.25V8C5.5 7.33696 5.76339 6.70107 6.23223 6.23223C6.70107 5.76339 7.33696 5.5 8 5.5ZM38 40.5H9.4L26.9 25.9C27.2362 25.6504 27.6438 25.5156 28.0625 25.5156C28.4812 25.5156 28.8888 25.6504 29.225 25.9L40.5 35.5V38C40.5 38.663 40.2366 39.2989 39.7678 39.7678C39.2989 40.2366 38.663 40.5 38 40.5Z" fill="#E2E2E2"/>
          <path d="M13 18C15.0711 18 16.75 16.3211 16.75 14.25C16.75 12.1789 15.0711 10.5 13 10.5C10.9289 10.5 9.25 12.1789 9.25 14.25C9.25 16.3211 10.9289 18 13 18Z" fill="#E2E2E2"/>
        </svg>
      </div>
      <img m-prop-src="image" alt="thumbnail" />
    </section>
    <label for="title">
      <h1>제목</h1>
      <input @input="changeTitleValue" id="title" placeholder="글 제목을 입력해주세요." m-prop-value="title"/>
    </label>
    <label for="content">
      <h1>내용</h1>
      <textarea @input="changeContentValue" id="content" placeholder="글 내용을 입력해주세요." spellcheck="false" m-prop-value="content"></textarea>
    </label>
    <button type="submit" @click="submit">등록하기</button>
  </form>

  <style scoped>
    @import url("/styles/component.css");

    :host {
      display: block;
      height: 100%;
    }
    form {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 28px;
      padding: 16px 0;
    }
    section {
      width: 100%;
      height: 170px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #E2E2E2;
      border-radius: 12px;
      cursor: pointer;
    }
    section[data-thumbnail="true"] > div {
      display: none;
    }
    section[data-thumbnail="false"] > img {
      display: none;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    label[for="content"] {
      flex: 1;
    }
    input {
      all: unset;
      cursor: auto;
      font-size: var(--font-20);
      color: var(--grayscale-6);
      padding-bottom: 6px;
      border-bottom: 2px solid var(--grayscale-3);
    }
    input::placeholder {
      color: var(--grayscale-4);
      font-weight: 300
    }
    textarea {
      all: unset;
      cursor: auto;
      height: 100%;
    }
    textarea::placeholder {
      color: var(--grayscale-4);
      font-weight: 300
    }
    h1 {
      font-size: var(--font-24);
      color: var(--grayscale-6);
      font-weight: 600
    }
    button {
      all: unset;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--primary);
      font-size: var(--font-24);
      color: var(--grayscale-1);
      font-weight: 600;
      padding: 20px 0;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
`;

export default window.customElements.define(
  "hny-create-form",
  class extends HTMLElementViewModel<{
    title: string;
    content: string;
    image: string | null;
  }> {
    constructor() {
      super({
        html,
        data: {
          title: "",
          content: "",
          image: null,
        },
        methods: {
          changeTitleValue: ({ target }: { target: HTMLInputElement }) => {
            this.$data.title = target.value;
          },
          changeContentValue: ({ target }: { target: HTMLTextAreaElement }) => {
            this.$data.content = target.value;
          },
          uploadImage: async () => {
            if (this.$data.image !== null) return;

            await axios({
              method: "GET",
              headers: {
                Authorization: `Client-ID ${process.env.VITE_UNSPLASH_ACCESS_KEY}`,
              },
              url: `https://api.unsplash.com/photos/random`,
            })
              .then((response) => {
                const image = response.data.urls.regular;

                this.$data.image = image;
              })
              .catch(() => {
                this.$data.image = null;
                alert(`이미지 업로드에 실패했습니다.`);
              });
          },
          submit: async (e: SubmitEvent) => {
            e.preventDefault();

            const isRequired = Object.values(this.$data).every((v) => v);

            if (!isRequired) {
              alert("모두 입력해주세요.");
              return;
            }

            const data = {
              title: this.$data.title,
              content: this.$data.content,
              image: this.$data.image,
            };

            await fetcher("/post", { method: "POST", data })
              .then((response) => {
                const message = response.data.post;
                store.$data.messages.push(message);
                Router.push("/");
              })
              .catch((error: AxiosError<{ code: number; message: string }>) => {
                const errorMessage =
                  error.response?.data.message ??
                  "신년 메세지 등록에 실패했습니다.";

                alert(errorMessage);
              });
          },
        },
        mounted: () => {
          this.$ref.thumbnail.setAttribute("data-thumbnail", "false");
        },
        watch: {
          image: [
            (_, newValue) => {
              if (newValue !== null)
                this.$ref.thumbnail.setAttribute("data-thumbnail", "true");
              else this.$ref.thumbnail.setAttribute("data-thumbnail", "false");
            },
          ],
        },
      });
    }
  }
);
