import HTMLElementViewModel from "./core/HTMLElementViewModel.js";
import { ApiResponse, Message } from "./types/index.js";
import { clientFetcher } from "./utils/api.js";

window.customElements.define(
  "hny-store",
  class extends HTMLElementViewModel<{
    loading: boolean;
    messages: Message[];
    comments: Comment[];
  }> {
    constructor() {
      super({
        html: "",
        data: {
          loading: false,
          messages: [],
          comments: [],
        },
        methods: {
          getMessagesAll: async () => {
            this.$data.loading = true;

            const result: ApiResponse<{ posts: Message[] }> =
              await clientFetcher("/posts", {
                method: "GET",
              });

            this.$data.messages = result.data.posts;

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
