interface RouterConstructor {
  routes: {
    path: string;
    component: any;
  }[];
}

const Router = class {
  routes;

  constructor({ routes: __routes }: RouterConstructor) {
    this.routes = __routes;
  }

  init() {}

  setup() {}
};

export default Router;
