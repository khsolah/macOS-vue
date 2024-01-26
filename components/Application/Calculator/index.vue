<script setup lang="ts"></script>

<template>
  <ApplicationHocWrapper :width="232" :height="288">
    <div class="h-72 text-white grid w-58 gap-1px grid-cols-4 grid-rows-6">
      <div
        class="font-thin px-2 col-span-4 row-span-1 select-none"
        un-flex="~ justify-end items-center"
        un-text="right 5xl"
      >
        0
      </div>

      <!-- row 2 -->
      <button class="calculator__button calculator__button--symbol">AC</button>
      <button class="calculator__button calculator__button--symbol">
        <i class="i-mdi:plus-minus-variant" />
      </button>
      <button class="calculator__button calculator__button--symbol">
        <i class="i-mdi:percent-outline" />
      </button>
      <button
        class="calculator__button calculator__button--symbol calculator__button--operator"
      >
        <i class="i-mdi:division" />
      </button>

      <!-- row 3 -->
      <button class="calculator__button calculator__button--number">7</button>
      <button class="calculator__button calculator__button--number">8</button>
      <button class="calculator__button calculator__button--number">9</button>
      <button
        class="calculator__button calculator__button--symbol calculator__button--operator"
      >
        <i class="i-mdi:close" />
      </button>

      <!-- row 4 -->
      <button class="calculator__button calculator__button--number">4</button>
      <button class="calculator__button calculator__button--number">5</button>
      <button class="calculator__button calculator__button--number">6</button>
      <button
        class="calculator__button calculator__button--symbol calculator__button--operator"
      >
        <i class="i-mdi:minus" />
      </button>

      <!-- row 5 -->
      <button class="calculator__button calculator__button--number">1</button>
      <button class="calculator__button calculator__button--number">2</button>
      <button class="calculator__button calculator__button--number">3</button>
      <button
        class="calculator__button calculator__button--symbol calculator__button--operator"
      >
        <i class="i-mdi:plus" />
      </button>

      <!-- row 6 -->
      <button class="col-span-2 calculator__button calculator__button--number">
        0
      </button>
      <button class="calculator__button calculator__button--number">.</button>
      <button
        class="calculator__button calculator__button--symbol calculator__button--operator"
      >
        <i class="i-mdi:equal" />
      </button>
    </div>
  </ApplicationHocWrapper>
</template>

<style lang="scss">
.calculator {
  &__button {
    @apply cursor-default relative;
    @apply flex justify-center items-center;
    @apply text-inherit text-2xl;
    @apply border-none outline-none;

    &--number {
      @apply bg-white/30 active:bg-white/50;
    }

    &--symbol {
      @apply bg-white/15 text-xl active:bg-white/30;
    }

    &--operator {
      @apply font-medium bg-amber-500 active:bg-amber-500/70;
    }
  }
}
</style>
