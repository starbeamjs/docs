export interface SpecifiedFont {
  readonly name: string;
  readonly weight: AxisValue;
  readonly italic?: AxisValue;
}

export class GoogleFonts {
  static from(fonts: SpecifiedFont[]) {
    return new GoogleFonts(fonts.map((font) => GoogleFont.from(font)));
  }

  #fonts: GoogleFont[];

  constructor(fonts: GoogleFont[]) {
    this.#fonts = fonts;
  }

  add(font: GoogleFont): this {
    this.#fonts.push(font);
    return this;
  }

  /**
   * https://fonts.googleapis.com/css2?family=<spec>[&family=<spec>...][&text=<text>][&display=<display>]
   */
  toURL({
    text,
    display = "block",
  }: {
    text?: string;
    display?: "auto" | "block" | "swap" | "fallback" | "optional";
  } = {}): string {
    let qps = this.#fonts.map((font) => font.spec).join("&");
    qps += `&display=${display}`;

    if (text) {
      qps += `&text=${encodeURIComponent(text)}`;
    }

    return `https://fonts.googleapis.com/css2?${qps}`;
  }
}

export class GoogleFont {
  static from(font: SpecifiedFont): GoogleFont {
    return new GoogleFont(
      font.name,
      FontAxes.from({
        wght: font.weight,
        ital: font.italic,
      })
    );
  }

  #family: string;
  #axes: FontAxes;

  constructor(family: string, axes: FontAxes) {
    this.#family = family;
    this.#axes = axes;
  }

  get spec() {
    return this.#axes.toSpec(this.#family);
  }
}

type AxisValue =
  | `${string}..${string}`
  | [string | number, ...(string | number)[]];

type SpecifiedAxes = {
  [P in AxisName]?: AxisValue;
};

export class FontAxes {
  static from(specified: SpecifiedAxes): FontAxes {
    const axes: FontAxes = new FontAxes([]);

    for (const [name, value] of Object.entries(specified)) {
      if (value === undefined) {
        continue;
      }
      axes.add(name as AxisName, value as AxisValue);
    }

    return axes;
  }

  #axes: FontAxis[];

  constructor(axes: FontAxis[]) {
    this.#axes = axes;
  }

  add(name: AxisName, value: AxisValue) {
    this.#axes.push(FontAxis.from(name, value));
  }

  /**
   * spec: <family_name>[:<axis_tag_list>@<axis_tuple_list>]
   * axis_tag_list: <axis>[,<axis>...] // Sorted alphabetically
   * axis: An axis tag, e.g. ital, wdth, wght
   * axis_tuple_list: <axis_tuple>[;<axis_tuple>...]
   */
  toSpec(family: string): string {
    const axes = this.#axes.sort((a, b) =>
      a.toAxisTag().localeCompare(b.toAxisTag())
    );

    const axisTagList = axes.map((axis) => axis.toAxisTag()).join(",");
    const tupleList = this.#permute();

    return `family=${family}:${axisTagList}@${tupleList}`;
  }

  /**
   * Create a list of all possible permutations of the axes.
   *
   * If an axis is a range, it only has one permutation. If an axis is a list,
   * then each element of the list is combined with each permutation of the other axes.
   */
  #permute() {
    const permutations = [...permute(this.#axes.map((axis) => axis.permute()))];
    return permutations.map((p) => p.join(",")).join(";");
  }
}

function* permute<T>(
  toPermute: T[][],
  i: number = 0,
  soFar: T[] = []
): Generator<T[]> {
  if (i < toPermute.length) {
    const currentElements = toPermute[i];
    for (var element of currentElements) {
      yield* permute(toPermute, i + 1, soFar.concat(element));
    }
    if (currentElements.length < 1) {
      yield* permute(toPermute, i + 1, Array.from(soFar));
    }
  } else if (soFar.length > 0) {
    yield soFar;
  }
}

type AxisName = "wght" | "ital";

type AxisVariants =
  | { type: "variable"; from: string; to: string }
  | { type: "fixed"; values: [string, ...string[]] };

export class FontAxis {
  static from(name: AxisName, value: AxisValue): FontAxis {
    if (typeof value === "string") {
      // verify that the string matches the format of a range
      if (!/^[\d.]+..[\d.]+$/.test(value)) {
        throw new Error(`Invalid range value for ${name}: ${value}`);
      }

      const [from, to] = value.split("..").map(String);
      return new FontAxis(name, { type: "variable", from, to });
    } else {
      return new FontAxis(name, {
        type: "fixed",
        values: value.map(String) as [string, ...string[]],
      });
    }
  }

  static fixed(name: AxisName, values: [string, ...string[]]): FontAxis {
    return new FontAxis(name, { type: "fixed", values });
  }

  static variable(name: AxisName, range: `${string}..${string}`): FontAxis {
    const [from, to] = range.split("..");
    return new FontAxis(name, { type: "variable", from, to });
  }

  #name: "wght" | "ital";
  #variants: AxisVariants;

  constructor(name: "wght" | "ital", variants: AxisVariants) {
    this.#name = name;
    this.#variants = variants;
  }

  toAxisTag() {
    return this.#name;
  }

  permute(): string[] {
    if (this.#variants.type === "variable") {
      return [`${this.#variants.from}..${this.#variants.to}`];
    } else {
      return this.#variants.values;
    }
  }

  /**
   * axis_tuple: <value>[,<value>...] // Same length as axis_tag_list
   * value: <range> | <float>
   * range: <float>..<float>
   * float: A value within the range of the corresponding axis
   */
  toAxisTuple() {
    if (this.#variants.type === "fixed") {
      return this.#variants.values.join(",");
    } else {
      const { from, to } = this.#variants;
      return `${from}..${to}`;
    }
  }
}
