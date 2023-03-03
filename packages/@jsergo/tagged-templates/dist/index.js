export function parse(raw, ...dynamicItems) {
    const tokens = tokenize([
        ...raw
    ], dynamicItems);
    const lines = [];
    let buffer = [];
    for (const token of tokens){
        if (token.type === "newline") {
            lines.push(Line.from(buffer));
            buffer = [];
        } else {
            buffer.push(token);
        }
    }
    return Lines.of(lines);
}
export function parsed(impl) {
    return (raw, ...dynamicItems)=>impl(parse(raw, ...dynamicItems));
}
export function tokenize(staticItems, dynamicItems) {
    const tokens = [];
    staticItems.forEach((staticItem, i)=>{
        tokens.push(...parseStaticItem(staticItem));
        if (dynamicItems.length > i) {
            const dynamicItem = dynamicItems[i];
            tokens.push(DynamicToken.of(dynamicItem));
        }
    });
    return tokens;
}
function parseStaticItem(staticItem) {
    const tokens = [];
    let nextNewline = staticItem.indexOf("\n");
    while(nextNewline !== -1){
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
let TextToken = class TextToken {
    static of(value) {
        return new TextToken(value);
    }
    constructor(value){
        this.value = value;
        this.type = "text";
        if (value === "") {
            throw new Error("Text tokens must not be empty");
        }
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return `Text(${JSON.stringify(this.value)})`;
    }
    slice(from, to) {
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
};
let NewlineToken = class NewlineToken {
    type = "newline";
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return `Newline`;
    }
    display() {
        return "\n";
    }
};
const NEWLINE = new NewlineToken();
let DynamicToken = class DynamicToken {
    static of(value) {
        return new DynamicToken(value);
    }
    constructor(value){
        this.value = value;
        this.type = "dynamic";
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return this.value;
    }
    display(stringify) {
        return stringify(this.value);
    }
};
export class Lines {
    static of(lines) {
        return new Lines(lines);
    }
    #lines;
    constructor(lines){
        this.#lines = lines;
    }
    minIndent() {
        return Math.min(...this.#lines.map((line)=>line.indent?.indent ?? Infinity));
    }
    dedent(indent) {
        return Lines.of(this.#lines.map((line)=>line.dedent(indent)));
    }
    display(stringify) {
        return this.#lines.map((line)=>line.display(stringify)).join("\n");
    }
    *[Symbol.iterator]() {
        for (const line of this.#lines){
            yield line;
        }
    }
    process(lineno, processor) {
        const line = this.#lines[lineno];
        if (!line) {
            return;
        }
        const lines = processor(line);
        if (lines) {
            this.#lines.splice(lineno, 1, ...lines);
        }
    }
    processFirst(processor) {
        this.process(0, processor);
    }
    processLast(processor) {
        if (this.#lines.length === 0) {
            return;
        }
        this.process(this.#lines.length - 1, processor);
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return this.#lines;
    }
}
let IndentToken = class IndentToken {
    static of(indent) {
        return new IndentToken(indent);
    }
    constructor(indent){
        this.indent = indent;
        this.type = "indent";
        if (indent === 0) {
            throw new Error("Indent tokens must not be zero");
        }
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return `Indent(${this.indent})`;
    }
    display() {
        return " ".repeat(this.indent);
    }
    dedent(indent) {
        if (this.indent - indent <= 0) {
            return null;
        } else {
            return IndentToken.of(this.indent - indent);
        }
    }
};
let Line = class Line {
    static from(fragments) {
        const [first, ...rest] = fragments;
        if (first?.type === "text") {
            const indent = first.value.match(/^\s*/)?.[0].length ?? 0;
            const textToken = first.slice(indent);
            const tokens = [
                IndentToken.of(indent),
                ...textToken ? [
                    textToken
                ] : [],
                ...rest
            ];
            return new Line(tokens);
        } else {
            return new Line(fragments);
        }
    }
    constructor(tokens){
        this.tokens = tokens;
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return this.tokens;
    }
    isEmpty() {
        return this.tokens.length === 0;
    }
    get indent() {
        const [first] = this.tokens;
        if (first?.type === "indent") {
            return first;
        } else {
            return null;
        }
    }
    dedent(indent) {
        if (this.tokens.length === 0) {
            return this;
        }
        const [first, ...rest] = this.tokens;
        if (first.type !== "indent") {
            return this;
        }
        const dedented = first.dedent(indent);
        if (dedented) {
            return new Line([
                dedented,
                ...rest
            ]);
        } else {
            return new Line(rest);
        }
    }
    display(stringify = String) {
        return this.tokens.map((token)=>token.display(stringify)).join("");
    }
};

//# sourceMappingURL=index.js.map