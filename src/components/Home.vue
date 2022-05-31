<script setup lang="ts">
import contributors from "../contributors";
import "uno.css";
import "virtual:unocss-devtools";
import "./env.d.ts";
import "./repl/parent/monaco.js";
</script>
<template>
  <div flex flex-col items-center>
    <div grid justify-items-center gap-2 p="t-10 md:t-20 b-10">
      <p class="i-openmoji:sparkler inline-block text-8xl" />
      <h1 fw-400 text-3em md:text-4em font-light>Starbeam</h1>
      <p text="1.2em center" leading-7 op60 font-normal tracking-wide>
        Universal reactivity that integrates with your framework.
      </p>

      <h2 m="t-5" italic class="w-[70%]">
        If you model your reactive data like any other data, you can build
        reliable reactive UIs with the skills you already have.
      </h2>

      <div
        text-center
        flex
        flex-col
        sm:flex-row
        flex-wrap
        items-center
        gap-4
        mt-5
        children:my0
      >
        <a
          class="btn bg-warning"
          href="/pages/guides/getting-started"
          rel="noopener noreferrer"
        >
          <span class="i-carbon:page-last inline-block text-lg" />
          <span ma>Get Started</span>
        </a>
        <a
          class="btn bg-tip"
          href="/pages/guides/why"
          rel="noopener noreferrer"
        >
          <span class="i-carbon:list-checked inline-block text-lg" />
          <span ma>Why Starbeam</span>
        </a>
      </div>
    </div>

    <h2 op50 font-normal pt-10>Features</h2>
    <FeaturesList class="max-w-140 text-lg" />

    <h2 id="meet-the-team" op50 font-normal pt-5 pb-2>Meet The Team</h2>
    <div grid="~ sm:cols-2 gap-x-8 gap-y-20 items-center" p-10>
      <Avatar
        v-for="contributor of contributors"
        :key="contributor.github"
        v-bind:contributor="contributor"
      />
    </div>
    <h2 id="the-team" op50 font-normal pt-5 pb-2>Contributors</h2>
    <p op80 text-lg max-w-150 text-center leading-7>
      <Contributors />
      <br />
      <a href="https://chat.vitest.dev" rel="noopener noreferrer"
        >Join the community</a
      >
      and get involved!
    </p>

    <div mb-30 />
  </div>
</template>
