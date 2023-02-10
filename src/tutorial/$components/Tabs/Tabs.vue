<script lang="ts" setup>
import { uidRef } from "@tutorial-vue/uid.js";
import { Slot, VNode, computed, h, ref, useSlots, watch } from "vue";
import { PageSize } from "../code/size.js";

export type SetTitle = (title: string) => void;
export type TabSlot = Slot & ((setTitle: SetTitle) => VNode);

const slots = useSlots() as Record<string, TabSlot>;
const { title, columns } = defineProps<{ title: string; columns: string }>();

console.log({ slots });

const size = PageSize({
  tiny: [0, 350],
  small: [350, 768],
  large: [1024, Infinity],
});

watch(size, (size) => {
  console.log({ size });
});

function renderTab(slotName: string, slot: Slot): { vdom: VNode[]; info: TabInfo } {
  const vdom = slot();

  const [first, ...rest] = vdom;

  if (!first) {
    throw Error(`Slot ${slotName} is empty, and it must at least contain a <title>`);
  }

  if (first.type !== "title") {
    throw Error(`The first element in Slot ${slotName} must be a <title>`);
  }

  if (typeof first.children !== "string") {
    throw Error(`${slotName}'s <title> must contain a string`);
  }

  console.log({ vdom });

  const id = `${tab.id.value}-${slotName}`;

  return { vdom: rest, info: { id, name: slotName, title: first.children } };
}

interface TabInfo {
  readonly title: string;
  readonly name: string;
  readonly id: string;
}

const renderedSlots = computed((): { Panes: () => VNode[]; infos: TabInfo[] } => {
  if (size.value === "large") {
    const infos: TabInfo[] = [];

    const panes = Object.entries(slots).map(([slotName, slotFn]) => {
      const { vdom, info } = renderTab(slotName, slotFn);
      infos.push(info);

      return h("section", { class: `pane ${slotName}` }, [vdom]);
    });

    return { Panes: () => panes, infos };
  } else {
    const infos: TabInfo[] = [];
    const panes: VNode[] = [];

    for (const [slotName, slotFn] of Object.entries(slots)) {
      const { vdom, info } = renderTab(slotName, slotFn);
      infos.push(info);
      console.log({ vdom });
      const selected = selectedTab.value === slotName;

      panes.push(
        h(
          "section",
          {
            role: "tabpanel",
            id: info.id,
            class: `pane ${slotName}${selected ? " selected" : ""}`,
            "aria-selected": selected,
          },
          [vdom]
        )
      );
    }

    console.log({ Panes: () => panes, switchers: infos });
    return { Panes: () => panes, infos };
  }
});

const Panes = computed(() => renderedSlots.value.Panes);
const infos = computed(() => renderedSlots.value.infos);

const selectedTab = ref(Object.keys(slots)[0] as string);

const tab = uidRef();
</script>

<template>
  <template v-if="size === 'large'">
    <div class="sections">
      <Panes />
    </div>
  </template>
  <template v-else>
    <div :class="`tabs ${selectedTab}`">
      <div role="tablist" :aria-label="title">
        <button
          role="tab"
          v-for="{ title, name, id } in infos"
          :aria-controls="id"
          :aria-selected="selectedTab === name"
          @click="() => (selectedTab = name)"
        >
          {{ title }}
        </button>
      </div>
      <section class="panels">
        <Panes />
      </section>
    </div>
  </template>
</template>

<style scoped lang="scss">
.sections {
  display: grid;
  align-items: start;

  grid-template-columns: v-bind(columns);
  padding-inline: var(--t-ui-gap);
  column-gap: var(--t-ui-gap);

  background-color: var(--vp-c-bg);

  .code {
    width: 100%;
  }
}

.tabs .pane {
  display: none;

  &.selected {
    display: grid;
  }
}
</style>
