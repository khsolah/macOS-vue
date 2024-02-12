<script setup lang="ts">
import { useApplicationStore } from '~/store/Application';

const applicationStore = useApplicationStore();

type TNavOption = {
  disabled: boolean;
};
const props = defineProps<{
  id: string;
  title?: string;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  zIndex: number;
  nav?: {
    close?: TNavOption;
    minimize?: TNavOption;
    fullscreen?: TNavOption;
  };
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
      x: props.left ?? (windowSize.width.value - (props.width ?? 0)) / 2,
      y: props.top ?? (windowSize.height.value - (props.height ?? 0)) / 2,
    };
  },
});

const zIndex = ref(props.zIndex);
const close = () => {
  emit('close');
  applicationStore.shutdown(props.id);
};
const minimize = () => {};
const toggleFullScreen = () => {};
const handleFocus = () => {
  zIndex.value = applicationStore.focus(props.id);
};
const isFocusing = computed(() => applicationStore.focusing === props.id);
</script>

<template>
  <div
    ref="app"
    class="app"
    :style="[style, `z-index:${zIndex}`]"
    @mousedown="handleFocus"
  >
    <!-- buttons -->
    <div class="flex h-7 p-2 top-0.5 absolute items-center">
      <div class="app-nav__button-group">
        <button
          class="app-nav__button"
          :class="{ 'bg-red-500': isFocusing, 'bg-white/25': !isFocusing }"
          :disabled="props.nav?.close?.disabled"
          @click="close"
        >
          <i class="i-mdi:close" />
        </button>
        <button
          class="app-nav__button"
          :class="{ 'bg-yellow-500': isFocusing, 'bg-white/25': !isFocusing }"
          :disabled="props.nav?.minimize?.disabled"
          @click="minimize"
        >
          <i class="i-mdi:minus" />
        </button>
        <button
          class="app-nav__button"
          :class="{ 'bg-green-500': isFocusing, 'bg-white/25': !isFocusing }"
          :disabled="props.nav?.fullscreen?.disabled"
          @click="toggleFullScreen"
        >
          T
        </button>
      </div>
    </div>

    <!-- body -->
    <div class="rounded-b-xl z-1 overflow-hidden">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.app {
  @apply h-min w-min p-0.5 z-1 fixed overflow-hidden rounded-xl;
  @extend %blurred-bg;
  &::before {
    @apply rounded-xl;
    @extend %frame;
  }
}
.app-nav__button-group {
  @apply flex flex-shrink-0 text-transparent gap-1.5;
  &:hover {
    > :not(:disabled) {
      @apply text-black/60;
    }
  }
}
.app-nav__button {
  @apply border-none rounded-full flex h-3 text-inherit w-3 items-center justify-center;
  @apply disabled:bg-white/25;
}
</style>
