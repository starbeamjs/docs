<script setup lang="ts">
import { computed } from "vue";
import type { Fn } from "./exports.js";
import { md } from "./md.js";
import Section from "./Section.vue";
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

console.log(props.fn.docs);
</script>

<template>
  <Section :for="props.fn" :level="props.fn.kind === 'method' ? 4 : 2">
    <template #head
      ><code>{{ props.fn.name }}</code></template
    >
    <template #contents>
      <div class="language-ts">
        <pre class="manual">
      <code>
        <span class="starbeam-kind">{{props.fn.prefix}} </span>
        <span class="starbeam-name">{{ props.fn.name }}</span>
        <span class="starbeam-punct">(</span>
        <template
          :key="(p) => p.name"
          v-for="{name, type, isLast} in props.fn.params"
        >
          <span class="starbeam-param">{{ name }}</span>
          <span v-if="type.isOptional" class="starbeam-punct">?</span>
          <span class="starbeam-punct" v-if="!isLast">, </span>
        </template>
        <span class="starbeam-punct">)</span>
        <span class="starbeam-punct">: </span>
        <span class="starbeam-type">{{ props.fn.ret.name }}</span>
        <span class="starbeam-punct">;</span>
      </code>
    </pre>
      </div>

      <div v-if="props.fn.docs" class="docs" v-html="md(props.fn.docs)" />

      <dl class="docs">
        <template
          :key="(p) => p.name"
          v-for="{ name, type } in props.fn.params"
        >
          <dt :class="{ optional: type.isOptional }">
            <code class="starbeam-inline starbeam-bg-dark">
              <span class="starbeam-param">{{ name }}</span>
              <span v-if="type.isOptional" class="starbeam-punct">?</span>
            </code>
            <span>&nbsp; </span>
            <code class="starbeam-inline starbeam-bg-light">
              <span class="starbeam-type">{{ type.name }}</span>
            </code>
          </dt>
          <dd>
            <template v-if="type.docs">
              <p>
                {{ type.docs }}
                <code
                  class="starbeam-inline starbeam-bg-light starbeam-optional"
                >
                  <span v-if="type.isOptional" class="starbeam-type"
                    >&nbsp;optional</span
                  >
                </code>
              </p>
            </template>
          </dd>
        </template>
        <dt v-if="ret.name !== 'void'">
          <code class="starbeam-inline starbeam-bg-alt">
            <span class="starbeam-docs">returns</span>
          </code>
          <span>&nbsp; </span>
          <code class="starbeam-inline starbeam-bg-light">
            <span class="starbeam-type">{{ ret.name }}</span>
          </code>
        </dt>
        <dd v-if="ret.docs">
          <div v-html="md(ret.docs)"></div>
        </dd>
      </dl>
    </template>
  </Section>
</template>
