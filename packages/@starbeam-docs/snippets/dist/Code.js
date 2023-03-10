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
import { defineComponent, h } from "vue";
import { onMounted, ref } from "vue";
import { STORAGE } from "./lang.js";
import { codeSnippet } from "./Code.css.js";
const ID = "KVEWS96Xs";
export default defineComponent({
    setup (_, { slots  }) {
        const js = ref();
        const ts = ref();
        const container = ref();
        function current() {
            return `${STORAGE.currentLang} lang-switcher`;
        }
        onMounted(()=>{
            mountElements(ts, js, container);
        });
        return h("section", {
            class: [
                STORAGE.currentLang,
                "section",
                "code-snippet",
                codeSnippet
            ],
            ref: container
        }, [
            toggler(),
            ...langSlots(slots, {
                ts,
                js
            })
        ]);
    }
});
function toggler() {
    return h("p", a({
        class: "toggler"
    }), [
        langButton("js"),
        langButton("ts")
    ]);
}
function langSlots(slots, refs) {
    return [
        langSlot(slots, "ts", refs.ts),
        langSlot(slots, "js", refs.js)
    ];
}
function langSlot(slots, lang, ref) {
    const slot = slots[lang];
    if (slot) {
        return h("div", a({
            class: lang,
            ref
        }), [
            slot()
        ]);
    }
}
function langButton(lang) {
    return h("button", a({
        type: "button",
        class: [
            "toggler-button",
            lang
        ],
        onClick: ()=>{
            STORAGE.lang = "ts";
        }
    }), [
        lang
    ]);
}
function a(attrs) {
    return _objectSpreadProps(_objectSpread({}, attrs), {
        "data-id": ID
    });
}
function createToggler() {
    const toggler = document.createElement("p");
    toggler.className = "toggler";
    return toggler;
}
function label(text) {
    const label = document.createElement("span");
    label.innerText = text;
    return label;
}
function button(text, callback) {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.className = "toggler-button3";
    button.innerText = text;
    button.addEventListener("click", callback);
    return button;
}
const LANG_KEY = "default-lang";
const DEFAULT_LANG = "js";
function addToggle(container, text, callback) {
    const toggler = createToggler();
    if (text === "typescript") {
        toggler.appendChild(label("ts"));
        toggler.appendChild(button("js", callback));
    } else {
        toggler.appendChild(button("ts", callback));
        toggler.appendChild(label("js"));
    }
    container.prepend(toggler);
}
function mountElements(ts, js, container) {
    onMounted(()=>{
        const tsSection = ts.value;
        const jsSection = js.value;
        const tsContainer = tsSection.querySelector("div[class^=language-]");
        assert(tsContainer, exists);
        addToggle(tsContainer, "typescript", ()=>{
            STORAGE.lang = "js";
        });
        const jsContainer = jsSection.querySelector("div[class^=language-]");
        assert(jsContainer, exists);
        addToggle(jsContainer, "javascript", ()=>{
            STORAGE.lang = "ts";
        });
    });
    // TODO: Generate the right markdown
    onMounted(()=>{
        for (const item of container.value.querySelectorAll("code[class^=language-]")){
            assert(item.parentElement, exists);
            item.parentElement.classList.add("code-container");
            for (const child of item.querySelectorAll(".code-container")){
                child.classList.remove("code-container");
            }
        }
    // const element =
    });
}
function assert(value, check) {
    if (!check(value)) {
        throw new Error(`Expected ${check.name}`);
    }
}
function exists(value) {
    return value !== null && value !== undefined;
}


//# sourceMappingURL=Code.js.map