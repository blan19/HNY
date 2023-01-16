const isHTMLElement = (el?: Element) => el instanceof HTMLElement;

const isProperty = (target: { [key: string]: any }, property: string | null) =>
  property !== null && target !== undefined && target[property] !== undefined;

const isNotEmptyString = (str: string | null) =>
  str !== undefined && str !== null && str !== "";

export { isHTMLElement, isProperty, isNotEmptyString };
