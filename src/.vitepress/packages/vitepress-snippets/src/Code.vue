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

<style lang="scss">
.lang-switcher {
  position: relative;
}

.lang-switcher > div:is(.ts, .js) {
  display: none;
}

.lang-switcher.ts > div.ts,
.lang-switcher.js > div.js {
  display: block;
}

.lang-switcher p.toggler button {
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.lang-switcher.ts p.toggler button.ts,
.lang-switcher.js p.toggler button.js {
  background-color: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}

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

.vp-doc [class*="language-"] > p.toggler + button.copy {
  top: 3rem;
}

.vp-doc [class*="language-"]:not(:hover) button.copy.copied {
  opacity: 0;
}

.vp-doc [class*="language-"] > p.toggler ~ span.lang {
  display: none;
}

.lang-switcher p.toggler {
  border: var(--sb-border-thin-width) solid var(--vp-button-brand-border);
  background-color: var(--vp-button-alt-bg);
  border-end-start-radius: var(--starbeam-radius-sm);

  > button {
    font-family: "Readex Pro", sans-serif;
    font-size: 0.75rem;
    padding-block: 0;
    padding-inline: calc(var(--starbeam-ui-padding-inline) * 0.75);
  }

  button {
    background-color: var(--vp-button-alt-bg);
    color: var(--vp-button-alt-text);
  }

  button:hover {
    background-color: var(--vp-button-brand-hover-bg);
    color: var(--vp-button-brand-hover-text);
  }
}

.lang-switcher p.toggler button {
  font-family: "Readex Pro", sans-serif;
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
  border: 0;
}

.lang-switcher p.toggler button:first-child {
  border-end-start-radius: var(--starbeam-radius-xsm);
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
