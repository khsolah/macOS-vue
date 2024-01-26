import './index.scss';

export enum EDropDownMenuPosition {
  TOP = 'top',
  LEFT = 'left',
  RIGHT = 'right',
  BOTTOM = 'bottom',
}

export enum EDropDownTrigger {
  CLICK = 'click',
  HOVER = 'hover',
}

export default defineComponent({
  props: {
    position: {
      default: EDropDownMenuPosition.BOTTOM,
      type: String as PropType<EDropDownMenuPosition>,
    },
    trigger: {
      default: EDropDownTrigger.CLICK,
      type: String as PropType<EDropDownTrigger>,
    },
  },
  setup(props, { slots }) {
    const wrapper = ref<HTMLDivElement>();
    onClickOutside(wrapper, () => {
      show.value = false;
    });

    const show = ref(false);
    const dropdownClass = computed(
      () =>
        `dropdown__wrapper dropdown__wrapper--${props.position} ${
          show.value ? '' : 'hidden'
        }`,
    );
    const handleToggleDropDown = (event: MouseEvent) => {
      event.stopPropagation();
      if (props.trigger === EDropDownTrigger.HOVER) return;

      show.value = !show.value;
    };
    const handleClick = (event: MouseEvent) => {
      if (props.trigger === EDropDownTrigger.HOVER) show.value = true;
      const target = (event.target as HTMLElement).closest('.dropdown__item');
      if (target?.getAttribute('aria-disabled') !== 'true') {
        show.value = false;
      }
    };
    const handlePointerEnter = (_event: MouseEvent) => {
      if (props.trigger === EDropDownTrigger.CLICK) return;

      show.value = true;
    };
    const handlePointerLeave = (_event: MouseEvent) => {
      if (props.trigger === EDropDownTrigger.CLICK) return;

      show.value = false;
    };

    return () => (
      <div
        class="dropdown"
        ref={wrapper}
        data-spec-el="dropdown"
        onClick={handleClick}
        onPointerenter={handlePointerEnter}
        onPointerleave={handlePointerLeave}
      >
        <div onClick={handleToggleDropDown} data-spec-el="slots-default">
          {slots.default?.()}
        </div>
        <div class={dropdownClass.value} data-spec-el="slots-dropdown">
          {slots.dropdown?.()}
        </div>
      </div>
    );
  },
});
