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
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
import "@mdit-vue/plugin-sfc";
import { mapEntries } from "@wycatsjs/utils";
import { El, If } from "./nodes.js";
import { ParagraphElement, text, CustomBuiltin, BasicFragment } from "./tokens.js";
export const CUSTOM_EL = "CustomBlock";
var _content = /*#__PURE__*/ new WeakMap();
export class UnparsedContent {
    static of(content) {
        return new UnparsedContent(content);
    }
    get raw() {
        return _classPrivateFieldGet(this, _content);
    }
    render(tokens) {
        if (_classPrivateFieldGet(this, _content)) {
            return tokens.html(_classPrivateFieldGet(this, _content));
        }
        return tokens;
    }
    constructor(content){
        _classPrivateFieldInit(this, _content, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _content, content);
    }
}
var _config = /*#__PURE__*/ new WeakMap(), _renderFn = /*#__PURE__*/ new WeakMap(), _defaultTitle = /*#__PURE__*/ new WeakMap();
class Builtin {
    render(options) {
        const result = _classPrivateFieldGet(this, _renderFn).call(this, _objectSpreadProps(_objectSpread({}, options), {
            define: new CustomBuiltin(options.md)
        }));
        const fragment = BasicFragment.empty(options.md);
        if (Array.isArray(result)) {
            fragment.push(...result);
        } else {
            fragment.push(result);
        }
        return fragment.done();
    }
    constructor(config){
        _classPrivateFieldInit(this, _renderFn, {
            get: get_renderFn,
            set: void 0
        });
        _classPrivateFieldInit(this, _defaultTitle, {
            get: get_defaultTitle,
            set: void 0
        });
        _classPrivateFieldInit(this, _config, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _config, config);
    }
}
function get_renderFn() {
    var _classPrivateFieldGet_colors, _classPrivateFieldGet_colors1, _classPrivateFieldGet_colors2;
    if (typeof _classPrivateFieldGet(this, _config) === "object" && "render" in _classPrivateFieldGet(this, _config)) {
        return _classPrivateFieldGet(this, _config).render;
    }
    const defaultBg = "var(--sbdoc-default-block-bg)";
    const defaultFg = "var(--sbdoc-default-block-fg)";
    var _classPrivateFieldGet_colors_bg;
    const bgcolor = (_classPrivateFieldGet_colors_bg = (_classPrivateFieldGet_colors = _classPrivateFieldGet(this, _config).colors) === null || _classPrivateFieldGet_colors === void 0 ? void 0 : _classPrivateFieldGet_colors.bg) !== null && _classPrivateFieldGet_colors_bg !== void 0 ? _classPrivateFieldGet_colors_bg : defaultBg;
    var _classPrivateFieldGet_colors_fg;
    const fgcolor = (_classPrivateFieldGet_colors_fg = (_classPrivateFieldGet_colors1 = _classPrivateFieldGet(this, _config).colors) === null || _classPrivateFieldGet_colors1 === void 0 ? void 0 : _classPrivateFieldGet_colors1.fg) !== null && _classPrivateFieldGet_colors_fg !== void 0 ? _classPrivateFieldGet_colors_fg : defaultFg;
    var _classPrivateFieldGet_colors_border;
    const border = (_classPrivateFieldGet_colors_border = (_classPrivateFieldGet_colors2 = _classPrivateFieldGet(this, _config).colors) === null || _classPrivateFieldGet_colors2 === void 0 ? void 0 : _classPrivateFieldGet_colors2.border) !== null && _classPrivateFieldGet_colors_border !== void 0 ? _classPrivateFieldGet_colors_border : fgcolor;
    console.log({
        config: _classPrivateFieldGet(this, _config),
        bgcolor
    });
    return ({ md , kind , title: providedTitle , content  })=>{
        var _classPrivateFieldGet1;
        const title = providedTitle.withDefault((_classPrivateFieldGet1 = _classPrivateFieldGet(this, _defaultTitle)) !== null && _classPrivateFieldGet1 !== void 0 ? _classPrivateFieldGet1 : undefined);
        return ParagraphElement.tag(CUSTOM_EL, md).attrs({
            class: [
                kind
            ],
            style: `--sbdoc-local-bg: ${bgcolor}; --sbdoc-local-fg: ${fgcolor}; --sbdoc-local-border-color: ${border};`
        }).append(If(title, (title)=>El("p", {
                class: "custom-block-title"
            }, [
                title
            ]))).append(content);
    };
}
function get_defaultTitle() {
    if (typeof _classPrivateFieldGet(this, _config) === "object" && "defaultTitle" in _classPrivateFieldGet(this, _config) && typeof _classPrivateFieldGet(this, _config).defaultTitle === "string") {
        return _classPrivateFieldGet(this, _config).defaultTitle;
    }
}
var _provided = /*#__PURE__*/ new WeakMap(), _default = /*#__PURE__*/ new WeakMap();
let _Symbol_for = Symbol.for("nodejs.util.inspect.custom");
export class Title {
    static provided(provided) {
        return new Title(provided, undefined);
    }
    static create(provided, defaultValue) {
        return new Title(provided, defaultValue);
    }
    [_Symbol_for]() {
        return `Title(${JSON.stringify(String(this))})`;
    }
    withDefault(defaultValue) {
        return new Title(_classPrivateFieldGet(this, _provided), defaultValue);
    }
    render(tokens) {
        return tokens.append(text(String(this)));
    }
    isBlank() {
        return _classPrivateFieldGet(this, _provided) === false;
    }
    map(callback) {
        const title = String(this);
        if (title === "") {
            return null;
        } else {
            return callback(title);
        }
    }
    exists() {
        if (_classPrivateFieldGet(this, _provided) === false) {
            return false;
        } else if (_classPrivateFieldGet(this, _provided) === undefined) {
            return _classPrivateFieldGet(this, _default) !== undefined;
        } else {
            return true;
        }
    }
    get provided() {
        return _classPrivateFieldGet(this, _provided);
    }
    toString() {
        if (_classPrivateFieldGet(this, _provided) === false) {
            return "";
        } else if (_classPrivateFieldGet(this, _provided) === undefined) {
            var _classPrivateFieldGet1;
            return (_classPrivateFieldGet1 = _classPrivateFieldGet(this, _default)) !== null && _classPrivateFieldGet1 !== void 0 ? _classPrivateFieldGet1 : "";
        } else {
            return _classPrivateFieldGet(this, _provided);
        }
    }
    constructor(provided, defaultValue){
        _classPrivateFieldInit(this, _provided, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _default, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _provided, provided);
        _classPrivateFieldSet(this, _default, defaultValue);
    }
}
var _builtins = /*#__PURE__*/ new WeakMap();
export class Builtins {
    static empty() {
        return new Builtins({});
    }
    static from(config) {
        return new Builtins(mapEntries(config, (config, name)=>[
                name,
                new Builtin(config)
            ]));
    }
    custom(name, render) {
        return new Builtins(_objectSpreadProps(_objectSpread({}, _classPrivateFieldGet(this, _builtins)), {
            [name]: new Builtin({
                render
            })
        }));
    }
    basic(name, config) {
        var _config_defaultTitle;
        const defaultTitle = typeof config === "string" ? config : (_config_defaultTitle = config === null || config === void 0 ? void 0 : config.defaultTitle) !== null && _config_defaultTitle !== void 0 ? _config_defaultTitle : name.toLocaleUpperCase();
        return new Builtins(_objectSpreadProps(_objectSpread({}, _classPrivateFieldGet(this, _builtins)), {
            [name]: new Builtin(_objectSpreadProps(_objectSpread({}, typeof config === "string" ? {} : config), {
                defaultTitle
            }))
        }));
    }
    tryGet(name) {
        return _classPrivateFieldGet(this, _builtins)[name];
    }
    get(name) {
        return _classPrivateFieldGet(this, _builtins)[name];
    }
    constructor(builtins){
        _classPrivateFieldInit(this, _builtins, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _builtins, builtins);
    }
}


//# sourceMappingURL=define.js.map