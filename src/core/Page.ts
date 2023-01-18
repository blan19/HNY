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
    this.$target.innerHTML = "";
    const Header = document.createElement("hny-header");
    const Main = document.createElement("main");
    this.$target.appendChild(Header);
    this.$target.appendChild(Main);
    const Component = this.#component;
    new Component({ target: Main });
  }
};

export type { PageProps };
export default Page;
