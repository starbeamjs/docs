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
function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
}
function _classPrivateMethodInit(obj, privateSet) {
    _checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
}
import Token from "markdown-it/lib/token.js";
var _md = /*#__PURE__*/ new WeakMap();
export class CustomBuiltin {
    el(tag, attrs, children) {
        return ParagraphElement.tag(tag, _classPrivateFieldGet(this, _md)).attrs(attrs).push(...children);
    }
    constructor(md){
        _classPrivateFieldInit(this, _md, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _md, md);
    }
}
var _md1 = /*#__PURE__*/ new WeakMap();
export class MarkdownFragment {
    render(tokens) {
        return tokens.push(...this.done());
    }
    get md() {
        return _classPrivateFieldGet(this, _md1);
    }
    html(html) {
        this.push(...this.md.parse(html));
        return this;
    }
    append(child) {
        if (child === undefined || child === null) {
        // do nothing
        } else if (typeof child === "string") {
            this.appendToken(text(child));
        } else if ("render" in child) {
            child.render(this);
        } else {
            this.appendToken(child);
        }
        return this;
    }
    push(...children) {
        for (const child of children){
            this.append(child);
        }
        return this;
    }
    element({ tag , attrs , children  }, { create  }) {
        let el = create.tag(tag, this.md).attrs(attrs);
        if (Array.isArray(children)) {
            for (const child of children){
                el.append(child);
            }
        } else if (typeof children === "function") {
            children(this);
        }
        this.push(...el.done());
        return this;
    }
    htmlEl(...elArgs) {
        return this.element(normalizeElArgs(elArgs), {
            create: HtmlElement
        });
    }
    el(...elArgs) {
        return this.element(normalizeElArgs(elArgs), {
            create: ParagraphElement
        });
    }
    constructor(md){
        _classPrivateFieldInit(this, _md1, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _md1, md);
    }
}
export class MarkdownElement extends MarkdownFragment {
    attrs(attrs) {
        for (const [key, value] of Object.entries(attrs)){
            this.attr(key, value);
        }
        return this;
    }
    constructor(_tag, md){
        super(md);
    }
}
var _tokens = /*#__PURE__*/ new WeakMap();
export class BasicFragment extends MarkdownFragment {
    static empty(md) {
        return new BasicFragment(md);
    }
    appendToken(token) {
        _classPrivateFieldGet(this, _tokens).push(token);
    }
    done() {
        return _classPrivateFieldGet(this, _tokens);
    }
    constructor(...args){
        super(...args);
        _classPrivateFieldInit(this, _tokens, {
            writable: true,
            value: []
        });
    }
}
var _tag = /*#__PURE__*/ new WeakMap(), _open = /*#__PURE__*/ new WeakMap(), _children = /*#__PURE__*/ new WeakMap(), _attrValue = /*#__PURE__*/ new WeakSet();
export class HtmlElement extends MarkdownElement {
    static tag(tag, md) {
        return new HtmlElement(tag, md);
    }
    attr(key, value) {
        const valueString = _classPrivateMethodGet(this, _attrValue, attrValue).call(this, value);
        if (valueString !== null) {
            _classPrivateFieldSet(this, _open, _classPrivateFieldGet(this, _open) + ` ${key}=${valueString}`);
        }
        return this;
    }
    done() {
        const open = new Token("html_block", "", 0);
        open.content = `${_classPrivateFieldGet(this, _open)}\n\n`;
        const tokens = [
            open
        ];
        tokens.push(..._classPrivateFieldGet(this, _children));
        const close = new Token("html_block", "", 0);
        close.content = `\n\n</${_classPrivateFieldGet(this, _tag)}>`;
        tokens.push(close);
        return tokens;
    }
    appendToken(token) {
        if (!_classPrivateFieldGet(this, _open).endsWith(">")) _classPrivateFieldSet(this, _open, _classPrivateFieldGet(this, _open) + ">");
        _classPrivateFieldGet(this, _children).push(token);
    }
    constructor(tag, md){
        super(tag, md);
        _classPrivateMethodInit(this, _attrValue);
        _classPrivateFieldInit(this, _tag, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _open, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _children, {
            writable: true,
            value: []
        });
        _classPrivateFieldSet(this, _tag, tag);
        _classPrivateFieldSet(this, _open, `<${_classPrivateFieldGet(this, _tag)}`);
    }
}
function attrValue(value) {
    if (Array.isArray(value)) {
        return `"${value.join(" ")}`;
    } else if (typeof value === "string") {
        return JSON.stringify(value);
    } else if (typeof value === "number") {
        return `"${value}"`;
    } else if (value === true) {
        return `""`;
    } else {
        return null;
    }
}
var _tag1 = /*#__PURE__*/ new WeakMap(), _token = /*#__PURE__*/ new WeakMap(), _children1 = /*#__PURE__*/ new WeakMap();
export class ParagraphElement extends MarkdownElement {
    static tag(tag, md) {
        return new ParagraphElement(md, tag, new Token("paragraph_open", tag, 1), []);
    }
    appendToken(token) {
        _classPrivateFieldGet(this, _children1).push(token);
    }
    done() {
        return [
            _classPrivateFieldGet(this, _token),
            ..._classPrivateFieldGet(this, _children1),
            new Token("paragraph_close", _classPrivateFieldGet(this, _tag1), -1)
        ];
    }
    attr(name, value) {
        if (value === undefined || value === false) {
        // do nothing
        } else if (Array.isArray(value)) {
            for (const val of attrListValue(value)){
                _classPrivateFieldGet(this, _token).attrJoin(name, val);
            }
        } else if (value === true) {
            _classPrivateFieldGet(this, _token).attrSet(name, "");
        } else {
            const val = attrPart(value);
            if (val) {
                _classPrivateFieldGet(this, _token).attrSet(name, val);
            }
        }
        return this;
    }
    constructor(md, tag, token, children){
        super(tag, md);
        _classPrivateFieldInit(this, _tag1, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _token, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _children1, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _tag1, tag);
        _classPrivateFieldSet(this, _token, token);
        _classPrivateFieldSet(this, _children1, children);
    }
}
export function text(string) {
    const token = new Token("text", "", 0);
    token.content = string;
    return token;
}
function applyValue(token, name, value) {
    if (value === undefined || value === false) {
        return;
    } else if (Array.isArray(value)) {
        for (const val of attrListValue(value)){
            token.attrJoin(name, val);
        }
    } else if (value === true) {
        token.attrSet(name, "");
    } else {
        const val = attrPart(value);
        if (val) {
            token.attrSet(name, val);
        }
    }
}
function attrListValue(value) {
    return value.map(attrPart).filter(isPresent);
}
function attrPart(value) {
    if (value === undefined || value === null) {
        return undefined;
    } else if (typeof value === "number") {
        return String(value);
    } else if (typeof value === "string") {
        return value;
    } else {
        throw unreachable(value);
    }
}
function isPresent(value) {
    return value !== null && value !== undefined;
}
function unreachable(_value, message = "unreachable") {
    throw new Error(message);
}
function normalizeElArgs([tag, attrs, children]) {
    if (attrs === undefined || Array.isArray(attrs) || typeof attrs === "function") {
        return {
            tag,
            attrs: {},
            children: attrs
        };
    } else {
        return {
            tag,
            attrs,
            children
        };
    }
}


//# sourceMappingURL=tokens.js.map