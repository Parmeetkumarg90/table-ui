export const getDebounce = <A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number = 500,
): ((args: A) => Promise<R>) => {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args: A): Promise<R> =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(fn(args));
      }, ms);
    });

  return debouncedFunc;
};
