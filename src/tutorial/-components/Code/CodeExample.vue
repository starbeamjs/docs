<script setup lang="ts">
import type Monaco from "monaco-editor";
import { SandpackFileExplorer, SandpackPreview, useSandpackConsole } from "sandpack-vue3";
import { ref, watch } from "vue";
import Buttons from "./Buttons.vue";
import DemoConsole from "./DemoConsole.vue";
import { TypescriptCache } from "./client/typescript-cache.js";
import { useWorkerClient } from "./client/worker-client.js";
import { useMonaco, type CodeFile } from "./monaco.js";
import { useTutorialSandpack } from "./sandpack.js";

const toggleConsoleText = ref("Show Console");
const isConsoleVisible = ref(false);

const client = useWorkerClient();
const cache = TypescriptCache.initialize();

client.on("ready", () => {
  client.post("create-system", {
    files: sandpack.files,
    entry: sandpack.activeFile.value,
    fsMapCached: cache.toWorker(),
  });
});

client.on("add-lib", (code: CodeFile) => {
  const monaco = monacoRef.value;

  if (!monaco) {
    console.warn("Monaco not initialized, cannot add model");
    return;
  }

  monaco.system.upsertLib(code);
});

client.on("add-model", (code: CodeFile) => {
  const monaco = monacoRef.value;

  console.warn("adding model", code.path);

  if (!monaco) {
    console.warn("Monaco not initialized, cannot add model");
    return;
  }

  monaco.system.upsertFile(code);
});

client.on(
  "cache-typescript-fsmap",
  ({ version, fsMap }: { version: string; fsMap: Map<string, string> }) => {
    for (const [lib, file] of fsMap) {
      const cacheKey = "ts-lib-" + version + "-" + lib;
      localStorage.setItem(cacheKey, file);
    }
  }
);

const toggleConsoleVisibility = () => {
  isConsoleVisible.value = !isConsoleVisible.value;
  toggleConsoleText.value = isConsoleVisible.value ? "Hide Console" : "Show Console";
};

const isCodeVisible = ref(false);

const consoleData = useSandpackConsole();

const editorRef = ref(null as HTMLDivElement | null);
const monacoEditorRef = ref(null as Monaco.editor.IStandaloneCodeEditor | null);
const sandpack = useTutorialSandpack();

const monacoRef = useMonaco({
  sandpack,
  element: editorRef,
});

watch(sandpack.activeFile, (activeFile) => {
  const monaco = monacoRef.value;

  if (monaco) monaco.editor.setFile(activeFile);
});
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
