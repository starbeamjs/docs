export function parse<T>(
  raw: TemplateStringsArray,
  ...dynamicItems: T[]
): Lines<T> {
  const tokens = tokenize([...raw], dynamicItems);

  const lines: Line<T>[] = [];
  let buffer: Fragment<T>[] = [];

  for (const token of tokens) {
    if (token.type === "newline") {
      lines.push(Line.from(buffer));
      buffer = [];
    } else {
      buffer.push(token);
    }
  }

  return Lines.of(lines);
}

type TemplateFn<I extends (items: Lines<any>) => any> =
  I extends (items: Lines<infer T>) => infer U
    ? (items: TemplateStringsArray, ...dynamicItems: T[]) => U
    : never;

type StringifyFn<I extends (items: Lines<any>) => any> =
  I extends (items: Lines<infer T>) => any
    ? (item: T) => string
    : never;

export function parsed<
  Impl extends (items: Lines<any>) => string
>(impl: Impl): TemplateFn<Impl>;
export function parsed<Impl extends (items: Lines<any>) => any>(
  impl: Impl,
  stringify: StringifyFn<Impl>
): TemplateFn<Impl>;

export function parsed<Impl extends (items: Lines<any>) => any>(
  impl: Impl
): TemplateFn<Impl> {
  return ((raw, ...dynamicItems) =>
    impl(parse(raw, ...dynamicItems))) as TemplateFn<Impl>;
}

export function tokenize<T>(
  staticItems: string[],
  dynamicItems: T[]
): Tokenized<T>[] {
  const tokens: Tokenized<T>[] = [];

  staticItems.forEach((staticItem, i) => {
    tokens.push(...parseStaticItem<T>(staticItem));

    if (dynamicItems.length > i) {
      const dynamicItem = dynamicItems[i] as T;
      tokens.push(DynamicToken.of(dynamicItem));
    }
  });

  return tokens;
}

function parseStaticItem<T>(
  staticItem: string
): TokenizedStatic[] {
  const tokens: TokenizedStatic[] = [];
  let nextNewline = staticItem.indexOf("\n");

  while (nextNewline !== -1) {
    const next = staticItem.slice(0, nextNewline);
    staticItem = staticItem.slice(nextNewline + 1);

    if (next !== "") {
      tokens.push(TextToken.of(next));
    }
    tokens.push(NEWLINE);

    nextNewline = staticItem.indexOf("\n");
  }

  if (staticItem !== "") {
    tokens.push(TextToken.of(staticItem));
  }

  return tokens;
}

interface AbstractToken {
  readonly type: string;
  display(stringify: (value: unknown) => string): string;
}

class TextToken implements AbstractToken {
  static of(value: string): TextToken {
    return new TextToken(value);
  }

  readonly type = "text";

  private constructor(readonly value: string) {
    if (value === "") {
      throw new Error("Text tokens must not be empty");
    }
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `Text(${JSON.stringify(this.value)})`;
  }

  slice(
    from: number,
    to?: number | undefined
  ): TextToken | null {
    const sliced = this.value.slice(from, to);

    if (sliced.length === 0) {
      return null;
    } else {
      return TextToken.of(this.value.slice(from, to));
    }
  }

  display() {
    return this.value;
  }
}

class NewlineToken implements AbstractToken {
  readonly type = "newline";

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `Newline`;
  }

  display() {
    return "\n";
  }
}

const NEWLINE = new NewlineToken();

class DynamicToken<T> implements AbstractToken {
  static of<T>(value: T): DynamicToken<T> {
    return new DynamicToken(value);
  }

  readonly type = "dynamic";

  private constructor(readonly value: T) {}

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.value;
  }

  display(stringify: (value: T) => string): string {
    return stringify(this.value);
  }
}

export type ProcessLine<T> = (
  line: Line<T>
) => Line<T>[] | undefined;

export class Lines<T> {
  static of<T>(lines: Line<T>[]): Lines<T> {
    return new Lines(lines);
  }

  readonly #lines: Line<T>[];

  constructor(lines: Line<T>[]) {
    this.#lines = lines;
  }

