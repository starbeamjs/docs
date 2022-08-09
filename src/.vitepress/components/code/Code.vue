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
  button.className = "toggler-button";
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
  <section :class="current()">
    <div class="js" ref="js"><slot name="js"></slot></div>
    <div class="types" ref="ts">
      <slot name="ts"></slot>
    </div>
  </section>
</template>

<style lang="scss">
.lang-switcher p.toggler {
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
}

.lang-switcher p.toggler {
  border: 3px solid var(--vp-button-brand-border);
  background-color: var(--vp-button-alt-bg);
  border-radius: var(--starbeam-radius);

  > span,
  > button {
    font-family: "Readex Pro", sans-serif;
    font-size: 0.75rem;
    padding-block: 0.25em;
    padding-inline: 0.75em;
  }

  span {
    background-color: var(--vp-button-brand-bg);
    color: var(--vp-button-brand-text);
  }

  button {
    background-color: var(--vp-button-alt-bg);
    color: var(--vp-button-alt-text);
  }

  button:hover {
    background-color: var(--vp-button-brand-hover-bg);
    transition: background-color var(--color-transition, 0.3s ease),
      color var(--color-transition, 0.3s ease);
  }
}

.lang-switcher p.toggler span {
  background-color: var(--vp-button-brand-bg);
  border-radius: var(--starbeam-radius-sm);
}

.lang-switcher p.toggler button {
  font-family: "Readex Pro", sans-serif;
  color: var(--tab-nav-text-color);
  background-color: var(--vp-button-alt-bg);
  border-radius: var(--starbeam-radius-sm);
  border: 0;
}

.lang-switcher div[class*="language-"]::before {
  display: none;
}
</style>

<style scoped>
section.js div.types {
  display: none;
}

section.ts div.js {
  display: none;
}
</style>
