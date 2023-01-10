// #region custom
import { Cell, Formula } from "@starbeam/universal";

// The function passed to `Custom.define` is the reactive constructor.
const FormattedDate = Reactive(() => {
  // #highlight:end
  const date = Cell(new Date());
  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "long",
  });

  const formatted = Formula(() =>
    formatter.format(date.current)
  );

  // #highlight:start
  // The return value of the reactive constructor is the reactive object.
  return {
    get date() {
      return date.current;
    },

    get formatted() {
      return formatted.current;
    },

    refresh() {
      date.set(new Date());
    },
  };
});
// #endregion

{
  // #region format-component
  function DateComponent() {
    const date = use(FormattedDate);

    return reactive(() => (
      <div>
        <p>{date.formatted}</p>
        <button onClick={() => date.refresh()}>🔃</button>
      </div>
    ));
  }
  // #endregion
}

{
  // #region use-reactive
  function DateComponent() {
    return use(
      Reactive(() => {
        const date = FormattedDate.setup();

        return () => (
          <div>
            <p>{date.formatted}</p>
            <button onClick={() => date.refresh()}>🔃</button>
          </div>
        );
      })
    );
  }
  // #endregion
}

{
  // #region class-based
  class FormattedDateImpl {
    readonly #date = Cell(new Date());
    readonly #formatter = new Intl.DateTimeFormat(undefined, {
      dateStyle: "full",
      timeStyle: "long",
    });

    get formatted() {
      return this.#formatter.format(this.#date.current);
    }

    get date() {
      return this.#date.current;
    }

    refresh() {
      this.#date.set(new Date());
    }
  }
  // #endregion

  const FormattedDate = Reactive.class(FormattedDateImpl);

  // #region class-component
  function DateComponent() {
    return use(
      Reactive(() => {
        const date = FormattedDate();

        return () => (
          <div>
            <p>{date.formatted}</p>
            <button onClick={() => date.refresh()}>🔃</button>
          </div>
        );
      })
    );
  }
  // #endregion
}

// #region dts
import type { Reactive } from "@starbeam/interfaces";

declare function use<T>(blueprint: CustomBlueprint<T>): T;

declare function reactive<T>(callback: () => T): T;

declare const Reactive: (<A>(
  this: void,
  create: (builder: CustomBuilder) => A
) => CustomBlueprint<A>) & {
  class: ReactiveClass;
};

declare interface ReactiveClass {
  <A extends readonly unknown[], R>(
    create: new () => R
  ): () => R;
  <A extends readonly unknown[], R>(
    create: new (...args: A) => R
  ): (...args: A) => CustomBlueprint<R>;
}

declare class CustomBuilder {}

declare class CustomBlueprint<T> {
  readonly setup: () => T;
}
// #endregion
