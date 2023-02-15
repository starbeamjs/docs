<script lang="ts">
import { useStorage } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";

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

class Lang {
  store = useStorage<Record<string, string>>("VUEPRESS_CODE_TAB_STORE", {});

  constructor() {
    watch(
      () => this.store.value[LANG_KEY] as "ts" | "js" | undefined,
      (newValue) => {
        currentLang.value = newValue ?? DEFAULT_LANG;
      }
    );
  }

  get lang(): "ts" | "js" {
    return this.store.value[LANG_KEY] === "ts" ? "ts" : "js";
  }

  set lang(lang: "ts" | "js") {
    this.store.value[LANG_KEY] = lang;
  }
}

const STORAGE = new Lang();

const currentLang = ref(STORAGE.lang);
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

function current() {
  return `${currentLang.value} lang-switcher`;
}
</script>

<template>
  <section :class="`${currentLang} section`">
    <p class="toggler">
      <button type="button" class="toggler-button3 js" @click="STORAGE.lang = 'js'">js</button>
      <button type="button" class="toggler-button3 ts" @click="STORAGE.lang = 'ts'">ts</button>
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
}

.section .toggler {
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
  right: 0;
  align-items: center;
  align-content: center;
  user-select: none;
  z-index: 3;
  font-size: 0.75rem;

  border: var(--sb-border-thin-width) solid var(--vp-button-brand-border);
  background-color: var(--vp-button-alt-bg);
  border-end-start-radius: var(--starbeam-radius-sm);
}

button {
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

button {
  font-family: var(--vp-font-family-base), sans-serif;
  font-size: 0.75rem;
  padding-block: 0;
  padding-inline: calc(var(--starbeam-ui-padding-inline) * 0.75);
  border: 0;

  background-color: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
}

button:hover {
  background-color: var(--vp-button-brand-hover-bg);
  color: var(--vp-button-brand-hover-text);
}

button:first-child {
  border-end-start-radius: var(--starbeam-radius-xsm);
}
</style>
