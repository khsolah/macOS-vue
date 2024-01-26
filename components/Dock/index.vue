<script setup lang="ts"></script>

<template>
  <div class="doc__detect-area" />
  <div class="doc">
    <div class="doc__app">
      <img src="~/assets/icons/finder.svg" alt="Finder" class="doc__app-icon" />
    </div>
    <div class="doc__app">
      <img src="~/assets/icons/safari.svg" alt="Safari" class="doc__app-icon" />
    </div>
    <div class="doc__app doc__app--active">
      <a href="https://github.com/khsolah/macOS-vue" target="_blank">
        <img
          src="~/assets/icons/github.svg"
          alt="Github"
          class="doc__app-icon"
        />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.doc {
  @apply m-auto h-15 text-white w-min p-2 z-1 translate-y-16;
  @apply right-0 bottom-1 left-0 fixed;
  @apply flex gap-3 justify-center items-center;
  @apply transition-transform duration-300;
  @extend %blurred-bg;
  &::before {
    @apply rounded-xl;
    @extend %frame;
  }

  &__detect-area {
    @apply h-6 w-full right-0 bottom-0 left-0 fixed box-content;
    &:hover,
    &:has(+ .doc:hover) {
      @apply pt-10;
      & + .doc {
        @apply translate-y-0;
      }
    }
  }

  &__app {
    @apply cursor-pointer relative;

    &--active::before {
      @apply bg-white rounded-full m-auto h-1 right-0 bottom--1 left-0 w-1 content-[''] absolute;
    }
  }

  &__app-icon {
    @apply h-10 w-10;
  }
}
</style>
