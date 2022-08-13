<script setup lang="ts">
import { computed } from "vue";

import Codicon from "../../Codicon.vue";
import Def from "../Def.vue";
import type { Fn } from "../exports.js";
import Section from "../Section.vue";
import { tokens } from "../signature/tokens.js";
import Docs from "./Docs.vue";
import EntryTag from "./EntryTag.vue";
import Generics from "./fragments/Generics.vue";
import Tags from "./fragments/Tags.vue";
import Manual from "./Manual.vue";
import Param from "./Param.vue";
import Type from "./Type.vue";

export type TypeDoc = [type: string, docs: string];

export interface FormattedType {
  type: string;
  docs?: string;
  optional: boolean;
}

const props = defineProps<{
  fn: Fn;
}>();

const ret = computed(() => props.fn.ret);

const signature = tokens()
  .add("kind", props.fn.prefix)
  .add("name", props.fn.name)
  .add("(")
  .map(props.fn.params, ({ name, type, isLast }, t) =>
    t.add("param", name).if(type.isOptional, "?").if(!isLast, ", ")
  )
  .add("): ")
  .add("type", props.fn.ret.name)
  .add(";");
</script>

<template>
  <template v-if="props.fn.kind === 'constructor-fn'">
    <Section class="signature card" :for="props.fn" :level="2">
      <template #head>
        <code>{{ props.fn.name }}</code>
        <Tags v-if="props.fn.tags" :tags="props.fn.tags" />
      </template>
      <template #contents>
        <Generics v-if="props.fn.hasGenerics()" :generics="props.fn.generics" />
      </template>
    </Section>
  </template>

  <Section
    :kind="props.fn.kind"
    class="card-container"
    :level="3"
    :for="{ slug: props.fn.slug }"
  >
    <template #head>
      <template v-if="props.fn.kind === 'constructor-fn'">
        <Codicon icon="symbol-constructor" />
        Constructor Function
      </template>
      <template v-if="props.fn.kind === 'method'">
        <code>{{ props.fn.name }}</code>
        <Tags v-if="props.fn.tags" :tags="props.fn.tags" />
      </template>
    </template>
    <template #contents>
      <Generics
        v-if="props.fn.kind !== 'constructor-fn' && props.fn.hasGenerics()"
        :generics="props.fn.generics"
      />
      <section class="card">
        <Manual :tokens="signature" />

        <Docs>{{ props.fn.docs }}</Docs>

        <dl class="docs">
          <template :key="(p) => p.name" v-for="param in props.fn.params">
            <Param
              v-if="param.hasOptions()"
              v-for="option in param.options()"
              :param="option"
            />
            <Param v-else-if="param.hasBareType()" :param="param" />
          </template>

          <Def v-if="ret.name !== 'void'">
            <template #entry>
              <EntryTag>returns</EntryTag>
              <Type>{{ ret.name }}</Type>
            </template>
            <template #definition>
              <Docs>{{ ret.docs }}</Docs>
            </template>
          </Def>
        </dl>
        <slot />
      </section>
    </template>
  </Section>
</template>
