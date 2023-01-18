import ErrorMessage from "./errorMessage";

type CustomHTMLElementTagNameMapKey = keyof HTMLElementTagNameMap | "hny-app";

type ErrorWithMessage = {
  message: string;
};

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
};

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
};

const getErrorMessage = (error: unknown) => toErrorWithMessage(error).message;

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

const isDeepEqual = <T, K>(target: T, value: K) => {
  return JSON.stringify(target) === JSON.stringify(value);
};

export { el, getErrorMessage, isDeepEqual };
