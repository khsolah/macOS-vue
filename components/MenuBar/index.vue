<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core';
import MenuBarHocDropDownList from '~/components/MenuBar/Hoc/DropDownList';
import DropDownList from '~/components/DropDown/List.vue';
import {
  EShortcutIcon,
  EDropDownMenuPosition,
  EDropDownTrigger,
  type TDropDownList,
} from '~/components/DropDown/types';
import { useMenuBarStore } from '~/store/MenuBar';

const List = MenuBarHocDropDownList(DropDownList);

const datetime = useDateFormat(useNow(), 'ddd MMM DD h:mm A', {
  locales: 'en-US',
});

const menuBarStore = useMenuBarStore();
const listEl = ref<HTMLUListElement>();
onClickOutside(listEl, () => {
  menuBarStore.handleBlur();
});

const recentItems = {
  label: 'Recent Items',
  name: 'RecentItems',
  position: EDropDownMenuPosition.RIGHT,
  trigger: EDropDownTrigger.HOVER,
  item: [
    { name: 'Applications', label: 'Applications', disabled: true },
    { name: 'Github', label: 'Github' },
    { name: 'Documents', label: 'Documents', divided: true, disabled: true },
    { name: 'Servers', label: 'Servers', divided: true, disabled: true },
    { name: 'ClearMenu', label: 'Clear Menu', divided: true },
  ],
};
const appleList: TDropDownList = {
  label: '',
  name: 'Apple',
  item: [
    { name: 'AboutThisMac', label: 'About This Mac' },
    { name: 'SystemSettings', label: 'System Settings...', divided: true },
    { name: 'AppStore', label: 'App Store...' },
    {
      name: 'RecentItems',
      label: 'Recent Items',
      divided: true,
      subList: recentItems,
    },
    {
      name: 'ForceQuit',
      label: 'Force Quit',
      divided: true,
      shortcuts: [
        EShortcutIcon.OPTION,
        EShortcutIcon.COMMAND,
        EShortcutIcon.POWER,
      ],
    },
    { name: 'Sleep', label: 'Sleep', divided: true },
    { name: 'Restart', label: 'Restart...' },
    { name: 'ShutDown', label: 'Shut Down...' },
    {
      name: 'LockScreen',
      label: 'Lock Screen',
      divided: true,
      shortcuts: [EShortcutIcon.CONTROL, EShortcutIcon.COMMAND, 'Q'],
    },
    {
      name: 'LogOut',
      label: 'Log Out',
      shortcuts: [EShortcutIcon.SHIFT, EShortcutIcon.COMMAND, 'Q'],
    },
  ],
};
</script>

<template>
  <nav
    class="p-1 top-0 right-0 left-0 z-1 fixed nav"
    un-flex="~ justify-between items-center"
    un-text="white xs"
    un-before="bg-black/30 backdrop-blur-xl"
  >
    <ul
      ref="listEl"
      class="flex pl-1 z-1 items-center"
      @click="menuBarStore.handleBlur"
    >
      <li>
        <List :list="appleList">
          <template #btn>
            <button
              class="menubar__btn"
              un-before="!right--1 !left--1"
              un-before-rounded="!bl-sm !br-md !tl-lg !tr-md"
              @click="menuBarStore.handleClick"
              @mouseenter="menuBarStore.handleMouseEnter"
            >
              <i class="text-white w-4 h-4 i-mdi-apple" />
            </button>
          </template>

          <template #RecentItems>
            <List :list="recentItems" :is-sub-list="true">
              <template #Applications>
                <span class="text-xs mb-1">Applications</span>
              </template>
              <template #Github>
                <a
                  href="https://github.com/khsolah/macOS-vue"
                  target="_blank"
                  class="flex text-inherit w-full gap-1 decoration-none items-center"
                >
                  <i class="text-base text-white/80 i-mdi:github" />
                  <span>Github</span></a
                >
              </template>
              <template #Documents>
                <span class="text-xs">Documents</span>
              </template>
              <template #Servers>
                <span class="text-xs">Servers</span>
              </template>
            </List>
          </template>
        </List>
      </li>
    </ul>

    <ul class="flex z-1">
      <li>
        <p>{{ datetime }}</p>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.menubar {
  @extend %blurred-bg;

  &__btn {
    @apply bg-transparent border-none outline-none text-white w-full py-1 px-3 relative;
    @apply flex items-center justify-between;
    @apply focus:before:bg-white/20;
    &::before {
      @apply top-0 right--2 bottom-0 left--2 content-[''] absolute focus:bg-white/20;
      @apply rounded-md;
    }
  }
}
</style>
