<script setup lang="ts">
import VPFeature from "./VPFeature.vue";
import VPHero from "./VPHero.vue";

const config = {
  name: "Starbeam",
  text: "Reactivity Made Simple and Fun ✨",
  tagline:
    "Starbeam is a new kind of reactive library. It makes reactive programming simple and fun, and it works with your existing JavaScript framework.",
};

const features = [
  {
    title: "Use normal JavaScript",
    details:
      "Build reactive data structures using reactive versions of JavaScript built-ins like objects, arrays, maps, and sets, and update them exactly as you would with normal JavaScript.",
  },
  {
    title: "No delays",
    details:
      "Updates to reactive values <mark>take effect immediately.</mark> Your reactive data and computations are always coherent, just like normal JavaScript.",
  },
  {
    title: "Works everywhere",
    details:
      "You don't need to learn a new framework to take advantage of Starbeam's cutting edge reactivity system. You can render Starbeam data using renderers designed for your framework of choice, or even build your own renderer.",
  },

  {
    title: "TypeScript is first-class",
    details:
      "Every part of Starbeam's API was designed from the ground up using TypeScript types with careful attention to detail. If you develop in pure JS, you get inline suggestions, docs and tab completion in your editor.",
  },
] as const;
</script>

<template>
  <VPHero
    class="VPHomeHero"
    :name="config.name"
    :text="config.text"
    :tagline="config.tagline"
  ></VPHero>
  <div class="Content">
    <div class="Features">
      <template v-for="{ title, details } in features">
        <VPFeature :title="title" :details="details"></VPFeature>
      </template>
    </div>
    <div class="Features Content">
      <slot name="content" />
    </div>
  </div>
</template>

<style>
.VPHomeHero {
  font-family: var(--starbeam-font-fancy);
}
</style>

<style scoped>
.Features {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(max(30ch, 20vw), 1fr));
}

.Features .VPFeature {
  min-width: 40%;
}

.Content {
  display: grid;
  row-gap: 3rem;
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  .Features {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .Features {
    padding: 0 64px;
  }
}
.container {
  margin: 0 auto;
  max-width: 1152px;
}
</style>
