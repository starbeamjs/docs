<script setup lang="ts">
import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
  useSandpackConsole,
} from "sandpack-vue3";
import { ref } from "vue";
import Buttons from "./Buttons.vue";
import DemoConsole from "./DemoConsole.vue";

const toggleConsoleText = ref("Show Console");
const isConsoleVisible = ref(false);

const toggleConsoleVisibility = () => {
  isConsoleVisible.value = !isConsoleVisible.value;
  toggleConsoleText.value = isConsoleVisible.value ? "Hide Console" : "Show Console";
};

const isCodeVisible = ref(false);

const consoleData = useSandpackConsole();
</script>

<template>
  <div class="code-example">
    <DemoConsole :console-data="consoleData" :is-visible="isConsoleVisible" />
    <div class="files-wrapper" v-show="!isConsoleVisible">
      <div class="files">
        <SandpackFileExplorer :auto-hidden-files="true" />

        <SandpackCodeEditor :show-tabs="false" :show-inline-errors="true" :wrap-content="false" />
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

<style lang="scss" scoped>
.code-example {
  display: grid;
  grid-template-rows: 60cqh calc(40cqh - 1rem);
  height: 100cqh;
  row-gap: 1rem;

  > .files-wrapper {
    display: grid;
    overflow: hidden;
    border: 2px solid var(--theme-color-bright);

    > .files {
      overflow-y: auto;
    }
  }

  > .preview {
    overflow-y: auto;
    border: 2px solid var(--theme-color);
  }

  :deep(.sp-preview) {
    height: 100%;

    > .sp-preview-container {
      display: grid;
      position: relative;
      // grid-template-rows: 0 max-content;

      &:hover > .sp-preview-actions {
        opacity: 1;
        pointer-events: auto;
      }

      > .sp-preview-actions {
        // float: right;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        pointer-events: none;
        position: absolute;
        top: 0;
        right: 0;
        height: max-content;
        // position: static;
        justify-self: end;
        display: grid;
        grid-auto-flow: column;
        padding: var(--sp-space-3);
      }
    }
  }
}

div.files-wrapper,
div.demo-console {
  border-bottom-left-radius: var(--starbeam-radius);
  border-bottom-right-radius: var(--starbeam-radius);
  contain: paint;
  scrollbar-gutter: both-edges;
}

div.files {
  display: grid;
  grid-template-columns: max-content 1fr;
  border-bottom-left-radius: var(--starbeam-radius);
  border-bottom-right-radius: var(--starbeam-radius);

  :deep(.sp-file-explorer) {
    background-color: hsl(var(--starbeam-bg-hue), 50%, var(--starbeam-bg-lightness-brightest));
  }
}

div.preview {
  border-top-left-radius: var(--starbeam-radius);
  border-top-right-radius: var(--starbeam-radius);
}

div.code-editor {
  display: grid;
  width: 100%;
  border: 2px solid var(--sp-colors-surface3);
  border-radius: var(--starbeam-radius);

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
