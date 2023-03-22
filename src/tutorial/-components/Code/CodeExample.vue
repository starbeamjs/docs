<script setup lang="ts">
import { useCodeExample } from "./code.ts";
import { SandpackPreview, SandpackFileExplorer } from "sandpack-vue3";
import DemoConsole from "./DemoConsole.vue";
import Button from "./Buttons.vue";

const { isCodeVisible, consoleData, monacoEditorRef, editorRef, toggleConsoleVisibility } =
  useCodeExample();
</script>

<template>
  <div class="code-example">
    <DemoConsole :console-data="consoleData" :is-visible="isConsoleVisible" />
    <div class="files-wrapper" v-show="!isConsoleVisible">
      <div class="files">
        <SandpackFileExplorer :auto-hidden-files="true" />

        <div class="sp-code-editor" ref="editorRef"></div>

        <!-- <SandpackCodeEditor :show-tabs="false" :show-inline-errors="true" :wrap-content="false" /> -->
      </div>
    </div>
    <div class="preview">
      <SandpackPreview>
        <template #actionsChildren>
          <Buttons
            :consoleData="consoleData"
            :console="{
              toggle: toggleConsoleVisibility,
              text: toggleConsoleText,
            }"
          />
        </template>
      </SandpackPreview>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.code-example {
  display: grid;
  grid-template-rows: 60cqh calc(40cqh - 1rem);
  height: 100cqh;
  row-gap: 1rem;

  > .files-wrapper {
    display: grid;
    overflow: hidden;
    border: 2px solid var(--theme-color-bright);
  }

  > .preview {
    overflow-y: auto;
    border: 2px solid var(--theme-color);
  }

  :deep(.sp-preview) {
    height: 100%;
  }

  :deep(.sp-preview-container) {
    display: grid;
    position: relative;

    &:hover > .sp-preview-actions {
      opacity: 1;
      pointer-events: auto;
    }
  }
}

:deep(.sp-preview-actions) {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
  position: absolute;
  top: 0;
  right: 0;
  height: max-content;
  justify-self: end;
  display: grid;
  grid-auto-flow: column;
  padding: var(--sp-space-3);
}

:deep(.sp-preview-actions) {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
  position: absolute;
  top: 0;
  right: 0;
  height: max-content;
  justify-self: end;
  display: grid;
  grid-auto-flow: column;
  padding: var(--sp-space-3);
}

.files-wrapper,
:deep(.demo-console) {
  border-bottom-left-radius: var(--sbdoc-radius);
  border-bottom-right-radius: var(--sbdoc-radius);
  contain: paint;
}

.files {
  display: grid;
  grid-template-columns: max-content 1fr;
  border-bottom-left-radius: var(--sbdoc-radius);
  border-bottom-right-radius: var(--sbdoc-radius);

  :deep(.sp-file-explorer) {
    background-color: hsl(var(--sb-bg-hue), 50%, var(--sb-bg-lightness-brightest));
  }
}

.preview {
  border-top-left-radius: var(--sbdoc-radius);
  border-top-right-radius: var(--sbdoc-radius);
}

:deep(.code-editor) {
  display: grid;
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
