import ErrorMessage from "./errorMessage";

type CustomHTMLElementTagNameMapKey = keyof HTMLElementTagNameMap | "hny-app";

const el = (
  selector: CustomHTMLElementTagNameMapKey,
  element?: Element | Document
) => {
  element = element || document;

  if (!selector) {
    throw Error(ErrorMessage["isNotPropertyMsg"]);
  }

  return element.querySelector(selector);
};

export { el };
