<script setup lang="ts"></script>

<template>
  <code :class="['starbeam-inline', 'starbeam-bg-alt', $props.class]">
    <span class="starbeam-docs"><slot /></span>
  </code>
</template>
