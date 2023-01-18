import kebobToCamel from "../utils/kebobToCamel";

import {
  isHTMLElement,
  isProperty,
  isNotEmptyString,
} from "../utils/validation";
import ErrorMessage from "../utils/errorMessage";

const HTMLElementViewModel = class<
  T extends Record<string | symbol, any>
> extends HTMLElement {
  $root!: ShadowRoot;
  $data!: T;
  isMounted!: boolean;
  $methods!: { [key: string]: Function };
  $watcher!: Record<keyof T, ((oldValue: any, newValue: any) => void)[]>;
  $ref!: { [key: string]: Element };
  $created!: Function;
  $mounted!: Function;

  constructor({
    html: __html,
    data: __data,
    methods: __methods,
    watch: __watch,
    created: __created,
    mounted: __mounted,
  }: {
    html: string;
    data?: T;
    methods?: { [key: string]: Function };
    watch?: Record<keyof T, ((oldValue: any, newValue: any) => void)[]>;
    created?: Function;
    mounted?: Function;
  }) {
    super();
    this.$root = this.attachShadow({ mode: "open" });
    this.$root.innerHTML = __html;

    this.isMounted = false;

    Object.defineProperties(this, {
      $data: {
        enumerable: true,
        value: new Proxy(__data ?? {}, {
          set: (obj: { [key: string | symbol]: any }, prop, value) => {
            if (this.$watcher[prop].length !== 0) {
              this.$watcher[prop].forEach((cb) => cb(obj[prop], value));
            }

            obj[prop] = value;

            return true;
          },
        }),
      },
      $methods: {
        enumerable: true,
        value: __methods ?? {},
      },
      $watcher: {
        value: new Proxy(__watch ?? {}, {
          get: (obj: { [key: string | symbol]: any }, prop) => {
            if (obj[prop] === undefined) {
              obj[prop] = [];
            }

            return obj[prop];
          },
        }),
      },
      $ref: {
        value: {},
      },
      $created: {
        value: __created,
      },
      $mounted: {
        value: __mounted,
      },
    });

    if (this.$created !== undefined && this.$created !== null) {
      this.$created.call(this);
    }
  }

  $emit(eventName: string, detail: any) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail,
      })
    );
  }

  connectedCallback() {
    if (this.isMounted) {
      return;
    }

    this.isMounted = true;

    if (this.isConnected) {
      this.$root.querySelectorAll("*").forEach((el) => {
        for (const name of el.getAttributeNames()) {
          if (name.startsWith("@")) {
            const eventName = name.slice(1);
            const handlerName = el.getAttribute(name);
            bindEvent.call(this, el, eventName, handlerName);
          } else if (name.startsWith("m-prop-")) {
            const propName = kebobToCamel(name, { ignorePrefix: "m-prop" });
            const dataName = el.getAttribute(name);
            bindProperty.call(this, el, propName, dataName);
          } else if (name.startsWith("m-attr-")) {
            const attrName = kebobToCamel(name, { ignorePrefix: "m-attr" });
            const dataName = el.getAttribute(name);
            bindAttribute.call(this, el, attrName, dataName);
          } else if (name.startsWith("m-bidata-") && !name.endsWith("__bind")) {
            const dataName = el.getAttribute(name);
            twoWayBinding.call(this, el, name, dataName);
          } else if (name === "m-ref") {
            const refName = el.getAttribute(name);
            registerRef.call(this, el, refName);
          }
        }
      });

      for (const name of this.getAttributeNames()) {
        if (name.startsWith("m-bidata-") && !name.endsWith("__bind")) {
          const dataName = kebobToCamel(name, { ignorePrefix: "m-bidata" });
          twoWayBinding.call(this, this, name, dataName);
        } else if (name.startsWith("m-data-")) {
          const dataName = kebobToCamel(name, { ignorePrefix: "m-data" });
          const value = this.getAttribute(name);
          setData.call(this, this, dataName, value);
        }
      }

      if (this.$mounted !== undefined && this.$mounted !== null) {
        setTimeout(() => this.$mounted.call(this), 0);
      }
    }
  }
};

