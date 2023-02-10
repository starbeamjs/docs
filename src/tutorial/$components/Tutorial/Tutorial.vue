<script setup lang="ts">
import Content from "./Content.vue";
import Header from "./Header.vue";

const SMALL = "384px";
const MEDIUM = "768px";
const LARGE = "1024px";
</script>

<template>
  <Suspense>
    <section class="tutorial">
      <header>
        <Header />
      </header>
      <main>
        <Content><slot /></Content>
      </main>
    </section>
  </Suspense>
</template>

<style lang="scss" scoped>
section.tutorial {
  display: grid;

  grid-template:
    "header" max-content
    "." var(--t-ui-gap-lg)
    "content" 1fr /
    1fr;
}

:deep(h2, h3, h4, h5, h6) {
  > .header-anchor {
    float: left;
    opacity: 0;
    margin-inline-start: -0.87em;
    user-select: none;
    transition: color 0.25s, opacity 0.25s;
    font-weight: 500;
  }

  &:hover > .header-anchor {
    opacity: 1;
  }
}

header {
  position: relative;

  display: grid;
  grid-area: header;

  text-transform: uppercase;
  padding-block: var(--t-ui-gap);
  justify-content: center;
  background-color: white;
  color: var(--vp-c-text);
  box-shadow: 0px 5px 5px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

  height: max-content;
}

main {
  grid-area: content;
  container-type: size;
}
</style>

<style lang="scss">
@import "./styles.scss";
</style>
