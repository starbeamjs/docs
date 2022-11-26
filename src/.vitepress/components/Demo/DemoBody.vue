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
</script>

<template>
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
  <DemoConsole :console-data="consoleData" :is-visible="isConsoleVisible" />
  <div class="code-editor" v-show="isCodeVisible">
    <SandpackFileExplorer :auto-hidden-files="true" />
    <SandpackCodeEditor
      :show-tabs="false"
      :show-inline-errors="true"
      :wrap-content="false"
    />
  </div>
</template>

<style lang="scss" scoped>
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
