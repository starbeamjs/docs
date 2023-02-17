<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { PropType, ref, watch } from "vue";

import "./tabs.pcss";

export interface TabProps extends Record<string, unknown> {
  title: string;
  value?: string;
}

const tabStore = useStorage<Record<string, string>>("VUEPRESS_TAB_STORE", {});

const props = defineProps({
  active: { type: Number, default: 0 },
  data: {
    type: Array as PropType<TabProps[]>,
    required: true,
  },
  tabId: {
    type: String,
    default: "",
  },
});

const getInitialIndex = (): number => {
  if (props.tabId) {
    const valueIndex = props.data.findIndex(
      ({ title, value = title }) => tabStore.value[props.tabId] === value
    );

    if (valueIndex !== -1) return valueIndex;
  }

  return props.active;
};

// index of current active item
const activeIndex = ref(getInitialIndex());

// refs of the tab buttons
const tabRefs = ref([] as HTMLUListElement[]);

// update store
const updateStore = (): void => {
  if (props.tabId) {
    const { title, value = title } = props.data[activeIndex.value];

    tabStore.value[props.tabId] = value;
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

  updateStore();
};

watch(
  () => tabStore.value[props.tabId],
  (newValue, oldValue) => {
    if (props.tabId && newValue !== oldValue) {
      const index = props.data.findIndex(({ title, value = title }) => value === newValue);

      if (index !== -1) activeIndex.value = index;
    }
  }
);
</script>

<template>
  <ClientOnly>
    <div class="tab-list">
      <div class="tab-list-nav">
        <template v-for="({ title }, index) in props.data">
          <button
            :class="['tab-list-nav-item', { active: index === activeIndex }]"
            :aria-pressed="index === activeIndex"
            :aria-expanded="index === activeIndex"
            @click="
              () => {
                activeIndex = index;
                updateStore();
              }
            "
            @keydown="(event: KeyboardEvent) => keyboardHandler(event, index)"
          >
            {{ title }}
          </button>
        </template>
      </div>
      <template v-for="({ title, value = title }, index) in props.data">
        <div
          :class="{ 'tab-item': true, active: index === activeIndex }"
          :aria-selected="index === activeIndex"
          v-show="index === activeIndex"
        >
          <slot
            :name="`tab${index}`"
            :title="title"
            :value="value"
            :isActive="index === activeIndex"
          />
        </div>
      </template>
    </div>
  </ClientOnly>
</template>
