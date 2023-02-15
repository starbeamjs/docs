<script setup lang="ts"></script>

<template>
  <div class="info custom-block">
    <p>
      In this example, the <span class="react">React</span> and
      <span class="preact">Preact</span> code is very similar.
    </p>
    <p>
      To make it easier to see the differences between them, lines that are
      specific to React are highlighted with
      <span class="react hl">React</span> and lines that are specific to Preact
      are highlighted with <span class="preact hl">Preact</span>.
    </p>
  </div>
</template>

<style scoped lang="scss">
.react,
.preact {
  display: inline-flex;
  column-gap: 0.5ex;
  align-items: baseline;
  --saturation: 100%;
  color: hsl(var(--hue), var(--saturation), var(--fg-lightness));

  &::before {
    display: grid;
    content: "";
    background: var(--custom-logo) right center/contain no-repeat;
    grid: 1.3ex / 1.3ex;
  }
}

.hl {
  background-color: hsl(var(--hue), var(--saturation), 90%);
  padding-inline: 0.5ex;
  border-radius: 0.5ex;
}

.preact,
.preact::before {
  --custom-logo: url(../.vitepress/theme/images/preact.svg);
  --hue: 261;
  --saturation: 52%;
  --fg-lightness: 47%;
}

.react,
.react::before {
  --custom-logo: url(../.vitepress/theme/images/react.svg);
  --hue: 193;
  --saturation: 95%;
  --fg-lightness: 40%;
}
</style>
