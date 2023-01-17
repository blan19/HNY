type ComponentProps = {
  target: Element;
};

const Component = class {
  $target;

  constructor({ target }: ComponentProps) {
    this.$target = target;
  }

  setup() {
    throw "override";
  }
};

export type { ComponentProps };
export default Component;
