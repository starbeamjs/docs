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
var _md = /*#__PURE__*/ new WeakMap(), _createEnv = /*#__PURE__*/ new WeakMap();
export class MDStateCreator {
    create(state) {
        return new MDState(_classPrivateFieldGet(this, _md), state, _classPrivateFieldGet(this, _createEnv).call(this, state.env));
    }
    constructor(md, createEnv){
        _classPrivateFieldInit(this, _md, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _createEnv, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _md, md);
        _classPrivateFieldSet(this, _createEnv, createEnv);
    }
}
var _state = /*#__PURE__*/ new WeakMap(), _md1 = /*#__PURE__*/ new WeakMap(), _env = /*#__PURE__*/ new WeakMap();
export class MDState {
    line(lineno) {
        return new LineState(_classPrivateFieldGet(this, _state), lineno);
    }
    consumeLine() {
        _classPrivateFieldGet(this, _state).line = _classPrivateFieldGet(this, _state).line + 1;
    }
    get highlight() {
        return _classPrivateFieldGet(this, _md1).options.highlight;
    }
    get md() {
        return _classPrivateFieldGet(this, _md1);
    }
    get env() {
        return _classPrivateFieldGet(this, _env);
    }
    open() {
        return _classPrivateFieldGet(this, _state).push("html_block", "", 0);
    }
    renderHTML(content) {
        return _classPrivateFieldGet(this, _md1).render(content, _classPrivateFieldGet(this, _state).env);
    }
    renderInline(content) {
        return _classPrivateFieldGet(this, _md1).renderInline(content, _classPrivateFieldGet(this, _state).env);
    }
    parse(content) {
        const tokens = [];
        _classPrivateFieldGet(this, _md1).block.parse(content, _classPrivateFieldGet(this, _md1), _classPrivateFieldGet(this, _env), tokens);
        return tokens;
    }
    parseInline(content) {
        const tokens = [];
        _classPrivateFieldGet(this, _md1).inline.parse(content, _classPrivateFieldGet(this, _md1), _classPrivateFieldGet(this, _env), tokens);
        return tokens;
    }
    error(message) {
        return `<div class="language-error ext-error"><pre class="ext-error"><code>${message}</code></pre></div>`;
    }
    constructor(md, state, env){
        _classPrivateFieldInit(this, _state, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _md1, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _env, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _state, state);
        _classPrivateFieldSet(this, _md1, md);
        _classPrivateFieldSet(this, _env, env);
    }
}
var _state1 = /*#__PURE__*/ new WeakMap(), _startLine = /*#__PURE__*/ new WeakMap(), _src = /*#__PURE__*/ new WeakMap(), _totalIndent = /*#__PURE__*/ new WeakMap(), _requiredIndent = /*#__PURE__*/ new WeakMap();
export class LineState {
    get state() {
        return _classPrivateFieldGet(this, _state1);
    }
    get next() {
        if (_classPrivateFieldGet(this, _startLine) < _classPrivateFieldGet(this, _state1).lineMax) {
            return new LineState(_classPrivateFieldGet(this, _state1), _classPrivateFieldGet(this, _startLine) + 1);
        } else {
            return undefined;
        }
    }
    get position() {
        return {
            pos: this.contentStart,
            max: this.end
        };
    }
    get rest() {
        return _classPrivateFieldGet(this, _state1).src.slice(this.start);
    }
    consume() {
        _classPrivateFieldGet(this, _state1).line = _classPrivateFieldGet(this, _startLine) + 1;
        return new LineState(_classPrivateFieldGet(this, _state1), _classPrivateFieldGet(this, _startLine) + 1);
    }
    until(predicate) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let line = this;
        const lines = [];
        while(line){
            const next = line.next;
            if (!next) {
                _classPrivateFieldGet(this, _state1).line = _classPrivateFieldGet(line, _startLine) + 1;
                break;
            }
            lines.push(line.string({
                ws: true
            }));
            line = next;
            if (predicate(next)) {
                _classPrivateFieldGet(this, _state1).line = _classPrivateFieldGet(next, _startLine) + 1;
                break;
            }
        }
        return lines.join("\n");
    }
    string({ ws =false  } = {}) {
        return _classPrivateFieldGet(this, _src).slice(ws ? this.start : this.contentStart, this.end);
    }
    startsWith(chars) {
        return this.slice(chars.length) === chars;
    }
    matchStart(regex) {
        if (!regex.source.startsWith("^")) {
            return {
                type: "error",
                error: `invalid pattern for matchStart (${regex}). matchStart patterns must be anchored`
            };
        }
        const match = regex.exec(this.rest);
        if (!match) {
            return {
                type: "unmatched"
            };
        } else {
            return {
                type: "match",
                raw: match,
                fragment: match[0]
            };
        }
    }
    slice(n = this.end - this.contentStart) {
        if (n > this.end - this.contentStart) {
            return undefined;
        }
        const pos = this.contentStart;
        let chars = "";
        for(let i = 0; i < n; ++i){
            chars += _classPrivateFieldGet(this, _src).charAt(pos + i);
        }
        return chars;
    }
    /**
   * The indent of the line, excluding the required indent.
   */ get indent() {
        return _classPrivateFieldGet(this, _totalIndent) - _classPrivateFieldGet(this, _requiredIndent);
    }
    /**
   * if it's indented more than 3 spaces, it's a code block
   */ get isCodeBlock() {
        return this.indent >= 4;
    }
    get start() {
        var _classPrivateFieldGet_bMarks__classPrivateFieldGet;
        return (_classPrivateFieldGet_bMarks__classPrivateFieldGet = _classPrivateFieldGet(this, _state1).bMarks[_classPrivateFieldGet(this, _startLine)]) !== null && _classPrivateFieldGet_bMarks__classPrivateFieldGet !== void 0 ? _classPrivateFieldGet_bMarks__classPrivateFieldGet : 0;
    }
    get wsChars() {
        var _classPrivateFieldGet_tShift__classPrivateFieldGet;
        return (_classPrivateFieldGet_tShift__classPrivateFieldGet = _classPrivateFieldGet(this, _state1).tShift[_classPrivateFieldGet(this, _startLine)]) !== null && _classPrivateFieldGet_tShift__classPrivateFieldGet !== void 0 ? _classPrivateFieldGet_tShift__classPrivateFieldGet : 0;
    }
    get contentStart() {
        return this.start + this.wsChars;
    }
    get end() {
        var _classPrivateFieldGet_eMarks__classPrivateFieldGet;
        return (_classPrivateFieldGet_eMarks__classPrivateFieldGet = _classPrivateFieldGet(this, _state1).eMarks[_classPrivateFieldGet(this, _startLine)]) !== null && _classPrivateFieldGet_eMarks__classPrivateFieldGet !== void 0 ? _classPrivateFieldGet_eMarks__classPrivateFieldGet : 0;
    }
    constructor(state, startLine){
        _classPrivateFieldInit(this, _src, {
            get: get_src,
            set: void 0
        });
        /**
   * The total indent of the line, including the required indent.
   */ _classPrivateFieldInit(this, _totalIndent, {
            get: get_totalIndent,
            set: void 0
        });
        /**
   * The required indent of the line.
   */ _classPrivateFieldInit(this, _requiredIndent, {
            get: get_requiredIndent,
            set: void 0
        });
        _classPrivateFieldInit(this, _state1, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _startLine, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _state1, state);
        _classPrivateFieldSet(this, _startLine, startLine);
    }
}
function get_src() {
    return _classPrivateFieldGet(this, _state1).src;
}
function get_totalIndent() {
    var _classPrivateFieldGet_sCount__classPrivateFieldGet;
    return (_classPrivateFieldGet_sCount__classPrivateFieldGet = _classPrivateFieldGet(this, _state1).sCount[_classPrivateFieldGet(this, _startLine)]) !== null && _classPrivateFieldGet_sCount__classPrivateFieldGet !== void 0 ? _classPrivateFieldGet_sCount__classPrivateFieldGet : 0;
}
function get_requiredIndent() {
    return _classPrivateFieldGet(this, _state1).blkIndent;
}
export function position(state, startLine) {
    var _state_bMarks_startLine, _state_tShift_startLine;
    const pos = ((_state_bMarks_startLine = state.bMarks[startLine]) !== null && _state_bMarks_startLine !== void 0 ? _state_bMarks_startLine : 0) + ((_state_tShift_startLine = state.tShift[startLine]) !== null && _state_tShift_startLine !== void 0 ? _state_tShift_startLine : 0);
    var _state_eMarks_startLine;
    const max = (_state_eMarks_startLine = state.eMarks[startLine]) !== null && _state_eMarks_startLine !== void 0 ? _state_eMarks_startLine : 0;
    return {
        pos,
        max
    };
}


//# sourceMappingURL=state.js.map