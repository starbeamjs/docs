<script setup lang="ts">
import Content from "./Content.vue";
import Header from "./Header.vue";
</script>

<template>
  <Suspense>
    <section class="tutorial">
      <header>
        <Header />
      </header>
      <main>
        <Content>
          <slot></slot>
        </Content>
      </main>
    </section>
  </Suspense>
</template>

<style lang="scss" scoped>
section.tutorial {
  width: 100vw;
  height: 100vh;

  display: grid;

  grid-template:
    "header" max-content
    "." 1.5rem
    "content" 1fr /
    1fr;
}

header {
  position: relative;

  display: grid;
  grid-area: header;

  text-transform: uppercase;
  padding-block: 1rem;
  justify-content: center;
  background-color: white;
  color: var(--vp-c-text);
  box-shadow: 0px 5px 5px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

  height: max-content;
}

main {
  display: grid;
  grid-area: content;

  background-color: var(--vp-c-bg);
}
</style>

<style>
@import "./styles.scss";
</style>