  minIndent(): number {
    return Math.min(
      ...this.#lines.map(
        (line) => line.indent?.indent ?? Infinity
      )
    );
  }

  dedent(indent: number): Lines<T> {
    return Lines.of(
      this.#lines.map((line) => line.dedent(indent))
    );
  }

  display(stringify: (item: T) => string): string;
  display(this: Lines<string>): string;
  display(stringify?: (item: T) => string): string {
    return this.#lines
      .map((line) => line.display(stringify as any))
      .join("\n");
  }

  *[Symbol.iterator](): IterableIterator<Line<T>> {
    for (const line of this.#lines) {
      yield line;
    }
  }

  process(lineno: number, processor: ProcessLine<T>): void {
    const line = this.#lines[lineno];

    if (!line) {
      return;
    }

    const lines = processor(line);

    if (lines) {
      this.#lines.splice(lineno, 1, ...lines);
    }
  }

  processFirst(
    processor: (line: Line<T>) => Line<T>[] | undefined
  ): void {
    this.process(0, processor);
  }

  processLast(
    processor: (line: Line<T>) => Line<T>[] | undefined
  ): void {
    if (this.#lines.length === 0) {
      return;
    }

    this.process(this.#lines.length - 1, processor);
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.#lines;
  }
}

class IndentToken implements AbstractToken {
  static of(indent: number): IndentToken {
    return new IndentToken(indent);
  }

  readonly type = "indent";

  constructor(readonly indent: number) {
    if (indent === 0) {
      throw new Error("Indent tokens must not be zero");
    }
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `Indent(${this.indent})`;
  }

  display(): string {
    return " ".repeat(this.indent);
  }

  dedent(indent: number): IndentToken | null {
    if (this.indent - indent <= 0) {
      return null;
    } else {
      return IndentToken.of(this.indent - indent);
    }
  }
}

class Line<T> {
  static from<T>(fragments: readonly Fragment<T>[]): Line<T> {
    const [first, ...rest] = fragments;

    if (first?.type === "text") {
      const indent = first.value.match(/^\s*/)?.[0].length ?? 0;
      const textToken = first.slice(indent);

      const tokens: LineTokens<T> = [
        IndentToken.of(indent),
        ...(textToken ? [textToken] : []),
        ...rest,
      ];

      return new Line(tokens);
    } else {
      return new Line(fragments as LineTokens<T>);
    }
  }

  private constructor(readonly tokens: LineTokens<T>) {}

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.tokens;
  }

  isEmpty(): boolean {
    return this.tokens.length === 0;
  }

  get indent(): IndentToken | null {
    const [first] = this.tokens;
    if (first?.type === "indent") {
      return first;
    } else {
      return null;
    }
  }

  dedent(indent: number): Line<T> {
    if (this.tokens.length === 0) {
      return this;
    }

    const [first, ...rest] = this.tokens as [
      IndentToken | Fragment<T>,
      ...Fragment<T>[]
    ];

    if (first.type !== "indent") {
      return this;
    }

    const dedented = first.dedent(indent);

    if (dedented) {
      return new Line([dedented, ...rest]);
    } else {
      return new Line(rest as LineTokens<T>);
    }
  }

  display(stringify: (item: T) => string): string;
  display(this: Line<string>): string;
  display(stringify: (item: T) => string = String): string {
    return this.tokens
      .map((token) => token.display(stringify as any))
      .join("");
  }
}

type TokenizedStatic = TextToken | NewlineToken;
type Tokenized<T> = TokenizedStatic | DynamicToken<T>;
type Token<T> =
  | IndentToken
  | TextToken
  | NewlineToken
  | DynamicToken<T>;

type Fragment<T> = TextToken | DynamicToken<T>;
type LineTokens<T> = Token<T>[] &
  (
    | readonly [IndentToken?, ...Fragment<T>[]]
    | readonly Fragment<T>[]
  );

export const strip = parsed((lines: Lines<string>): string => {
  console.log(lines);
  const minIndent = lines.minIndent();
  lines = lines.dedent(minIndent);

  return lines.display();
});

strip`
    hello
  ${"world\nhi"}
    bye
`;
