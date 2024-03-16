<script setup lang="ts"></script>

<template>
  <div class="bg-[rgb(43,33,30)] overflow-auto">
    <div class="finder-table">
      <div class="finder-table__head">
        <div class="h-7 finder-table__row items-center">
          <div class="finder-table__item">Name</div>
          <div class="finder-table__item">Date</div>
          <div class="finder-table__item">Size</div>
          <div class="finder-table__item">Kind</div>
        </div>
      </div>

      <div class="finder-table__body">
        <ApplicationFinderTableRow />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.finder-table {
  .finder-table__row {
    @apply flex items-center;
    @apply border-solid border-0 border-b-1px border-b-white/10;
    @apply outline-none;
  }

  .finder-table__item {
    @apply h-5 text-xs px-2 text-white/75 relative flex items-center;
    @apply text-xs text-left px-2 text-white/50 relative;
    @apply first:pl-10;
    @apply outline-none resize overflow-hidden;
    @apply border-solid border-0 border-r-1px border-r-white/10;
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
  }

  &__body {
    @apply mt-1;
    background: repeat
      linear-gradient(
        180deg,
        transparent 0,
        transparent 20px,
        rgb(52, 43, 41) 20px,
        rgb(52, 43, 41) 40px
      )
      top / 100% 40px;
  }
}
</style>
