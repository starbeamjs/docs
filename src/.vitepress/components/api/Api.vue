<script setup lang="ts">
import { useData } from "vitepress";
import { computed, useSlots } from "vue";
import Constructor from "./Constructor.vue";
import { Exports } from "./exports.js";
import Function from "./Function.vue";
import Icon from "./Icon.vue";
import type { YamlExports } from "./interface.js";
import Interface from "./Interface.vue";
const data = useData();

const exports = computed(() => new Exports(data.page.value.frontmatter as YamlExports));
const slots = useSlots();
</script>

<template>
  <nav class="api-toc">
    <h2>API</h2>
    <ul>
      <template v-for="[kind, group] in exports.grouped()">
        <li v-for="item in group">
          <a :href="`#${item.slug}`" :data-kind="item.kind">
            <Icon v-if="item.kind === 'interface'" icon="folder" />
            <Icon v-else-if="item.kind === 'constructor-fn'" icon="topic" />

            {{item.name}}
          </a>
          <template v-if="item.isInterface()">
            <template v-if="item.hasProperties">
              <ul class="api-group properties">
                <li>
                  <ul>
                    <li v-for="property in item.properties">
                      <a :href="`#${property.slug}`" data-kind="property">
                        {{property.name}}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </template>
            <template v-if="item.hasMethods">
              <ul class="api-group methods">
                <li>
                  <ul>
                    <li v-for="method in item.methods"><a :href="`#${method.slug}`" data-kind="method">{{method.name}}</a></li>
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
