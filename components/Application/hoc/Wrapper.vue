<script setup lang="ts">
import type { EApplicationName } from '~/store/Application';

const props = defineProps<{
  name?: EApplicationName;
  title?: string;
  width?: number;
  height?: number;
  nav?: Record<'close' | 'minimize' | 'fullscreen', { disabled: boolean }>;
}>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();

const app = ref<HTMLElement>();
const { style } = useDraggable(app, {
  initialValue: () => {
    if (process.server)
      return {
        x: 0,
        y: 0,
      };

    const windowSize = useWindowSize();
    return {
      x: (windowSize.width.value - (props.width ?? 0)) / 2,
      y: (windowSize.height.value - (props.height ?? 0)) / 2,
    };
  },
});

const close = () => {
  emit('close');
};
const minimize = () => {};
const toggleFullScreen = () => {};
</script>

<template>
  <div ref="app" class="app" :style="[style]">
    <!-- nav -->
    <div class="px-3 py-2 relative flex">
      <div
        class="flex flex-shrink-0 text-transparent gap-1.5 hover:text-black/60"
      >
        <button
          class="app-nav__button bg-red-500"
          :disabled="nav?.close.disabled"
          @click="close"
        >
          <i class="i-mdi:close" />
        </button>
        <button
          class="app-nav__button bg-yellow-500"
          :disabled="nav?.minimize?.disabled"
          @click="minimize"
        >
          <i class="i-mdi:minus" />
        </button>
        <button
          class="app-nav__button bg-green-500"
          :disabled="nav?.fullscreen?.disabled"
          @click="toggleFullScreen"
        >
          T
        </button>
      </div>

      <!-- title -->
      <span>{{ props.title }}</span>
    </div>

    <!-- body -->
    <div class="relative z-1 rounded-md overflow-hidden">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  @apply w-min h-min relative z-1 p-0.5;
  @extend %blurred-bg;
  &::before {
    @apply rounded-xl;
    @extend %frame;
  }
}
.app-nav__button {
  @apply border-none rounded-full h-3 w-3 flex items-center justify-center text-inherit;
}
</style>
