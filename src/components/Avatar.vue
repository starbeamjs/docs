<script setup lang="ts">
import type { Contributor } from "../contributors.js";
defineProps<{
  contributor: Contributor;
}>();
</script>

<template>
  <div text-center>
    <img
      loading="lazy"
      :src="contributor.avatar"
      width="100"
      height="100"
      rounded-full
      min-w-25
      min-h-25
      h-25
      w-25
      :alt="`${contributor.name}'s avatar`"
    />
    <div text-xl mt-1 mb-1>
      {{ contributor.name }}
    </div>
    <div op60 v-html="contributor.bio" v-if="contributor.bio" />
    <div flex="~ inline gap-2" py-4 text-2xl>
      <a
        class="i-carbon-logo-github inline-block text-current op30 hover:op100 mya transition duration-200"
        :href="`https://github.com/${contributor.github}`"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${contributor.name} on GitHub`"
      />
      <a
        v-if="contributor.social?.twitter"
        class="i-carbon-logo-twitter inline-block text-1.3em mya text-current op30 hover:op100 transition duration-200"
        :href="`https://twitter.com/${contributor.social.twitter}`"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${contributor.name} on Twitter`"
      />
    </div>
  </div>
</template>