function bindEvent(
  this: InstanceType<typeof HTMLElementViewModel>,
  target: Element,
  name: string,
  handlerName: string | null
) {
  if (!isHTMLElement(target)) {
    console.error(ErrorMessage["isNotHTMLElementMsg"]);
    return;
  }

  if (!isProperty(this.$methods, handlerName)) {
    console.error(ErrorMessage["isNotPropertyMsg"], handlerName);
    return;
  }

  if (!handlerName) return;

  target.addEventListener(name, (evt) =>
    this.$methods[handlerName].call(this, evt)
  );
}

function twoWayBinding(
  this: InstanceType<typeof HTMLElementViewModel>,
  target: Element,
  attrName: string,
  dataName: string | null
) {
  if (!isHTMLElement(target)) {
    console.error(ErrorMessage["isNotHTMLElementMsg"]);
    return;
  }

  if (!isProperty(this.$data, dataName)) {
    console.error(ErrorMessage["isNotPropertyMsg"], dataName);
    return;
  }

  if (!dataName) return;

  new MutationObserver((_) => {
    const value = target.getAttribute(`${attrName}__bind`);

    if (this.$data[dataName] !== value) {
      this.$data[dataName] = value;
    }
  }).observe(target, {
    attributes: true,
    attributeFilter: [`${attrName}__bind`],
  });

  target.setAttribute(`${attrName}__bind`, this.$data[dataName]);
  this.$watcher[dataName].push((_, newValue) =>
    target.setAttribute(`${attrName}__bind`, newValue)
  );
}

function bindProperty<T extends Element, K extends keyof T>(
  this: InstanceType<typeof HTMLElementViewModel>,
  target: T,
  propName: string,
  dataName: string | null
) {
  if (!isHTMLElement(target)) {
    console.error(ErrorMessage["isNotHTMLElementMsg"]);
    return;
  }

  if (!isProperty(target, propName)) {
    console.error(ErrorMessage["isNotPropertyMsg"]);
    return;
  }

  if (!isProperty(this.$data, dataName)) {
    console.error(ErrorMessage["isNotPropertyMsg"]);
    return;
  }

  if (!dataName) return;

  target[propName as K] = this.$data[dataName];
  this.$watcher[dataName].push(
    (_, newValue) => (target[propName as K] = newValue)
  );
}

function bindAttribute(
  this: InstanceType<typeof HTMLElementViewModel>,
  target: Element,
  attrName: string,
  dataName: string | null
) {
  if (!isHTMLElement(target)) {
    console.error(ErrorMessage["isNotHTMLElementMsg"]);
    return;
  }

  if (!isProperty(this.$data, dataName)) {
    console.error(ErrorMessage["isNotPropertyMsg"]);
    return;
  }

  if (!dataName) return;

  target.setAttribute(attrName, this.$data[dataName]);
  this.$watcher[dataName].push((_, newValue) =>
    target.setAttribute(attrName, newValue)
  );
}

function setData(
  this: InstanceType<typeof HTMLElementViewModel>,
  target: Element,
  dataName: string,
  value: any
) {
  if (!isHTMLElement(target)) {
    console.error(ErrorMessage["isNotHTMLElementMsg"]);
    return;
  }

  if (!isProperty(this.$data, dataName)) {
    console.error(ErrorMessage["isNotPropertyMsg"], dataName);
    return;
  }

  this.$data[dataName] = value;
}

function registerRef(
  this: InstanceType<typeof HTMLElementViewModel>,
  target: Element,
  refName: string | null
) {
  if (!isHTMLElement(target)) {
    console.error(ErrorMessage["isNotHTMLElementMsg"]);
    return;
  }

  if (!isNotEmptyString(refName)) {
    console.error(ErrorMessage["isEmptyStringMsg"]);
    return;
  }

  if (isProperty(this.$ref, refName)) {
    console.error(ErrorMessage["isAlreadyRegisteredRefMsg"]);
    return;
  }

  if (!refName) return;

  this.$ref[refName] = target;
}

export default HTMLElementViewModel;
