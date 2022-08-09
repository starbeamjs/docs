<script setup lang="ts">
import { useData } from "vitepress";
import { computed, useSlots } from "vue";
import Constructor from "./Constructor.vue";
import { Exports } from "./exports.js";
import Function from "./Function.vue";
import type { YamlExports } from "./interface.js";
import Interface from "./Interface.vue";
const data = useData();
// const headers = data.headers;
// console.log({headers: [...data.headers]});

const exports = computed(() => new Exports(data.page.value.frontmatter as YamlExports));
const slots = useSlots();
</script>

<template>
  <nav>
    <ul>
      <template v-for="[, group] in exports.grouped()">
        <li v-for="item in group">
          <a :href="`#${item.slug}`">{{item.name}}</a>
          <template v-if="item.kind === 'constructor-fn'">
            <template v-if="item.hasProperties">
              <ul class="properties">
                <li>Properties
                  <ul>
                    <li v-for="property in item.properties"><a :href="`#${property.slug}`">{{property.name}}</a></li>
                  </ul>
                </li>
              </ul>
            </template>
            <template v-if="item.hasMethods">
              <ul class="methods">
                <li>Methods
                  <ul>
                    <li v-for="method in item.methods"><a :href="`#${method.slug}`">{{method.name}}</a></li>
                  </ul>
                </li>
              </ul>
            </template>
          </template>
        </li>
      </template>
    </ul>
  </nav>

  <section class="head-notes" v-if="slots.default">
    <slot></slot>
  </section>

  <template v-for="[kind, group] in exports.grouped()">
    <template v-for="e in group">
      <template v-if="e.kind === 'constructor-fn'">
        <Constructor :fn="e" />
      </template>
      <template v-else-if="e.kind === 'util-fn'">
        <Function :fn="e" />
      </template>
      <template v-else-if="e.kind === 'interface'">
        <Interface :type="e" />
      </template>
    </template>
  </template>
</template>
