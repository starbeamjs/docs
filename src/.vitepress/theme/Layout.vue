<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import { onMounted, ref, watch } from "vue";
import { STORAGE } from "@starbeam-docs/snippets";

const { Layout } = DefaultTheme;

onMounted(() => {
  document.body.setAttribute("data-lang", STORAGE.lang);
});

const isChecked = ref(false);

function toggle() {
  isChecked.value = !isChecked.value;
}

watch(
  () => STORAGE.lang,
  (lang) => {
    document.body.setAttribute("data-lang", lang);
  }
);

onMounted(() => {
  const ts = document.querySelector("#app .social-links a[href*=typescript]");
  replace(ts);

  const tsInList = document.querySelector(
    "#app .social-links-list a[href*=typescript]"
  );
  replace(tsInList);

  function replace(ts: Element | null) {
    if (ts) {
      const label = document.createElement("label");
      label.title = "Show TypeScript code and examples";

      label.classList.add("switch-lang");
      const input = document.createElement("input");

      input.oninput = (e) => {
        isChecked.value = input.checked;
      };

      input.type = "checkbox";
      label.append(input);

      const tsSpan = document.createElement("span");
      tsSpan.classList.add("ts");
      label.append(tsSpan);

      const jsSpan = document.createElement("span");
      jsSpan.classList.add("js");
      label.append(jsSpan);

      ts.replaceWith(label);

      function toggle() {
        label.classList.toggle("checked", isChecked.value);
        STORAGE.lang = isChecked.value ? "ts" : "js";
      }

      watch(isChecked, toggle);
      toggle();
    }
  }
});
</script>

<template>
  <Layout class="app"> </Layout>
</template>

<style scoped lang="postcss">
:deep(.switch-lang) {
  --ts-bg-color: var(--sb-bg-blue-stronger);
  --ts-fg-color: var(--sb-fg-blue);
  --ts-fg-focus: var(--sb-fg-blue-stronger);
  --js-bg-color: var(--sb-bg-yellow-stronger);
  --js-fg-color: var(--sb-fg-yellow-stronger);
  --js-fg-focus: var(--sb-fg-yellow-strongest);
  --border-size: 2px;

  display: grid;
  position: relative;
  align-self: center;
  height: 20px;
  aspect-ratio: 1/1;
  border: var(--border-size) solid var(--local-fg);
  transition: border 0.4s ease-in-out, background-color 0.4s ease-in-out;
  border-radius: var(--sbdoc-radius-sm);
  background-color: var(--local-bgcolor);
  contain: strict;
  font-family: var(--sb-font-fancy);
  font-weight: var(--sb-font-weight-bold);
  font-size: 80%;
  user-select: none;

  &:has(:focus-visible) {
    /* outline: 0px 0px 0 10px -webkit-focus-ring-color; */
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: 10px;

    span.js,
    &::before {
      color: black;
      text-decoration: underline;
    }
  }

  input:focus-visible {
    outline: none;
  }

  &:not(.checked) {
    &,
    &::before {
      --local-fg: var(--js-fg-color);
      --local-bg: var(--js-bg-color);
      --local-focus: var(--js-fg-focus);
    }
  }

  &.checked {
    &,
    &::before {
      --local-fg: var(--ts-fg-color);
      --local-bg: var(--ts-bg-color);
      --local-focus: var(--ts-fg-focus);
    }
  }

  &::before {
    --border-offset: calc(var(--border-size) * -1);
    --duration: 0.15s;
    z-index: 0;
    content: "TS";
    position: absolute;
    top: var(--border-offset);
    left: var(--border-offset);
    bottom: var(--border-offset);
    right: var(--border-offset);
    transform: scale(0);
    transition: transform var(--duration) ease-in-out,
      background-color var(--duration) ease-in-out;

    /* background-color: var(--local-bg); */
  }

  &.checked::before {
    transform: scale(1);
  }

  input {
    appearance: none;

    ~ span {
      z-index: 1;
      opacity: 0;
    }

    &:checked ~ .ts {
      opacity: 1;
    }

    &:not(:checked) ~ .js {
      opacity: 1;
    }
  }

  span,
  &::before {
    font-size: 0.7em;
    position: absolute;

    top: 0;
    left: 0;
    width: 17px;
    height: 18px;
    display: grid;
    place-content: center;
  }

  span.js {
    /* background-color: var(--sb-bg-yellow-stronger); */
    color: var(--sb-fg-yellow);

    &::before {
      content: "JS";
    }
  }

  span.ts {
    /* background-color: var(--sb-bg-blue-stronger); */
    color: var(--sb-fg-blue);
  }
}
</style>
