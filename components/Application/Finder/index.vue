<script setup lang="ts">
const props = defineProps<{
  id: string;
  zIndex: number;
}>();

const handleEl = ref<HTMLElement>();
</script>

<template>
  <ApplicationHocWrapper
    :id="props.id"
    ref="wrapper"
    :width="880"
    :height="440"
    :z-index="props.zIndex"
    :handle-el="handleEl"
  >
    <div
      class="rounded-lg h-110 grid w-220 grid-cols-10 grid-rows-10 overflow-hidden"
    >
      <!-- side bar -->
      <ApplicationFinderSidebar />

      <!-- folder info -->
      <div
        ref="handleEl"
        un-grid="~ col-span-10 col-start-1 row-span-1 cols-10 rows-1"
      >
        <div
          class="bg-[rgb(61,56,53)] p-2"
          un-grid="col-span-10 col-start-3 row-span-1"
          un-flex="~ items-center"
        >
          <button class="px-1 info__btn">
            <i class="text-2xl i-mdi:keyboard-arrow-left" />
          </button>
          <button class="px-1 info__btn" disabled>
            <i class="text-2xl i-mdi:keyboard-arrow-right" />
          </button>
          <div
            class="text-md text-ellipsis ml-1 text-white/95 w-80 overflow-hidden whitespace-nowrap"
          >
            Home
          </div>

          <button class="mr-10 ml-5 px-.5 info__btn" disabled>
            <i class="i-mdi:format-list-bulleted" />
          </button>
          <button class="mr-2 px-.5 info__btn" disabled>
            <i class="rotate--90 i-mdi:export" />
          </button>
          <button class="mr-2 px-.5 info__btn" disabled>
            <i class="rotate-90 i-mdi:tag-outline" />
          </button>
          <button class="mr-2 px-.5 info__btn">
            <i class="i-mdi:dots-horizontal-circle-outline" />
            <i class="text-base rotate-90 i-mdi:chevron-right" />
          </button>
          <button class="ml-auto px-.5 info__btn">
            <i class="i-mdi:search" />
          </button>
        </div>
      </div>

      <!-- file list -->
      <ApplicationFinderTable
        class="col-start-3 col-span-10 row-start-2 row-span-9"
      />
    </div>
  </ApplicationHocWrapper>
</template>

<style lang="scss" scoped>
.info {
  &__btn {
    @apply bg-transparent border-none rounded-lg h-full outline-none text-xl px-1 text-white/60;
    @apply flex items-center justify-center;
    @apply not-disabled:hover:bg-white/10;
    @apply disabled:text-white/15;
    @apply active:hover:bg-white/20;
  }
}
</style>
