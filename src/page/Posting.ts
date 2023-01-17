import Page, { PageProps } from "../core/Page";

const PostingPage = class extends Page {
  constructor({ target, component }: PageProps) {
    super({ target, component });

    this.setup();
  }

  setup(): void {}
};

export default PostingPage;
