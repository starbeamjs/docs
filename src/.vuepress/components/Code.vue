<script setup lang="ts">
import { ref, onMounted } from "vue";

const showTypes = ref(false);
const js = ref();
const ts = ref();

onMounted(() => {
  const tsSection = ts.value;
  const jsSection = js.value;

  const tsContainer = tsSection.querySelector(
    "div[class^=language-]"
  );

  addToggle(tsContainer, "typescript", () => {
    showTypes.value = false;
  });

  const jsContainer = jsSection.querySelector(
    "div[class^=language-]"
  );

  addToggle(jsContainer, "javascript", () => {
    showTypes.value = true;
  });
});

function createToggler(): HTMLElement {
  const toggler = document.createElement("label");
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
  button.className = "toggler-button";
  button.innerText = text;
  button.addEventListener("click", callback);

  return button;
}

function addToggle(
  container: HTMLElement,
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

function current() {
  return showTypes.value
    ? "ts lang-switcher"
    : "js lang-switcher";
}

function next() {
  return showTypes.value ? "javascript" : "typescript";
}

function toggle(e) {
  const checked = e.target.checked;

  showTypes.value = !showTypes.value;
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
.lang-switcher label.toggler {
  display: grid;
  grid-template-columns: max-content 1fr;
  position: absolute;
  top: 0;
  align-items: center;
  user-select: none;
  right: 0em;
  z-index: 3;
  color: var(--code-line-color);
  font-size: 0.75rem;
  transition: color var(--color-transition);
  border-bottom: 1px solid var(--border-color);
}

.lang-switcher label.toggler {
  background-color: var(--tab-nav-bg-color);
}

.lang-switcher label.toggler {
  border: 3px solid var(--border-color);
  border-radius: 0.5em;

  span,
  button {
    font-family: "Readex Pro", sans-serif;
    font-size: 0.75rem;
    padding-block: 0.5em;
    padding-inline: 0.75em;
  }

  button:hover {
    background-color: var(--tab-nav-hover-color);
    transition: background-color
        var(--color-transition, 0.3s ease),
      color var(--color-transition, 0.3s ease);
  }
}

.lang-switcher label.toggler span {
  background-color: var(--tab-bg-color);
  border-radius: 0.25rem;
}

.lang-switcher label.toggler button {
  font-family: "Readex Pro", sans-serif;
  color: var(--tab-nav-text-color);
  background-color: var(--tab-nav-bg-color);
  border-radius: 0.25rem;
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
