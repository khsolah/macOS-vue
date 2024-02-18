import type { TDropDownList } from '../../DropDown/types';
import { useMenuBarStore } from '~/store/MenuBar';

export default (Component: ReturnType<typeof defineComponent>) =>
  defineComponent({
    setup(_props, { slots }) {
      const menuBarStore = useMenuBarStore();

      return () =>
        h(Component, null, {
          btn: ({
            list,
            isSubList,
          }: {
            list: TDropDownList;
            isSubList: boolean;
          }) =>
            isSubList ? (
              <div class="w-full flex items-center">
                <span>{list.label}</span>
                <i class="text-lg ml-auto translate-x-1 i-mdi:chevron-right" />
              </div>
            ) : (
              <button
                class="menubar__btn"
                onClick={menuBarStore.handleClick}
                onMouseenter={menuBarStore.handleMouseEnter}
              >
                <span>{list.label}</span>
              </button>
            ),
          ...slots,
        });
    },
  });
