<script lang="ts">
import "./code-tabs.scss";

import { useStorage } from "@vueuse/core";

import { ref, watch } from "vue";

import type { PropType } from "vue";

interface TabProps extends Record<string, unknown> {
  title: string;
  value?: string;
}

const codeTabStore = useStorage<Record<string, string>>(
  "VUEPRESS_CODE_TAB_STORE",
  {}
);

const PROPS = {
  active: { type: Number, default: 0 },
  data: {
    type: Array as PropType<TabProps[]>,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  tabId: {
    type: String,
    default: "",
  },
} as const;
</script>

<script setup lang="ts">
const props = defineProps(PROPS);

function getInitialIndex(): number {
  if (props.tabId) {
    const valueIndex = props.data.findIndex(
      ({ title, value = title }) => codeTabStore.value[props.tabId] === value
    );

    if (valueIndex !== -1) return valueIndex;
  }

  return props.active;
}

// index of current active item
const activeIndex = ref(getInitialIndex());

// refs of the tab buttons
const tabRefs = ref([] as HTMLUListElement[]);

// update store
const updateStore = (): void => {
  if (props.tabId) {
    const { title, value = title } = props.data[activeIndex.value];

    codeTabStore.value[props.tabId] = value;
  }
};

// activate next tab
const activateNext = (index = activeIndex.value): void => {
  activeIndex.value = index < tabRefs.value.length - 1 ? index + 1 : 0;
  tabRefs.value[activeIndex.value].focus();
};

// activate previous tab
const activatePrev = (index = activeIndex.value): void => {
  activeIndex.value = index > 0 ? index - 1 : tabRefs.value.length - 1;
  tabRefs.value[activeIndex.value].focus();
};

// handle keyboard event
const keyboardHandler = (event: KeyboardEvent, index: number): void => {
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    activeIndex.value = index;
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    activateNext();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    activatePrev();
  }

  if (props.tabId) {
    const { title, value = title } = props.data[activeIndex.value];

    codeTabStore.value[props.tabId] = value;
  }
};

watch(
  () => codeTabStore.value[props.tabId],
  (newValue, oldValue) => {
    if (props.tabId && newValue !== oldValue) {
      const index = props.data.findIndex(
        ({ title, value = title }) => value === newValue
      );

      if (index !== -1) activeIndex.value = index;
    }
  }
);
</script>

<template>
  <ClientOnly>
    <template v-if="props.data.length">
      <div class="code-tabs-nav" role="tablist">
        <template v-for="({ title }, index) in props.data">
          <button :class="['code-tabs-nav-tab', { active: index === activeIndex }]"
            :aria-pressed="index === activeIndex" :aria-expanded="index === activeIndex" role="tab"
            :aria-controls="`codetab-${props.id}-${index}`" :aria-selected="index === activeIndex" :ref="(element) => {
              if (element) tabRefs[index] = element as
                HTMLUListElement
            }" @click="
  () => {
    activeIndex = index;
    updateStore();
  }
" @keydown="(event: KeyboardEvent) => keyboardHandler(event, index)">
            {{ title }}
          </button>
        </template>
      </div>
      <template v-for="({ title, value = title }, index) in props.data">
        <div :class="['code-tab', { active: index === activeIndex }]" :id="`codetab-${props.id}-${index}`"
          role="tabpanel" :aria-selected="index === activeIndex" :aria-expanded="index === activeIndex">
          <slot :name="`tab${index}`" :title="title" :value="value" :isActive="index === activeIndex" />
        </div>
      </template>
    </template>
  </ClientOnly>
</template>
