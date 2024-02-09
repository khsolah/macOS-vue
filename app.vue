<script setup lang="ts">
import { useDockStore } from './store/Dock';

const dockStore = useDockStore();
dockStore.init();
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style lang="scss">
* {
  @apply m-0 min-w-0 p-0 box-border;
}

body {
  @apply min-h-100dvh;
  font-family: Helvetica, sans-serif;
}

h1,
h2,
h3,
h4 {
  @apply text-balance;
}

p {
  @apply text-pretty;
}

ul,
li {
  @apply list-none;
}
</style>
