import { defineComponent, h, type Ref, type Slots } from "vue";
import { onMounted, ref } from "vue";
import { STORAGE } from "./lang.js";
import { codeSnippet } from "./Code.css.js";

const ID = "KVEWS96Xs";

export default defineComponent<{}>({
  setup(_, { slots }) {
    const js = ref();
    const ts = ref();

    const container = ref();

    function current() {
      return `${STORAGE.currentLang} lang-switcher`;
    }
    onMounted(() => {
      mountElements(ts, js, container);
    });

    return h(
      "section",
      {
        class: [
          STORAGE.currentLang,
          "section",
          "code-snippet",
          codeSnippet,
        ],
        ref: container,
      },
      [toggler(), ...langSlots(slots, { ts, js })]
    );
  },
});

function toggler() {
  return h("p", a({ class: "toggler" }), [
    langButton("js"),
    langButton("ts"),
  ]);
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
): ReturnType<typeof h> | void {
  const slot = slots[lang];

  if (slot) {
    return h("div", a({ class: lang, ref }), [slot()]);
  }
}

function langButton(lang: "ts" | "js") {
  return h(
    "button",
    a({
      type: "button",
      class: ["toggler-button", lang],
      onClick: () => {
        STORAGE.lang = "ts";
      },
    }),
    [lang]
  );
}

function a<O>(attrs: O): O & { "data-id": typeof ID } {
  return {
    ...attrs,
    "data-id": ID,
  };
}

function createToggler(): HTMLElement {
  const toggler = document.createElement("p");
  toggler.className = "toggler";
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
  button.className = "toggler-button3";
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
      "div[class^=language-]"
    );

    assert(tsContainer, exists);

    addToggle(tsContainer, "typescript", () => {
      STORAGE.lang = "js";
    });

    const jsContainer = jsSection.querySelector(
      "div[class^=language-]"
    );

    assert(jsContainer, exists);

    addToggle(jsContainer, "javascript", () => {
      STORAGE.lang = "ts";
    });
  });

  // TODO: Generate the right markdown
  onMounted(() => {
    for (const item of container.value.querySelectorAll(
      "code[class^=language-]"
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
