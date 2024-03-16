<script setup lang="ts">
const head = ['Name', 'Date Modified', 'Size', 'Kind'];
</script>

<template>
  <thead class="h-7">
    <tr un-border="b b-solid b-white/10">
      <th v-for="name in head" :key="name" class="table__head">
        {{ name }}
      </th>
    </tr>
  </thead>
</template>

<style scoped lang="scss">
.table {
  &__head {
    @apply text-xs text-left px-2 text-white/50 relative;
    @apply first:pl-10;
    @apply resize overflow-hidden appearance-none;
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
    &::before {
      @apply bg-white/10 top-1.5 right-0 bottom-1.5 w-1px content-[''] absolute;
    }
  }
}
</style>
