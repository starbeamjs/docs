import { createVNode as _createVNode } from "vue";
import DefaultTheme from "vitepress/theme";
import { defineComponent, onMounted, ref, watch } from "vue";
import { STORAGE } from "@starbeam-docs/snippets";
import { checked, js, ts } from "./Layout.css.js";
const { Layout  } = DefaultTheme;
export default defineComponent({
    setup () {
        setup();
        return ()=>_createVNode(Layout, {
                "class": "app"
            }, null);
    }
});
function setup() {
    onMounted(()=>{
        document.body.setAttribute("data-lang", STORAGE.lang);
    });
    const isChecked = ref(false);
    onMounted(()=>{
        let input;
        const tsElement = document.querySelector("#app :is(.social-links, .social-links-list) a[href*=typescript]");
        if (tsElement) {
            const label = document.createElement("label");
            label.title = "Show TypeScript code and examples";
            label.classList.add("switch-lang");
            input = document.createElement("input");
            input.oninput = (e)=>{
                isChecked.value = input.checked;
            };
            input.type = "checkbox";
            label.append(input);
            const tsSpan = document.createElement("span");
            tsSpan.classList.add(ts);
            label.append(tsSpan);
            const jsSpan = document.createElement("span");
            jsSpan.classList.add(js);
            label.append(jsSpan);
            tsElement.replaceWith(label);
            function toggle() {
                label.classList.toggle(checked, isChecked.value);
                STORAGE.lang = isChecked.value ? "ts" : "js";
            }
            watch(isChecked, toggle);
            toggle();
        }
        watch(()=>STORAGE.lang, (lang)=>{
            if (typeof globalThis.document !== undefined) document.body.setAttribute("data-lang", lang);
            input.checked = lang === "ts";
        });
    });
}


//# sourceMappingURL=Layout.js.map