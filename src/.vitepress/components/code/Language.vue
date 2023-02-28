<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { ref, watch } from "vue";

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

function current() {
  return `${currentLang.value} custom-block lang-docs`;
}
</script>

<template>
  <section :class="current()">
    <div class="js" ref="js"><slot name="js"></slot></div>
    <div class="ts" ref="ts">
      <slot name="ts"></slot>
    </div>
  </section>
</template>

<style lang="postcss">
.lang-docs {
  position: relative;
  display: contents;
  color: var(--fg-color);
}

.lang-docs > div:is(.ts, .js) {
  display: none;
}

.lang-docs.ts,
.lang-docs.ts :before,
.lang-docs.ts :after {
  --fg-color: hsl(
    var(--typescript-hue),
    var(--typescript-saturation),
    var(--sb-fg-lightness-normal)
  );

  --border-color: hsl(
    var(--typescript-hue),
    var(--typescript-saturation),
    var(--sb-fg-lightness-dim)
  );

  --bg-color: hsl(
    var(--typescript-hue),
    var(--typescript-saturation),
    var(--sb-bg-lightness-brightest)
  );
}

.lang-docs.js,
.lang-docs.js :before,
.lang-docs.js :after {
  --fg-color: hsl(
    var(--javascript-hue),
    var(--javascript-saturation),
    var(--sb-fg-lightness-bright)
  );

  --border-color: hsl(
    var(--javascript-hue),
    var(--javascript-saturation),
    var(--sb-fg-lightness-normal)
  );

  --bg-color: hsl(
    var(--javascript-hue),
    var(--javascript-saturation),
    var(--sb-bg-lightness-brighter)
  );
}

.lang-docs.ts > div.ts:not(:empty),
.lang-docs.js > div.js:not(:empty) {
  display: block;

  border-radius: var(--sb-radius);

  margin-block: var(--sb-p-break) calc(var(--sb-p-break) + 0.3rem);

  > :first-child {
    margin-block-start: 0;
  }

  > :last-child {
    margin-block-end: 0;
  }

  &:not(:empty) {
    display: grid;
    align-items: baseline;
    grid-template-columns: 1fr 1000fr;
    row-gap: var(--sb-p-break);
    column-gap: calc(var(--sb-ui-text-offset-start) * var(--sb-ratio-up2));
  }

  > p {
    grid-column: 2;
    margin: 0;

    > code {
      color: var(--fg-color);
      background-color: var(--bg-color);
    }
  }

  &:not(:empty)::before {
    display: grid;
    justify-self: end;
    width: 2em;
    justify-content: center;
    height: max-content;
    line-height: 1;
    grid-column: 1;

    padding-inline: calc(var(--sb-ui-padding-inline) * var(--sb-ratio-down2));
    padding-block-start: calc(var(--sb-ui-padding-block) * var(--sb-ratio-down1));
    padding-block-end: calc(var(--sb-ui-padding-block) + 0.05rem);

    border-radius: var(--sb-radius-xsm);
    font-size: calc(var(--sb-font-size) / var(--sb-ratio));
    content: attr(class);
    background-color: var(--bg-color);
    color: var(--fg-color);
    border-block-end: var(--sb-border-thicker) solid var(--border-color);
    border-inline-end: var(--sb-border-thicker) solid var(--border-color);
  }
}

.lang-docs div[class*="language-"]::before {
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
