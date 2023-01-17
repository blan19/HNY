import Component, { ComponentProps } from "./Component";

type PageProps = ComponentProps & {
  component: typeof Component;
};

const Page = class extends Component {
  #component;

  constructor({ target, component }: PageProps) {
    super({ target });

    this.#component = component;

    this.setup();
  }

  setup(): void {
    const Component = this.#component;
    new Component({ target: this.$target });
  }
};

export type { PageProps };
export default Page;
