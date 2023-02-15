import { onUnmounted, shallowRef } from "vue";

type Sizes = Record<string, [from: number, to: number]>;

export function PageSize<S extends Sizes>(sizes: S) {
  const controller = new AbortController();
  const signal = controller.signal;

  const matches = Object.fromEntries(
    Object.entries(sizes).map(([size, [from, to]]) => {
      const match =
        to === Infinity
          ? matchMedia(`(${from}px <= width)`)
          : matchMedia(`(${from}px <= width <= ${to}px)`);

      match.addEventListener("change", updateSize, { signal });

      return [size, match];
    })
  );

  function getSize(): keyof S {
    const match = Object.entries(matches)
      .filter(([, query]) => query.matches)
      .map(([name]) => name)[0];

    if (match === undefined) {
      throw Error(
        `No match found in ${JSON.stringify(sizes)}, viewport is: ${window.visualViewport?.width}px`
      );
    }

    return match;
  }

  const size = shallowRef("large" as keyof S);

  let queued = false;

  function updateSize() {
    if (queued === false) {
      queued = true;
      requestAnimationFrame(() => {
        size.value = getSize();
        queued = false;
      });
    }
  }

  onUnmounted(() => {
    controller.abort();
  });

  return size;
}
