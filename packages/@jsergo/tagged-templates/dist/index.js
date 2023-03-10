function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
        return descriptor.get.call(receiver);
    }
    return descriptor.value;
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
        descriptor.set.call(receiver, value);
    } else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
}
function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
    return _classApplyDescriptorGet(receiver, descriptor);
}
function _classPrivateFieldInit(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
}
function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
    _classApplyDescriptorSet(receiver, descriptor, value);
    return value;
}
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
class TextToken {
    static of(value) {
        return new TextToken(value);
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
    constructor(value){
        this.value = value;
        this.type = "text";
        if (value === "") {
            throw new Error("Text tokens must not be empty");
        }
    }
}
let _Symbol_for = Symbol.for("nodejs.util.inspect.custom");
class NewlineToken {
    [_Symbol_for]() {
        return `Newline`;
    }
    display() {
        return "\n";
    }
    constructor(){
        this.type = "newline";
    }
}
const NEWLINE = new NewlineToken();
class DynamicToken {
    static of(value) {
        return new DynamicToken(value);
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return this.value;
    }
    display(stringify) {
        return stringify(this.value);
    }
    constructor(value){
        this.value = value;
        this.type = "dynamic";
    }
}
var _lines = /*#__PURE__*/ new WeakMap();
let _Symbol_iterator = Symbol.iterator, _Symbol_for1 = Symbol.for("nodejs.util.inspect.custom");
export class Lines {
    static of(lines) {
        return new Lines(lines);
    }
    minIndent() {
        var _line_indent_indent;
        return Math.min(..._classPrivateFieldGet(this, _lines).map((line)=>{
            var _line_indent;
            return (_line_indent_indent = (_line_indent = line.indent) === null || _line_indent === void 0 ? void 0 : _line_indent.indent) !== null && _line_indent_indent !== void 0 ? _line_indent_indent : Infinity;
        }));
    }
    dedent(indent) {
        return Lines.of(_classPrivateFieldGet(this, _lines).map((line)=>line.dedent(indent)));
    }
    display(stringify) {
        return _classPrivateFieldGet(this, _lines).map((line)=>line.display(stringify)).join("\n");
    }
    *[_Symbol_iterator]() {
        for (const line of _classPrivateFieldGet(this, _lines)){
            yield line;
        }
    }
    process(lineno, processor) {
        const line = _classPrivateFieldGet(this, _lines)[lineno];
        if (!line) {
            return;
        }
        const lines = processor(line);
        if (lines) {
            _classPrivateFieldGet(this, _lines).splice(lineno, 1, ...lines);
        }
    }
    processFirst(processor) {
        this.process(0, processor);
    }
    processLast(processor) {
        if (_classPrivateFieldGet(this, _lines).length === 0) {
            return;
        }
        this.process(_classPrivateFieldGet(this, _lines).length - 1, processor);
    }
    [_Symbol_for1]() {
        return _classPrivateFieldGet(this, _lines);
    }
    constructor(lines){
        _classPrivateFieldInit(this, _lines, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _lines, lines);
    }
}
class IndentToken {
    static of(indent) {
        return new IndentToken(indent);
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
    constructor(indent){
        this.indent = indent;
        this.type = "indent";
        if (indent === 0) {
            throw new Error("Indent tokens must not be zero");
        }
    }
}
class Line {
    static from(fragments) {
        const [first, ...rest] = fragments;
        if ((first === null || first === void 0 ? void 0 : first.type) === "text") {
            var _first_value_match;
            var _first_value_match__length;
            const indent = (_first_value_match__length = (_first_value_match = first.value.match(/^\s*/)) === null || _first_value_match === void 0 ? void 0 : _first_value_match[0].length) !== null && _first_value_match__length !== void 0 ? _first_value_match__length : 0;
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
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return this.tokens;
    }
    isEmpty() {
        return this.tokens.length === 0;
    }
    get indent() {
        const [first] = this.tokens;
        if ((first === null || first === void 0 ? void 0 : first.type) === "indent") {
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
    constructor(tokens){
        this.tokens = tokens;
    }
}


//# sourceMappingURL=index.js.map