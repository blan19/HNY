import Component, { ComponentProps } from "./Component";
import HTMLElementViewModel from "./HTMLElementViewModel";

type PageProps = ComponentProps & {
  component: typeof Component;
};

const html = /* html */ `
<main></main>

<style scoped>
  @import url("/styles/component.css");

  :host {
    display: block;
    height: 100%;
  }
  main {
    height: 100%;
    padding-top: 83px;
  }
</style>
`;

window.customElements.define(
  "hny-main",
  class extends HTMLElementViewModel<{}> {
    constructor() {
      super({
        html,
      });
    }
  }
);

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
    const Main = document.createElement("hny-main");
    this.$target.appendChild(Header);
    this.$target.appendChild(Main);
    const Component = this.#component;
    new Component({
      target: Main.shadowRoot?.querySelector("main") as Element,
    });
  }
};

export type { PageProps };
export default Page;
