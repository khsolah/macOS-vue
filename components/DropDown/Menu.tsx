export default defineComponent((_props, { slots }) => () => (
  <ul class="dropdown__menu" data-spec-el="dropdown-menu">
    {slots.default?.()}
  </ul>
));
