<script setup lang="ts">
import { useCounterStore } from '~/store/Counter';

const counterStore = useCounterStore();
const { increament, decreament } = counterStore;
</script>

<template>
  <div>
    <p>{{ counterStore.count }}</p>
    <button data-el="increament-btn" @click="increament">+</button>
    <button data-el="decreament-btn" @click="decreament">-</button>
  </div>
</template>
~/store ~/store/Counter
