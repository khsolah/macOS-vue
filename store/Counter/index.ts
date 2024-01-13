import { defineStore } from 'pinia';

export const useCounterStore = defineStore('count', () => {
  const count = ref(0);
  const increament = () => ++count.value;
  const decreament = () => --count.value;

  return {
    count,
    increament,
    decreament,
  };
});
