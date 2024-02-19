export default defineComponent((_props, { slots }) => () => (
  <ul class="dropdown__list" data-spec-el="dropdown-list">
    {slots.default?.()}
  </ul>
));
