<script setup lang="ts">
import * as monaco from "monaco-editor";
import { ref, onMounted } from "vue";
import { FILES } from "../../../monaco/setup.js";
import { MONACO_WORKSPACE, Package } from "../../../monaco/store.js";

const container = ref(null);

onMounted(() => {
  console.log(
    JSON.stringify(
      monaco.editor.getModels().map(({ id, uri }) => [id, uri]),
      null,
      2
    )
  );
  console.log(
    JSON.stringify(
      monaco.languages.typescript.typescriptDefaults.getExtraLibs(),
      null,
      2
    )
  );

  monaco.editor.create(container.value, {
    model: FILES.index.model,
    language: "typescript",
    lineNumbers: "on",
    minimap: {
      enabled: false,
    },
  });
});
</script>

<template>
  <div
    ref="container"
    class="w-full border border-black"
    style="height: 30vh"
  />
</template>
