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
var _md = /*#__PURE__*/ new WeakMap(), _tokens = /*#__PURE__*/ new WeakMap(), _append = /*#__PURE__*/ new WeakSet();
export class Tokens {
    static empty(md) {
        return new Tokens(md);
    }
    open(tag, attrs = {}) {
        const token = new Token("paragraph_open", tag, 1);
        for (const [key, value] of Object.entries(attrs)){
            applyValue(token, key, value);
        }
        _classPrivateFieldGet(this, _tokens).push(token);
        return this;
    }
    el(tag, attrs, children) {
        function normalize() {
            if (attrs === undefined || Array.isArray(attrs) || typeof attrs === "function") {
                return {
                    attrs: {},
                    children: attrs
                };
            } else {
                return {
                    attrs,
                    children
                };
            }
        }
        const { attrs: actualAttrs , children: actualChildren = []  } = normalize();
        const token = new Token("paragraph_open", tag, 1);
        for (const [key, value] of Object.entries(actualAttrs)){
            applyValue(token, key, value);
        }
        if (actualChildren === undefined) {
            return this;
        }
        if (Array.isArray(actualChildren)) {
            _classPrivateFieldGet(this, _tokens).push(token);
            for (const child of actualChildren){
                _classPrivateMethodGet(this, _append, append).call(this, child);
            }
        } else if (typeof actualChildren === "function") {
            _classPrivateFieldGet(this, _tokens).push(token);
            actualChildren(this);
        }
        this.close(tag);
        return this;
    }
    close(tag) {
        _classPrivateFieldGet(this, _tokens).push(new Token("paragraph_close", tag, -1));
        return this;
    }
    append(...content) {
        for (const child of content){
            _classPrivateMethodGet(this, _append, append).call(this, child);
        }
        return this;
    }
    parse(content) {
        _classPrivateFieldGet(this, _tokens).push(..._classPrivateFieldGet(this, _md).parse(content));
        return this;
    }
    if(predicate, content) {
        if (predicate) {
            content(this, predicate);
        }
        return this;
    }
    get tokens() {
        return _classPrivateFieldGet(this, _tokens);
    }
    constructor(md){
        _classPrivateMethodInit(this, _append);
        _classPrivateFieldInit(this, _md, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _tokens, {
            writable: true,
            value: []
        });
        _classPrivateFieldSet(this, _md, md);
    }
}
function append(child) {
    if (child === undefined || child === null) {
        return;
    } else if (typeof child === "string") {
        _classPrivateFieldGet(this, _tokens).push(text(child));
    } else if ("render" in child) {
        child.render(this);
    } else {
        _classPrivateFieldGet(this, _tokens).push(child);
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


//# sourceMappingURL=tokens.js.map