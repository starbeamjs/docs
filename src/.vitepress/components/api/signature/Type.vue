<script setup lang="ts"></script>

<template>
  <code :class="['starbeam-inline', 'starbeam-bg-light', $props.class]">
    <span class="starbeam-type"><slot /></span>
  </code>
</template>
