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
var _kind = /*#__PURE__*/ new WeakMap(), _region = /*#__PURE__*/ new WeakMap(), _parsed = /*#__PURE__*/ new WeakMap(), _source = /*#__PURE__*/ new WeakMap(), _filename = /*#__PURE__*/ new WeakMap(), _env = /*#__PURE__*/ new WeakMap(), _attr = /*#__PURE__*/ new WeakMap(), _highlights = /*#__PURE__*/ new WeakMap(), _dts = /*#__PURE__*/ new WeakMap(), _prefix = /*#__PURE__*/ new WeakSet(), _postfix = /*#__PURE__*/ new WeakSet();
export class RenderLanguageRegion {
    static create({ filename , region , parsed , kind , env  }) {
        const lang = region[kind];
        const source = parsed[kind];
        return new RenderLanguageRegion({
            kind,
            region: lang,
            parsed,
            source,
            filename,
            env
        });
    }
    highlight(highlight) {
        const code = _classPrivateFieldGet(this, _region).code;
        const prefix1 = _classPrivateMethodGet(this, _prefix, prefix).call(this);
        const postfix1 = _classPrivateMethodGet(this, _postfix, postfix).call(this);
        const output = [];
        if (_classPrivateFieldGet(this, _kind) === "js") {
            output.push("// @noErrors");
        }
        if (prefix1) {
            output.push(prefix1);
        }
        if (_classPrivateFieldGet(this, _kind) === "js") {
            const dts = _classPrivateFieldGet(this, _dts);
            if (dts) {
                output.push(dts.code);
            }
        }
        if (prefix1 || _classPrivateFieldGet(this, _kind) === "js") {
            output.push("// ---cut---");
        }
        output.push(code);
        if (postfix1) {
            output.push("// ---cut-after---", postfix1);
        }
        const source = output.join("\n").trimEnd();
        var _highlight;
        return (_highlight = highlight === null || highlight === void 0 ? void 0 : highlight(source, "tsx twoslash", _classPrivateFieldGet(this, _attr))) !== null && _highlight !== void 0 ? _highlight : `<pre><code class="language-ts">// @jsxImportSource: preact\n${code}</code></pre>`;
    }
    constructor({ kind , region , parsed , source , filename , env  }){
        _classPrivateFieldInit(this, _attr, {
            get: get_attr,
            set: void 0
        });
        _classPrivateFieldInit(this, _highlights, {
            get: get_highlights,
            set: void 0
        });
        _classPrivateFieldInit(this, _dts, {
            get: get_dts,
            set: void 0
        });
        _classPrivateMethodInit(this, _prefix);
        _classPrivateMethodInit(this, _postfix);
        _classPrivateFieldInit(this, _kind, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _region, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _parsed, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _source, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _filename, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _env, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _kind, kind);
        _classPrivateFieldSet(this, _region, region);
        _classPrivateFieldSet(this, _parsed, parsed);
        _classPrivateFieldSet(this, _source, source);
        _classPrivateFieldSet(this, _filename, filename);
        _classPrivateFieldSet(this, _env, env);
    }
}
function get_attr() {
    const attrs = [];
    const highlights = _classPrivateFieldGet(this, _highlights);
    if (highlights && highlights.length > 0) {
        attrs.push(`{${highlights.map((h)=>h.lines).join(",")}}`);
    }
    attrs.push(`filename=${JSON.stringify(_classPrivateFieldGet(this, _filename))} lang=${_classPrivateFieldGet(this, _kind)}`);
    return attrs.join(" ");
}
function get_highlights() {
    return _classPrivateFieldGet(this, _region).highlights;
}
function get_dts() {
    const regions = _classPrivateFieldGet(this, _parsed).ts.regions;
    if (regions) {
        return regions["dts"];
    }
}
function prefix() {
    const lines = _classPrivateFieldGet(this, _source).code.split("\n");
    return lines.slice(0, _classPrivateFieldGet(this, _region).offsets.start).join("\n");
}
function postfix() {
    const lines = _classPrivateFieldGet(this, _source).code.split("\n");
    return lines.slice(_classPrivateFieldGet(this, _region).offsets.end).join("\n");
}


//# sourceMappingURL=language-region.js.map