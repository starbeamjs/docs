<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  height: {
    type: [String, Number],
    default: "80vh",
  },
  file: {
    type: String,
    default: "",
  },
  initialpath: {
    type: String,
    default: "",
  },
  embed: {
    type: Boolean,
    default: false,
  },
  clickToLoad: {
    type: Boolean,
    default: true,
  },
  view: {
    type: String as PropType<"editor" | "preview">,
    default: "preview",
  },
  hideExplorer: Boolean,
  hideNavigation: Boolean,
  hidedevtools: Boolean,
});

function src() {
  let path = `https://stackblitz.com/edit/${props.id}`;

  path += `?embed=${props.embed ? 1 : 0}`;
  path += `&file=${props.file}`;

  if (props.initialpath) {
    path += `&initialpath=${encodeURI(props.initialpath)}`;
  }

  path += `&cctl=${props.clickToLoad ? 1 : 0}`;
  path += `&view=${props.view}`;

  if (props.hideExplorer) {
    path += `&hideExplorer=1`;
  }

  if (props.hideNavigation) {
    path += `&hideNavigation=1`;
  }

  if (props.hidedevtools) {
    path += `&hidedevtools=1`;
  }

  return path;
}

const style = {
  width: "100%",
  "border-radius": "var(--starbeam-radius)",
  height: typeof props.height === "string" ? props.height : `${props.height}px`,
};
</script>

<template>
  <iframe class="stack-blitz-iframe" :src="src()" :style="style"></iframe>
</template>
