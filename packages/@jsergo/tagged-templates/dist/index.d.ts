export declare function parse<T>(raw: TemplateStringsArray, ...dynamicItems: T[]): Lines<T>;
type TemplateFn<I extends (items: Lines<any>) => any> = I extends (items: Lines<infer T>) => infer U ? (items: TemplateStringsArray, ...dynamicItems: T[]) => U : never;
type StringifyFn<I extends (items: Lines<any>) => any> = I extends (items: Lines<infer T>) => any ? (item: T) => string : never;
export declare function parsed<Impl extends (items: Lines<any>) => string>(impl: Impl): TemplateFn<Impl>;
export declare function parsed<Impl extends (items: Lines<any>) => any>(impl: Impl, stringify: StringifyFn<Impl>): TemplateFn<Impl>;
export declare function tokenize<T>(staticItems: string[], dynamicItems: T[]): Tokenized<T>[];
interface AbstractToken {
    readonly type: string;
    display(stringify: (value: unknown) => string): string;
}
declare class TextToken implements AbstractToken {
    readonly value: string;
    static of(value: string): TextToken;
    readonly type = "text";
    private constructor();
    slice(from: number, to?: number | undefined): TextToken | null;
    display(): string;
}
declare class NewlineToken implements AbstractToken {
    readonly type = "newline";
    display(): string;
}
declare class DynamicToken<T> implements AbstractToken {
    readonly value: T;
    static of<T>(value: T): DynamicToken<T>;
    readonly type = "dynamic";
    private constructor();
    display(stringify: (value: T) => string): string;
}
export type ProcessLine<T> = (line: Line<T>) => Line<T>[] | undefined;
export declare class Lines<T> {
    #private;
    static of<T>(lines: Line<T>[]): Lines<T>;
    constructor(lines: Line<T>[]);
    minIndent(): number;
    dedent(indent: number): Lines<T>;
    display(stringify: (item: T) => string): string;
    display(this: Lines<string>): string;
    [Symbol.iterator](): IterableIterator<Line<T>>;
    process(lineno: number, processor: ProcessLine<T>): void;
    processFirst(processor: (line: Line<T>) => Line<T>[] | undefined): void;
    processLast(processor: (line: Line<T>) => Line<T>[] | undefined): void;
}
declare class IndentToken implements AbstractToken {
    readonly indent: number;
    static of(indent: number): IndentToken;
    readonly type = "indent";
    constructor(indent: number);
    display(): string;
    dedent(indent: number): IndentToken | null;
}
declare class Line<T> {
    readonly tokens: LineTokens<T>;
    static from<T>(fragments: readonly Fragment<T>[]): Line<T>;
    private constructor();
    isEmpty(): boolean;
    get indent(): IndentToken | null;
    dedent(indent: number): Line<T>;
    display(stringify: (item: T) => string): string;
    display(this: Line<string>): string;
}
type TokenizedStatic = TextToken | NewlineToken;
type Tokenized<T> = TokenizedStatic | DynamicToken<T>;
type Token<T> = IndentToken | TextToken | NewlineToken | DynamicToken<T>;
type Fragment<T> = TextToken | DynamicToken<T>;
type LineTokens<T> = Token<T>[] & (readonly [IndentToken?, ...Fragment<T>[]] | readonly Fragment<T>[]);
export {};
//# sourceMappingURL=index.d.ts.map