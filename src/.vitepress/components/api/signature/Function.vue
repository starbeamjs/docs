<script setup lang="ts">
import { computed } from "vue";

import type { ConstructorFn, Method, UtilFn } from "@starbeam/api-docs";
import Codicon from "../../Codicon.vue";
import Def from "../Def.vue";
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
  fn: ConstructorFn | UtilFn | Method;
}>();

const ret = computed(() => props.fn.fn.ret);

const signature = tokens()
  .add((t) => {})
  .add((t) => {
    switch (props.fn.kind) {
      case "fn:constructor":
      case "fn:util":
        t.add("kind", "function");
        t.add(" ");
        break;
    }
  })
  .add("name", props.fn.name)
  .add("(")
  .add((t) => {
    const params = props.fn.fn.params;

    if (params) {
      const last = params.length - 1;

      params.forEach((param, i) => {
        t.add("param", param.name);

        if (param.type.optional) {
          t.add("?");
        }

        if (i < last) {
          t.add(", ");
        }
      });
    }
  })
  .add("): ")
  .add("type", props.fn.fn.ret.name)
  .add(";");
</script>

<template>
  <template v-if="props.fn.kind === 'fn:constructor'">
    <Section class="signature card" :for="props.fn" :level="2">
      <template #head>
        <code>{{ props.fn.name }}</code>
        <Tags v-if="props.fn.export.tags" :tags="props.fn.export.tags" />
      </template>
      <template #contents>
        <Generics
          v-if="props.fn.fn.generics"
          :generics="props.fn.fn.generics"
        />
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
      <template v-if="props.fn.kind === 'fn:constructor'">
        <Codicon icon="symbol-constructor" />
        Constructor Function
      </template>
      <template v-if="props.fn.kind === 'method'">
        <code>{{ props.fn.name }}</code>
        <Tags v-if="props.fn.fn.tags" :tags="props.fn.fn.tags" />
      </template>
    </template>
    <template #contents>
      <Generics
        v-if="props.fn.kind !== 'fn:constructor' && props.fn.fn.generics"
        :generics="props.fn.fn.generics"
      />
      <section class="card">
        <Manual :tokens="signature" />

        <Docs>{{ props.fn.docs }}</Docs>

        <dl class="docs">
          <template :key="(p) => p.name" v-for="param in props.fn.fn.params">
            <Param
              v-if="param.hasOptions"
              v-for="option in param.options()"
              :param="option"
            />
            <Param v-else :param="param" />
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
