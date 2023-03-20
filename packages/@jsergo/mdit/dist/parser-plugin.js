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
import { MDStateCreator } from "./state.js";
export class ReturnRendered {
    html(content) {
        return {
            type: "html",
            content
        };
    }
    tokens(tokens) {
        return {
            type: "tokens",
            content: tokens
        };
    }
    empty() {
        return {
            type: "empty"
        };
    }
    reconsume() {
        return {
            type: "reconsume"
        };
    }
}
const RENDER = new ReturnRendered();
var _state = /*#__PURE__*/ new WeakMap();
export class PluginHelper {
    get md() {
        return _classPrivateFieldGet(this, _state).md;
    }
    get env() {
        return _classPrivateFieldGet(this, _state).env;
    }
    renderHTML(content) {
        return _classPrivateFieldGet(this, _state).renderHTML(content);
    }
    renderInline(content) {
        return _classPrivateFieldGet(this, _state).renderInline(content);
    }
    parseBlock(content) {
        return _classPrivateFieldGet(this, _state).parse(content);
    }
    parseInline(content) {
        return _classPrivateFieldGet(this, _state).parseInline(content);
    }
    error(message) {
        return _classPrivateFieldGet(this, _state).error(message);
    }
    constructor(state){
        _classPrivateFieldInit(this, _state, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _state, state);
    }
}
export function parserPlugin(pluginOptions) {
    var _pluginOptions_env;
    const wrapEnv = (_pluginOptions_env = pluginOptions.env) !== null && _pluginOptions_env !== void 0 ? _pluginOptions_env : (env)=>env;
    return {
        block: (plugin)=>{
            return (md, _options)=>{
                const createState = new MDStateCreator(md, wrapEnv);
                const parser = (state, startLine, _endLine, silent)=>{
                    const mdState = createState.create(state);
                    const line = mdState.line(startLine);
                    if (line.isCodeBlock) {
                        return false;
                    }
                    const consume = plugin(line, new PluginHelper(mdState));
                    if (!consume) {
                        return false;
                    }
                    const render = consume();
                    if (!render) {
                        return false;
                    }
                    if (silent) {
                        return true;
                    }
                    const rendered = render(RENDER);
                    switch(rendered.type){
                        case "html":
                            {
                                const token = state.push("html_block", "", 0);
                                token.content = rendered.content;
                                return true;
                            }
                        case "tokens":
                            {
                                for (const token of rendered.content){
                                    state.tokens.push(token);
                                }
                            }
                        case "empty":
                            {
                                return true;
                            }
                        case "reconsume":
                            {
                                return false;
                            }
                    }
                };
                if ("before" in pluginOptions) {
                    const { name , before  } = pluginOptions;
                    md.block.ruler.before(before, name, parser);
                } else if ("after" in pluginOptions) {
                    const { name , after  } = pluginOptions;
                    md.block.ruler.after(after, name, parser);
                } else if ("replace" in pluginOptions) {
                    const { replace  } = pluginOptions;
                    md.block.ruler.at(replace, parser);
                } else if ("append" in pluginOptions) {
                    const { append: name  } = pluginOptions;
                    md.block.ruler.push(name, parser);
                }
            };
        }
    };
}


//# sourceMappingURL=parser-plugin.js.map