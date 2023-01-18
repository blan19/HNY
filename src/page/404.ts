import Page, { PageProps } from "../core/Page";

const NotFound = class extends Page {
  constructor({ target, component }: PageProps) {
    super({ target, component });
    console.log("404 Not Found..!");
  }

  setup(): void {}
};

export default NotFound;
