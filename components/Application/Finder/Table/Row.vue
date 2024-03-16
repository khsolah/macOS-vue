<script setup lang="ts">
import { type TFolder } from '../types';
import { useFinderStore } from '~/store/Finder';

const props = withDefaults(
  defineProps<{
    path?: string;
    folder?: TFolder;
    level?: number;
  }>(),
  {
    path: '~',
    level: 0,
  },
);

const finderStore = useFinderStore();
const currentFolder = computed(() =>
  props.folder ? props.folder : finderStore.getFolderByPath(props.path),
);
</script>

<template>
  <div v-for="file in currentFolder.files" :key="file.name">
    <ApplicationFinderTableData
      :file="file"
      :path="path"
      :level="props.level"
    />
  </div>
</template>
