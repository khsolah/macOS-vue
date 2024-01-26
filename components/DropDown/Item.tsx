export default defineComponent({
  setup(_props, { attrs: { disabled, divided, ...otherAttrs }, slots }) {
    const itemClassName = computed(() =>
      divided === undefined
        ? 'dropdown__item'
        : 'dropdown__item dropdown__item--divided',
    );

    return () => (
      <li
        class={itemClassName.value}
        data-spec-el="dropdown-item"
        aria-disabled={!!disabled || disabled === ''}
        {...otherAttrs}
      >
        {slots.default?.()}
      </li>
    );
  },
});
