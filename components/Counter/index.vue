<script setup lang="ts">
const count = ref(0);
const increament = () => ++count.value;
const decreament = () => --count.value;
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <button data-el="increament-btn" @click="increament">+</button>
    <button data-el="decreament-btn" @click="decreament">-</button>
  </div>
</template>
