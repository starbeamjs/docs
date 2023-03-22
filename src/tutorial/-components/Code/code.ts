import type Monaco from "monaco-editor";
import { useSandpackConsole } from "sandpack-vue3";
import { onMounted, ref, watch, type Ref } from "vue";
import { TypescriptCache } from "./client/typescript-cache.js";
import { useWorkerClient } from "./client/worker-client.js";
import { useMonaco, type CodeFile } from "./monaco.js";
import { useTutorialSandpack } from "./sandpack.js";

export function useCodeExample(): {
  isCodeVisible: Ref<boolean>;
  consoleData: ReturnType<typeof useSandpackConsole>;
  monacoEditorRef: Ref<Monaco.editor.IStandaloneCodeEditor | null>;
  editorRef: Ref<HTMLDivElement | null>;
  toggleConsoleVisibility: () => void;
  toggleConsoleText: Ref<string>;
} {
  const toggleConsoleText = ref("Show Console");
  const isConsoleVisible = ref(false);

  onMounted(() => {
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
      ({
        version,
        fsMap,
      }: {
        version: string;
        fsMap: Map<string, string>;
      }) => {
        for (const [lib, file] of fsMap) {
          const cacheKey = "ts-lib-" + version + "-" + lib;
          localStorage.setItem(cacheKey, file);
        }
      }
    );
  });

  const toggleConsoleVisibility = () => {
    isConsoleVisible.value = !isConsoleVisible.value;
    toggleConsoleText.value = isConsoleVisible.value
      ? "Hide Console"
      : "Show Console";
  };

  const isCodeVisible = ref(false);

  const consoleData = useSandpackConsole();

  const editorRef = ref(null as HTMLDivElement | null);
  const monacoEditorRef = ref(
    null as Monaco.editor.IStandaloneCodeEditor | null
  );
  const sandpack = useTutorialSandpack();

  const monacoRef = useMonaco({
    sandpack,
    element: editorRef,
  });

  watch(sandpack.activeFile, (activeFile) => {
    const monaco = monacoRef.value;

    if (monaco) monaco.editor.setFile(activeFile);
  });

  return {
    isCodeVisible,
    consoleData,
    monacoEditorRef,
    editorRef,
    toggleConsoleVisibility,
    toggleConsoleText,
  };
}
