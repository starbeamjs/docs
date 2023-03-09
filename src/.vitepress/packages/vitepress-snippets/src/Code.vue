<script lang="ts">
import { onMounted, ref } from "vue";
import { STORAGE } from "./lang.js";

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
</script>

<script setup lang="ts">
const LANG_KEY = "default-lang";
const DEFAULT_LANG = "js";

const js = ref();
const ts = ref();

onMounted(() => {
  const tsSection = ts.value;
  const jsSection = js.value;

  const tsContainer = tsSection.querySelector("div[class^=language-]");

  addToggle(tsContainer, "typescript", () => {
    STORAGE.lang = "js";
  });

  const jsContainer = jsSection.querySelector("div[class^=language-]");

  addToggle(jsContainer, "javascript", () => {
    STORAGE.lang = "ts";
  });
});

function button(text: string, callback: () => void) {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.className = "toggler-button3";
  button.innerText = text;
  button.addEventListener("click", callback);

  return button;
}

function addToggle(container: HTMLElement, text: string, callback: () => void) {
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

const container = ref();

// TODO: Generate the right markdown
onMounted(() => {
  for (const item of container.value.querySelectorAll(
    "code[class^=language-]"
  )) {
    item.parentElement.classList.add("code-container");

    for (const child of item.querySelectorAll(
      ".code-container"
    ) as NodeListOf<Element>) {
      child.classList.remove("code-container");
    }
  }
  // const element =
});

function current() {
  return `${STORAGE.currentLang} lang-switcher`;
}
</script>

<template>
  <section :class="`${STORAGE.currentLang} section`" ref="container">
    <p class="toggler">
      <button
        type="button"
        class="toggler-button js"
        @click="STORAGE.lang = 'js'"
      >
        js
      </button>
      <button
        type="button"
        class="toggler-button ts"
        @click="STORAGE.lang = 'ts'"
      >
        ts
      </button>
    </p>

    <div class="js" ref="js"><slot name="js"></slot></div>
    <div class="ts" ref="ts">
      <slot name="ts"></slot>
    </div>
  </section>
</template>

<style scoped lang="postcss">
.section {
  position: relative;
  display: grid;
  width: 100%;
}

.section .toggler {
  z-index: 998;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
}

.section:hover .toggler {
  opacity: 1;
  pointer-events: auto;
}

div.ts,
div.js {
  display: none;
}

.section.ts div.ts,
.section.js div.js {
  display: block;
}

.section.ts button.ts,
.section.js button.js {
  background-color: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}

.toggler {
  display: grid;
  grid-template-columns: max-content 1fr;
  position: absolute;
  top: 0;
  right: 1px;
  align-items: center;
  align-content: center;
  user-select: none;
  z-index: 3;
  font-size: 0.75rem;

  border: var(--sb-border-thin-width) solid var(--vp-button-brand-border);
  background-color: var(--vp-button-alt-bg);
  border-end-start-radius: var(--sb-radius-sm);
  border-start-end-radius: var(--sb-radius-sm);
}

button {
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

button {
  font-family: var(--vp-font-family-base), sans-serif;
  font-size: 0.75rem;
  padding-block: 0;
  padding-inline: calc(var(--sb-ui-padding-inline) * 0.75);
  border: 0;

  background-color: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
}

button:hover {
  background-color: var(--vp-button-brand-hover-bg);
  color: var(--vp-button-brand-hover-text);
}

button:first-child {
  border-end-start-radius: var(--sb-radius-xsm);
}

button:last-child {
  border-start-end-radius: var(--sb-radius-xsm);
}
</style>
