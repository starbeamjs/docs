import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { onMounted, ref } from "vue";
import { STORAGE } from "./lang.js";
import { codeSnippet, toggler as togglerClass, section as sectionClass, js as jsClass, ts as tsClass } from "./Code.css.js";
export default defineComponent({
    setup (_, { slots  }) {
        const js = ref();
        const ts = ref();
        const container = ref();
        onMounted(()=>{
            mountElements(ts, js, container);
        });
        return ()=>_createVNode("section", {
                "class": [
                    sectionLangClass(STORAGE.currentLang),
                    "code-block",
                    sectionClass,
                    codeSnippet
                ],
                "ref": container
            }, [
                toggler(),
                langSlots(slots, {
                    ts,
                    js
                })
            ]);
    }
});
function toggler() {
    return _createVNode("section", {
        "class": [
            togglerClass,
            "code-toggler"
        ]
    }, [
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
        return _createVNode("div", {
            "class": [
                langClass(lang),
                `lang-${lang}`
            ],
            "ref": ref
        }, [
            slot()
        ]);
    }
}
function langButton(lang) {
    return _createVNode("button", {
        "type": "button",
        "class": [
            "toggler-button",
            langClass(lang)
        ],
        "onClick": ()=>{
            console.info("clicked", lang);
            STORAGE.lang = lang;
        }
    }, [
        lang
    ]);
}
function createToggler() {
    const toggler = document.createElement("section");
    toggler.className = togglerClass;
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
        const tsContainer = tsSection.querySelector("[class*=language-]");
        assert(tsContainer, exists);
        addToggle(tsContainer, "typescript", ()=>{
            STORAGE.lang = "js";
        });
        const jsContainer = jsSection.querySelector("[class*=language-]");
        assert(jsContainer, exists);
        addToggle(jsContainer, "javascript", ()=>{
            STORAGE.lang = "ts";
        });
    });
    // TODO: Generate the right markdown
    onMounted(()=>{
        for (const item of container.value.querySelectorAll("[class*=language-]")){
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
function langClass(lang) {
    return lang === "ts" ? tsClass : jsClass;
}
function sectionLangClass(lang) {
    return [
        langClass(lang),
        `language-${lang}`
    ];
}


//# sourceMappingURL=Code.js.map