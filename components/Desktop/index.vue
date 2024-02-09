<script setup lang="ts">
import { useApplicationStore } from '~/store/Application';

const applicationStore = useApplicationStore();
const handleClose = (name: string) => applicationStore.shutdown(name);
</script>

<template>
  <div class="desktop">
    <Dock />
    <component
      :is="application.component"
      v-for="application in applicationStore.applications"
      :id="application.id"
      :key="application.id"
      :z-index="application.zIndex"
      @close="handleClose(application.id)"
    />
  </div>
</template>

<style lang="scss">
.desktop {
  @apply h-100vh w-100vw z--1;
  background: no-repeat url('/assets/images/macos-ventura.webp') center / cover;
}
</style>
