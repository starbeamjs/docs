<script setup lang="ts">
import { computed } from "vue";
import type { Fn } from "./exports.js";

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
</script>

<template>
  <component :is="props.fn.kind === 'method' ? 'h3' : 'h2'" :id="props.fn.slug">
    <code>{{ props.fn.name }}</code>
    <a class="header-anchor" aria-hidden="true" :href="`#${props.fn.slug}`">
      #
    </a>
  </component>

  <div class="language-ts">
    <pre class="manual">
      <code>
        <span class="starbeam-kind">{{props.fn.prefix}} </span>
        <span class="starbeam-name">{{ props.fn.name }}</span>
        <span class="starbeam-punct">(</span>
        <template
          :key="(p) => p.name"
          v-for="{name, isLast} in props.fn.params"
        >
          <span class="starbeam-param">{{ name }}</span>
          <span class="starbeam-punct" v-if="!isLast">, </span>
        </template>
        <span class="starbeam-punct">)</span>
        <span class="starbeam-punct">: </span>
        <span class="starbeam-type">{{ props.fn.ret.name }}</span>
        <span class="starbeam-punct">;</span>
      </code>
    </pre>
  </div>

  <slot></slot>

  <dl class="docs">
    <template :key="(p) => p.name" v-for="{ name, type } in props.fn.params">
      <dt :class="{ optional: type.isOptional }">
        <code class="starbeam-inline starbeam-bg-light starbeam-optional">
          <span class="starbeam-type">{{
            type.isOptional ? "optional" : "required"
          }}</span>
        </code>
        <span>&nbsp; </span>
        <code class="starbeam-inline starbeam-bg-dark">
          <span class="starbeam-param">{{ name }}</span>
        </code>
        <span>&nbsp; </span>
        <code class="starbeam-inline starbeam-bg-light">
          <span class="starbeam-type">{{ type.name }}</span>
        </code>
      </dt>
      <dd>
        <template v-if="type.docs">
          <p>{{ type.docs }}</p>
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
    <dd>
      <template v-if="ret.docs">
        <p>{{ ret.docs }}</p>
      </template>
    </dd>
  </dl>
</template>
