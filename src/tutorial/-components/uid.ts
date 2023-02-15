// Copy-pasted from the ember-source implementation:

import { Directive, Ref, shallowRef } from "vue";

// https://github.com/emberjs/ember.js/blob/master/packages/@ember/-internals/glimmer/lib/helpers/unique-id.ts
export function uniqueId() {
  // @ts-expect-error this is an intentional use of a terse and valid syntax, but it's usually so
  // confusing that it's good that TS stops you from using it.
  return ([3e7] + -1e3 + -4e3 + -2e3 + -1e11).replace(/[0-3]/g, (a) =>
    ((a * 4) ^ ((Math.random() * 16) >> (a & 2))).toString(16)
  );
}

class UidRef<E extends HTMLElement = HTMLElement> {
  static set<E extends HTMLElement>(
    ref: UidRef<E>,
    id: string,
    element: E
  ): void {
    ref.#id.value = id;
    ref.#element.value = element;
  }

  readonly #id = shallowRef(uniqueId());
  readonly #element = shallowRef(null as null | E);

  get id(): Ref<string> {
    return this.#id;
  }

  get element(): Ref<HTMLElement | null> {
    return this.#element;
  }
}

export function uidRef<E extends HTMLElement>(): UidRef<E> {
  return new UidRef();
}

export const vUid: Directive<HTMLElement, UidRef> = {
  created(el, { value }) {
    const id = el.id || uniqueId();
    UidRef.set(value, id, el);
    el.setAttribute("id", id);
  },
  // TODO: Figure out how to make sure that the id used in the template actually updates with SSR.
  getSSRProps() {
    return {
      id: uniqueId(),
    };
  },
};
