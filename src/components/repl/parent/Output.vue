<script setup lang="ts">
import { ref, onMounted } from "vue";
import { connectToChild } from "penpal";
import type { ChildAPI } from "../communication.js";

const iframe = ref(null);

onMounted(() => {
  const connection = connectToChild<ChildAPI>({
    // The iframe to which a connection should be made.
    iframe: iframe.value,
    // Methods the parent is exposing to the child.
    methods: {
      add(num1, num2) {
        return num1 + num2;
      },
    },
  });

  connection.promise.then((child) => {
    child.multiply(2, 6).then((total) => console.log(total));
    child.divide(12, 4).then((total) => console.log(total));
  });
});

const srcdoc = `
  <script type="module" src="pages/repl.html"><\/script>
`;
</script>

<template>
  <iframe
    class="w-full border border-black"
    src="/pages/repl.html"
    ref="iframe"
  ></iframe>
</template>
