<script setup lang="ts">
import { computed } from "vue";
import { EXTERNAL_URL_RE, normalizeLink } from "./utils/links.js";
const props = defineProps<{
  tag?: string | undefined;
  size?: "medium" | "big" | undefined;
  theme?: "brand" | "alt" | "sponsor" | undefined;
  text: string;
  href?: string | undefined;
}>();
const classes = computed(() => [props.size ?? "medium", props.theme ?? "brand"]);
const isExternal = computed(() => props.href && EXTERNAL_URL_RE.test(props.href));
const component = computed(() => {
  if (props.tag) {
    return props.tag;
  }
  return props.href ? "a" : "button";
});
</script>

<template>
  <component
    :is="component"
    class="VPButton"
    :class="classes"
    :href="href ? normalizeLink(href) : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noreferrer' : undefined"
  >
    {{ text }}
  </component>
</template>

<style scoped>
.VPButton {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: var(--sb-font-weight-label);
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
}
.VPButton:active {
  transition: color 0.1s, border-color 0.1s, background-color 0.1s;
}
.VPButton.medium {
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
}
.VPButton.big {
  border-radius: 24px;
  padding: 0 24px;
  line-height: 46px;
  font-size: var(--sb-font-size);
}
.VPButton.brand {
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
}
.VPButton.brand:hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
}
.VPButton.brand:active {
  border-color: var(--vp-button-brand-active-border);
  color: var(--vp-button-brand-active-text);
  background-color: var(--vp-button-brand-active-bg);
}
.VPButton.alt {
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}
.VPButton.alt:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}
.VPButton.alt:active {
  border-color: var(--vp-button-alt-active-border);
  color: var(--vp-button-alt-active-text);
  background-color: var(--vp-button-alt-active-bg);
}
.VPButton.sponsor {
  border-color: var(--vp-button-sponsor-border);
  color: var(--vp-button-sponsor-text);
  background-color: var(--vp-button-sponsor-bg);
}
.VPButton.sponsor:hover {
  border-color: var(--vp-button-sponsor-hover-border);
  color: var(--vp-button-sponsor-hover-text);
  background-color: var(--vp-button-sponsor-hover-bg);
}
.VPButton.sponsor:active {
  border-color: var(--vp-button-sponsor-active-border);
  color: var(--vp-button-sponsor-active-text);
  background-color: var(--vp-button-sponsor-active-bg);
}
</style>
