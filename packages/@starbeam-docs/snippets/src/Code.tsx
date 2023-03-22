import { defineComponent, type Ref, type Slots } from "vue";
import { onMounted, ref } from "vue";
import { STORAGE } from "./lang.js";
import {
  codeSnippet,
  toggler as togglerClass,
  section as sectionClass,
  js as jsClass,
  ts as tsClass,
} from "./Code.css.js";

export default defineComponent({
  setup(_, { slots }) {
    const js = ref();
    const ts = ref();

    const container = ref();

    onMounted(() => {
      mountElements(ts, js, container);
    });

    return () => (
      <section
        class={[
          sectionLangClass(STORAGE.currentLang),
          "code-block",
          sectionClass,
          codeSnippet,
        ]}
        ref={container}
      >
        {toggler()}
        {langSlots(slots, { ts, js })}
      </section>
    );
  },
});

function toggler() {
  return (
    <section class={[togglerClass, "code-toggler"]}>
      {langButton("js")}
      {langButton("ts")}
    </section>
  );
}

function langSlots(
  slots: Slots,
  refs: { ts: Ref<HTMLElement>; js: Ref<HTMLElement> }
) {
  return [
    langSlot(slots, "ts", refs.ts),
    langSlot(slots, "js", refs.js),
  ];
}

function langSlot(
  slots: Slots,
  lang: "ts" | "js",
  ref: Ref<HTMLElement>
): ReturnType<typeof import("vue").h> | void {
  const slot = slots[lang];

  if (slot) {
    return (
      <div class={[langClass(lang), `lang-${lang}`]} ref={ref}>
        {slot()}
      </div>
    );
  }
}

function langButton(lang: "ts" | "js") {
  return (
    <button
      type="button"
      class={["toggler-button", langClass(lang)]}
      onClick={() => {
        console.info("clicked", lang);
        STORAGE.lang = lang;
      }}
    >
      {lang}
    </button>
  );
}

function createToggler(): HTMLElement {
  const toggler = document.createElement("section");
  toggler.className = togglerClass;
  return toggler;
}

function label(text: string) {
  const label = document.createElement("span");
  label.innerText = text;
  return label;
}

function button(text: string, callback: () => void) {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.innerText = text;
  button.addEventListener("click", callback);

  return button;
}

const LANG_KEY = "default-lang";
const DEFAULT_LANG = "js";

function addToggle(
  container: Element,
  text: string,
  callback: () => void
) {
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

function mountElements(
  ts: Ref<HTMLElement>,
  js: Ref<HTMLElement>,
  container: Ref<HTMLElement>
) {
  onMounted(() => {
    const tsSection = ts.value;
    const jsSection = js.value;

    const tsContainer = tsSection.querySelector(
      "[class*=language-]"
    );

    assert(tsContainer, exists);

    addToggle(tsContainer, "typescript", () => {
      STORAGE.lang = "js";
    });

    const jsContainer = jsSection.querySelector(
      "[class*=language-]"
    );

    assert(jsContainer, exists);

    addToggle(jsContainer, "javascript", () => {
      STORAGE.lang = "ts";
    });
  });

  // TODO: Generate the right markdown
  onMounted(() => {
    for (const item of container.value.querySelectorAll(
      "[class*=language-]"
    )) {
      assert(item.parentElement, exists);
      item.parentElement.classList.add("code-container");

      for (const child of item.querySelectorAll(
        ".code-container"
      ) as NodeListOf<Element>) {
        child.classList.remove("code-container");
      }
    }
    // const element =
  });
}

function assert<T, U extends T>(
  value: T,
  check: (value: T) => value is U
): asserts value is U {
  if (!check(value)) {
    throw new Error(`Expected ${check.name}`);
  }
}

function exists<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

function langClass(lang: "ts" | "js"): string {
  return lang === "ts" ? tsClass : jsClass;
}

function sectionLangClass(lang: "ts" | "js"): string[] {
  return [langClass(lang), `language-${lang}`];
}
