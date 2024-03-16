<script setup lang="ts">
import { EFileKind, EFileType, type TFile, type TFolder } from '../types';
import { useFinderStore } from '~/store/Finder';

const props = defineProps<{
  file: TFile | TFolder;
  path: string;
  level: number;
}>();

const finderStore = useFinderStore();
const currentPath = computed(() => `${props.path}/${props.file.name}`);
const isExpanded = computed(() =>
  finderStore.expandedSet.has(currentPath.value),
);
const maxHeight = computed(() => {
  return `max-height: ${
    (finderStore.expandedMap.get(currentPath.value) ?? 0) * 20
  }px`;
});
</script>

<template>
  <div
    class="finder-table__row"
    :tabindex="0"
    @click="finderStore.handleFocus(file, $event)"
  >
    <div
      class="finder-table__item"
      :style="{
        paddingLeft: `${
          (file.kind === EFileKind.FOLDER ? 8 : 24) + level * 16
        }px`,
      }"
    >
      <button
        v-if="props.file.kind === EFileKind.FOLDER"
        class="expand-btn"
        :class="{ 'expand-btn--expanded': isExpanded }"
        @click="finderStore.handleExpand(file, !isExpanded, currentPath)"
      >
        <i class="i-mdi:keyboard-arrow-right" />
      </button>
      <img
        v-if="props.file.type === EFileType.DOCUMENT"
        src="/icons/generic-documents.webp"
        alt="Document"
        class="icon"
      />
      <img
        v-else-if="props.file.type === EFileType.FOLDER"
        src="/icons/generic-folder.svg"
        alt="Document"
        class="icon"
      />
      <span class="name">{{ props.file.name }}</span>
    </div>
    <div class="finder-table__item">{{ props.file.dateModified }}</div>
    <div class="finder-table__item">{{ props.file.size }}</div>
    <div class="finder-table__item">{{ props.file.kind }}</div>
  </div>
  <div
    v-if="file.kind === EFileKind.FOLDER"
    class="overflow-hidden transition-all origin-top"
    :style="maxHeight"
  >
    <ApplicationFinderTableRow
      :folder="file"
      :path="currentPath"
      :level="props.level + 1"
    />
  </div>
</template>

<style scoped lang="scss">
.finder-table {
  &__row {
    @apply flex items-center;
    // @apply border-solid border-0 border-b-1px border-b-white/10;
    @apply outline-none even-of-type:bg-[rgb(52,43,41)];
    @apply active:bg-[rgb(37,87,202)];
    @apply focus:bg-[rgb(37,87,202)] focus:even-of-type:bg-[rgb(37,87,202)];
  }

  &__item {
    @apply h-5 text-xs px-2 text-white/75 relative flex items-center;
    @apply whitespace-nowrap overflow-ellipsis;
    @apply first:text-white;
    &:nth-of-type(1) {
      @apply w-45%;
    }
    &:nth-of-type(2) {
      @apply w-28%;
    }
    &:nth-of-type(3) {
      @apply w-10%;
    }
    &:nth-of-type(4) {
      @apply w-17%;
    }

    .expand-btn {
      @apply bg-transparent border-none outline-none text-white text-base leading-none transition relative;
      &--expanded {
        @apply rotate-90;
      }
    }

    .icon {
      @apply h-4 w-4 relative;
    }

    .name {
      @apply pl-1 align-middle;
    }
  }
}
</style>
