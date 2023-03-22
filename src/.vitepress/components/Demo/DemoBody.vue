<script setup lang="ts">
import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  useSandpackConsole,
} from "sandpack-vue3";
import { usePreviewHeight } from "./bootstrap.js";
import { ref, watch } from "vue";
import Buttons from "./Buttons.vue";
import DemoConsole from "./DemoConsole.vue";

const toggleConsoleText = ref("Show Console");
const isConsoleVisible = ref(false);

const toggleConsoleVisibility = () => {
  isConsoleVisible.value = !isConsoleVisible.value;
  toggleConsoleText.value = isConsoleVisible.value
    ? "Hide Console"
    : "Show Console";
};

const toggleText = ref("Show Code");
const isCodeVisible = ref(false);

const toggleSource = () => {
  isCodeVisible.value = !isCodeVisible.value;
  toggleText.value = isCodeVisible.value ? "Hide Code" : "Show Code";
};

const consoleData = useSandpackConsole();

const container = usePreviewHeight();
</script>

<template>
  <div class="demo" ref="container">
    <SandpackLayout>
      <SandpackPreview>
        <template #actionsChildren>
          <Buttons
            :consoleData="consoleData"
            :source="{ toggle: toggleSource, text: toggleText }"
            :console="{
              toggle: toggleConsoleVisibility,
              text: toggleConsoleText,
            }"
          />
        </template>
      </SandpackPreview>
    </SandpackLayout>
    <DemoConsole :console-data="consoleData" :is-visible="isConsoleVisible" />
    <div class="code-editor" v-show="isCodeVisible">
      <SandpackFileExplorer :auto-hidden-files="true" />
      <SandpackCodeEditor
        :show-tabs="false"
        :show-inline-errors="true"
        :wrap-content="false"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
:deep(div.sp-preview-container) {
  display: grid;

  > .sp-preview-actions {
    justify-self: end;
    display: grid;
    grid-template:
      ". showcode showconsole refresh opensandbox" auto /
      1fr max-content max-content max-content;
    position: static;

    padding: var(--sp-space-3);

    > button.toggle-source {
      grid-area: showcode;
    }

    > button.toggle-console {
      grid-area: showconsole;
    }

    > button:nth-last-child(2) {
      grid-area: refresh;
    }

    > button:nth-last-child(1) {
      grid-area: opensandbox;
    }
  }
}

div.demo {
  display: grid;
  margin-block-start: 1rem;
  margin-block-end: 1rem;
  padding: 0;
  border: none;

  & + h2 {
    border-block-start: 1rem;
    margin-block-start: 0;
  }

  :deep(div.sp-wrapper) {
    margin-block-start: 0.5rem;
  }

  :deep(button.clear span.icon) {
    font-family: var(--icons);
  }

  :deep(div.sp-layout) {
    border: none;
    background: none;
  }

  :deep(div.sp-preview) {
    height: auto !important;
  }

  :deep(div.sp-preview-container) {
    display: block;
  }

  :deep(div.sp-stack) {
    div.sp-tabs {
      border: none;
    }

    div.sp-preview-container {
      border-radius: var(--sp-border-radius);
      border-color: var(--vp-badge-info-border);
      border-width: 1px;
      border-style: solid;
      background: var(--vp-badge-info-bg);

      color: var(--theme-color);
    }
  }

  :deep(.toggler:not(:has(:focus-visible))) {
    contain: paint;
  }

  :deep(button.toggle-button:not(:focus-visible)) {
    contain: paint;
  }

  :deep(button.toggle-button) {
    display: grid;
    align-content: center;
    background-color: var(--sp-colors-surface2);
    color: var(--sp-colors-clickable);
    padding-inline: 0.5rem;
    padding-block-end: 0.15rem;
    border-radius: 1rem;

    &:hover {
      background-color: var(--sp-colors-surface3);
      color: var(--sp-colors-hover);
    }

    &:active {
      color: var(--sp-colors-clickable);
    }

    > span.count {
      display: none;
    }

    &:not([data-count="0"]) {
      padding-inline-end: 0.75rem;

      > span.count {
        display: grid;
        font-size: 0.75em;
        width: 2em;
        height: 2em;
        place-content: center;
        color: red;
        position: absolute;
        right: 0;
        top: -0.5em;
        background-color: var(--sp-colors-clickable);
        color: var(--sp-colors-surface3);

        border-radius: 1000px;
      }
    }
  }
}
</style>

<style scoped lang="postcss">
div.demo .sp-layout > .sp-stack {
  /* height: max-content; */
}

div.code-editor {
  display: grid;
  contain: paint;
  width: 100%;
  border: 2px solid var(--sp-colors-surface3);
  border-radius: var(--sbdoc-radius);

  > div.sp-file-explorer {
    background-color: var(--sp-colors-surface3);

    button {
      padding-block: var(--sp-space-1);
      margin-block: 0;
    }

    button[data-active="true"] {
      /* color: red; */
      background-color: var(--sp-colors-surface1);
    }
  }

  > div.sp-editor {
    background-color: transparent;

    .cm-editor {
      background-color: transparent;
    }
  }

  grid-template-columns: max-content 1fr;
  margin-block-start: 1rem;

  div.sp-code-editor {
    pre.sp-cm {
      border: none;
      border-radius: 0;
      padding-block: 0;
    }

    div.cm-editor {
      border-inline-start: 0.1rem solid var(--sp-colors-surface3);

      /* border-radius: 0;
        border-top-width: 1px;
        border-color: var(--sp-colors-surface2); */
    }
  }
}
</style>
