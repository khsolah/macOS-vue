export const useMenuBarStore = defineStore('MenuBar', () => {
  const activeEl = ref<HTMLElement | null>(null);
  const handleClick = (event: MouseEvent) => {
    if (activeEl.value !== event.currentTarget) {
      activeEl.value = event.currentTarget as HTMLElement;
      activeEl.value.focus();
    } else handleBlur();
  };
  const handleMouseEnter = (event: MouseEvent) => {
    if (!activeEl.value || activeEl.value === event.currentTarget) return;

    (event.currentTarget as HTMLElement).click();
  };
  const handleBlur = () => {
    activeEl.value?.blur();
    activeEl.value = null;
  };

  return {
    activeEl,
    handleClick,
    handleMouseEnter,
    handleBlur,
  };
});
