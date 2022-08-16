<script lang="ts" setup>
import { ExportItem, type Exports } from "@starbeam/api-docs";
import Codicon from "../Codicon.vue";

defineProps<{ api: Exports }>();
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
              v-else-if="item.kind === 'fn:constructor'"
              icon="symbol-class"
            />
            <Codicon v-else-if="item.kind === 'const'" icon="symbol-constant" />
            <Codicon v-else-if="item.kind === 'variants'" icon="symbol-enum" />

            {{ item.name }}
          </a>
          <template v-if="ExportItem.hasMembers(item)">
            <template v-if="item.members.hasProperties">
              <ul class="api-group properties">
                <li>
                  <ul>
                    <li v-for="property in item.members.properties">
                      <a :href="`#${property.slug}`" data-kind="property">
                        {{ property.name }}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </template>
            <template v-if="item.members.hasMethods">
              <ul class="api-group methods">
                <li>
                  <ul>
                    <li v-for="method in item.members.methods">
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
