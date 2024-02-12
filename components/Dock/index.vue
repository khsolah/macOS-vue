<script setup lang="ts">
import { useDockStore } from '~/store/Dock';

const dockStore = useDockStore();
const width = computed(
  () =>
    1 +
    0.5 +
    ((dockStore.size + 1 + dockStore.minimized.length) * 2.5 +
      (dockStore.size + dockStore.minimized.length) * 0.75),
  // padding + divider + ([keep app and minimized app] width + gap)
);
const transitionGroupDelay = ref('');
watch(
  () => width.value,
  (newValue, oldValue) =>
    (transitionGroupDelay.value = newValue > oldValue ? '' : 'delay-150'),
);
</script>

<template>
  <div class="dock__detect-area" />
  <ul
    class="dock"
    :class="[transitionGroupDelay]"
    :style="{ width: `${width}rem` }"
  >
    <transition-group name="fade">
      <li
        v-for="(app, index) in Object.values(dockStore.dock)"
        :key="app.name"
        class="dock__app"
        :class="{ 'dock__app--active': app.active }"
        :style="{ left: `${index * 3.25 + 0.5}rem` }"
        @click="dockStore.openApplication(app.name)"
      >
        <template v-if="app.href">
          <a :href="app.href" target="_blank">
            <img class="dock__app-icon" :src="app.img.src" :alt="app.img.alt" />
          </a>
        </template>
        <template v-else>
          <img class="dock__app-icon" :src="app.img.src" :alt="app.img.alt" />
        </template>
      </li>

      <div
        key="divider"
        class="bg-white/40 h-7/10 w-1px absolute"
        :style="{ left: `${dockStore.size * 3.25 + 0.5}rem` }"
      />

      <li
        key="trash"
        class="dock__app"
        :style="{ left: `${dockStore.size * 3.25 + 1}rem` }"
      >
        <img class="dock__app-icon" src="/icons/trash.webp" alt="Trash" />
      </li>
    </transition-group>
  </ul>
</template>

<style lang="scss" scoped>
$animation-timing-fn: cubic-bezier(0.55, 0, 0.1, 1);
@keyframes bounce {
  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(0, -40%);
  }
}

.dock {
  @apply m-auto h-16 text-white px-2 pb-1 z-1 translate-y-17;
  @apply right-0 bottom-1 left-0 fixed;
  @apply flex gap-3 justify-start items-center;
  @apply translate-y-0;
  @extend %blurred-bg;
  transition: width 1s $animation-timing-fn, transform 250ms ease-in-out;
  &::before {
    @apply rounded-xl;
    @extend %frame;
  }

  &__detect-area {
    @apply h-6 w-full right-0 bottom-0 left-0 fixed box-content;
    &:hover,
    &:has(+ .dock:hover) {
      @apply pt-10;
      & + .dock {
        @apply translate-y-0;
      }
    }
  }

  &__app {
    @apply cursor-pointer flex-shrink-0 h-10 w-10 absolute;

    &--active {
      &::before {
        @apply rounded-full m-auto bg-white/70 h-1 right-0 bottom--2.25 left-0 w-1 content-[''] absolute;
      }
      .dock__app-icon {
        animation: bounce 1s 0.25s $animation-timing-fn;
      }
    }
  }

  &__app-icon {
    @apply h-full w-full;
  }
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 1s $animation-timing-fn;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  width: 0;
  height: 0;
  transform: scale(0.01) translate(0%, 0);
  transform-origin: center center;
}
</style>
