<script setup lang="ts">
import { EApplicationName, useApplicationStore } from '~/store/Application';

const applicationStore = useApplicationStore();
const handleClose = (name: string) => applicationStore.shutdown(name);

onMounted(() => {
  applicationStore.launch(EApplicationName.CALCULATOR);
});
</script>

<template>
  <div class="desktop">
    <Dock />
    <component
      :is="application.component"
      v-for="application in applicationStore.applications"
      :key="application.id"
      :uid="application.id"
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
