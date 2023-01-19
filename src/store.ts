import dayjs from "dayjs";
import HTMLElementViewModel from "./core/HTMLElementViewModel.js";
import { Message } from "./types/index.js";
import fetcher from "./utils/api.js";

window.customElements.define(
  "hny-store",
  class extends HTMLElementViewModel<{
    loading: boolean;
    messages: Message[];
    message: Message | null;
    comments: Comment[];
  }> {
    constructor() {
      super({
        html: "",
        data: {
          loading: false,
          messages: [],
          message: null,
          comments: [],
        },
        methods: {
          getMessagesAll: async () => {
            this.$data.loading = true;

            const response = await fetcher("/posts", {
              method: "GET",
            });

            this.$data.messages = response.data.data.posts.reverse();

            this.$data.loading = false;
          },
          getMessageById: async (id: string) => {
            this.$data.loading = true;

            const response = await fetcher(`/post/${id}`, { method: "GET" });

            if (!response.data.success) {
              this.$data.message = null;
              this.$data.comments = [];
              return;
            }

            const { comments, post } = response.data.data;

            this.$data.message = {
              ...post,
              createdAt: dayjs(post.createdAt).format("YYYY-MM-DD HH:mm"),
              updatedAt: dayjs(post.updated).format("YYYY-MM-DD HH:mm"),
            };
            this.$data.comments = comments;

            this.$data.loading = false;
          },
        },
      });
    }
  }
);

const store = document.createElement("hny-store") as unknown as InstanceType<
  typeof HTMLElementViewModel
>;
document.body.appendChild(store);

export default store;
