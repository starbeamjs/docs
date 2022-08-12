<script setup lang="ts">
import { computed } from "vue";

import Icon from "../Icon.vue";
import Def from "./Def.vue";
import Defs from "./Defs.vue";
import type { Fn, Generic } from "./exports.js";
import Param from "./Param.vue";
import Section from "./Section.vue";
import Docs from "./signature/Docs.vue";
import Manual from "./signature/Manual.vue";
import Tag from "./signature/Tag.vue";
import { tokens } from "./signature/tokens.js";
import Type from "./signature/Type.vue";

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
      </template>
      <template #contents>
        <div class="generics" v-if="props.fn.hasGenerics()">
          <Defs class="docs generics" :defs="props.fn.generics">
            <template #entry="{ item }: { item: Generic }">
              <Type>{{ item.name }}</Type>
              <Type v-if="item.extends">
                {{ item.extends }}
              </Type>
            </template>
            <template #definition="{ item }: { item: Generic }">
              <Docs line>{{ item.docs }}</Docs>
            </template>
          </Defs>
        </div>
      </template>
    </Section>
  </template>

  <Section
    kind="constructor-fn"
    class="card-container"
    :level="3"
    :for="{ slug: props.fn.slug }"
  >
    <template #head>
      <template v-if="props.fn.kind === 'constructor-fn'">
        <Icon icon="build_circle" />Constructor Function
      </template>
      <template v-if="props.fn.kind === 'method'">
        <code>{{ props.fn.name }}</code>
      </template>
    </template>
    <template #contents>
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
              <Tag>returns</Tag>
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
