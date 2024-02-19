import type { TDropDownMenu } from '~/components/DropDown/types';
import DropDownMenu from '~/components/DropDown/Menu.vue';
import { useMenuBarStore } from '~/store/MenuBar';

export default defineComponent({
  setup(_props, { slots }) {
    const menuBarStore = useMenuBarStore();

    return () =>
      h(DropDownMenu, null, {
        btn: ({
          menu,
          isSubMenu,
        }: {
          menu: TDropDownMenu;
          isSubMenu: boolean;
        }) =>
          isSubMenu ? (
            <div class="w-full flex items-center">
              <span>{menu.label}</span>
              <i class="text-lg ml-auto translate-x-1 i-mdi:chevron-right" />
            </div>
          ) : (
            <button
              class="menubar__btn"
              onClick={menuBarStore.handleClick}
              onMouseenter={menuBarStore.handleMouseEnter}
            >
              <span>{menu.label}</span>
            </button>
          ),
        ...slots,
      });
  },
});
