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
import { useStorage } from "@vueuse/core";
import { ref, watch } from "vue";
const LANG_KEY = "default-lang";
const DEFAULT_LANG = "js";
var _currentLang = /*#__PURE__*/ new WeakMap();
export class Lang {
    get currentLang() {
        return _classPrivateFieldGet(this, _currentLang).value;
    }
    get lang() {
        return this.store.value[LANG_KEY] === "ts" ? "ts" : "js";
    }
    set lang(lang) {
        this.store.value[LANG_KEY] = lang;
    }
    constructor(){
        this.store = useStorage("VUEPRESS_CODE_TAB_STORE", {});
        _classPrivateFieldInit(this, _currentLang, {
            writable: true,
            value: ref(this.lang)
        });
        watch(()=>this.store.value[LANG_KEY], (newValue)=>{
            _classPrivateFieldGet(this, _currentLang).value = newValue !== null && newValue !== void 0 ? newValue : DEFAULT_LANG;
        });
    }
}
export const STORAGE = new Lang();


//# sourceMappingURL=lang.js.map