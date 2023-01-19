const isDeepEqual = <T, K>(target: T, value: K) => {
  return JSON.stringify(target) === JSON.stringify(value);
};

export { isDeepEqual };
