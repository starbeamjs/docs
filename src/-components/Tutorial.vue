<script setup lang="ts">
import sdk, { type VM } from "@stackblitz/sdk";
import { onMounted, ref, watch } from "vue";

const embed = ref<HTMLDivElement | null>(null);
const iframe = ref<HTMLIFrameElement | null>(null);
const height = ref<number | null>(null);
const vm = ref<VM | null>(null);

const props = defineProps<{
  src: string;
  file: string;
}>();

onMounted(async () => {
  const div = embed.value as HTMLDivElement;
  const parent = div.parentElement as HTMLElement;

  await sdk.embedProjectId(div, props.src, {
    forceEmbedLayout: true,
    openFile: props.file,
    terminalHeight: 0,
    view: "editor",
  });

  const currentIframe = parent.querySelector("iframe") as HTMLIFrameElement;
  currentIframe.removeAttribute("height");
  currentIframe.style.width = "";
  iframe.value = currentIframe;
});

watch([iframe, height], ([iframe, height]) => {
  // if (iframe) {
  //   iframe.style.height = `100vh`;
  // }
});
</script>

<template>
  <section>
    <div class="description">
      <slot name="description" />
    </div>
    <div ref="embed" class="embed"></div>
  </section>
</template>

<style lang="postcss">
iframe.embed {
  position: fixed;
  // bottom: 0;
  top: var(--vp-nav-height);
  height: calc(100vh - var(--vp-nav-height));
  left: 60%;
  width: 40%;
  right: 0;
}
</style>

<style scoped lang="postcss">
:global(section) {
  --testing: 123;
}

section {
  display: grid;
  position: relative;
  grid-template-columns: 50% 50%;

  iframe {
    position: fixed;
    bottom: 0;
  }
}
</style>
