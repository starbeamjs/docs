<script lang="ts" setup>
import Codicon from "../Codicon.vue";
import type { PublicApi } from "./exports.js";

defineProps<{ api: PublicApi }>();
</script>

<template>
  <nav class="api-toc">
    <h2>API</h2>
    <ul>
      <template v-for="[, group] in api.grouped()">
        <li v-for="item in group">
          <a :href="`#${item.slug}`" :data-kind="item.kind">
            <Codicon v-if="item.kind === 'interface'" icon="symbol-interface" />
            <Codicon
              v-else-if="item.kind === 'constructor-fn'"
              icon="symbol-class"
            />
            <Codicon v-else-if="item.kind === 'const'" icon="symbol-constant" />
            <Codicon v-else-if="item.kind === 'variants'" icon="symbol-enum" />

            {{ item.name }}
          </a>
          <template v-if="item.isInterface()">
            <template v-if="item.hasProperties">
              <ul class="api-group properties">
                <li>
                  <ul>
                    <li v-for="property in item.properties">
                      <a :href="`#${property.slug}`" data-kind="property">
                        {{ property.name }}
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
                    <li v-for="method in item.methods">
                      <a :href="`#${method.slug}`" data-kind="method">{{
                        method.name
                      }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </template>
          </template>
        </li>
      </template>
    </ul>
  </nav>
</template>
