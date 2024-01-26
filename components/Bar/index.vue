<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core';
import { EDropDownMenuPosition, EDropDownTrigger } from '~/components/DropDown';

const datetime = useDateFormat(useNow(), 'ddd MMM DD h:mm A', {
  locales: 'en-US',
});
</script>

<template>
  <nav
    class="p-1 top-0 right-0 left-0 z-1 fixed nav"
    un-flex="~ justify-between items-center"
    un-text="white xs"
    un-before="bg-black/30 backdrop-blur-xl"
  >
    <ul class="z-1">
      <li>
        <DropDown
          :position="EDropDownMenuPosition.BOTTOM"
          :trigger="EDropDownTrigger.CLICK"
        >
          <button
            class="bg-transparent border-none rounded-bl-sm rounded-br-md rounded-tl-lg rounded-tr-md outline-none py-1 px-3 focus:bg-white/20"
          >
            <i class="h-4 text-white w-4 i-mdi-apple" />
          </button>
          <template #dropdown>
            <DropDownMenu class="w-55">
              <DropDownItem>About This Mac</DropDownItem>
              <DropDownItem divided disabled>System Settings...</DropDownItem>
              <DropDownItem>App Store...</DropDownItem>
              <DropDownItem divided>
                <DropDown
                  :position="EDropDownMenuPosition.RIGHT"
                  :trigger="EDropDownTrigger.HOVER"
                >
                  <div class="flex w-full justify-between items-center">
                    <span>Recent Items</span>
                    <i class="text-lg justify-self-end i-mdi:chevron-right" />
                  </div>
                  <template #dropdown>
                    <DropDownMenu class="w-45">
                      <DropDownItem class="my-1" disabled>
                        <span class="text-xs">Applications</span></DropDownItem
                      >
                      <DropDownItem>
                        <a
                          class="flex text-inherit w-full gap-1 decoration-none items-center"
                          href="https://github.com/khsolah/macOS-vue"
                          target="_blank"
                        >
                          <i class="text-base text-white/80 i-mdi:github" />
                          <span>Github</span></a
                        >
                      </DropDownItem>
                      <DropDownItem class="my-1" disabled divided>
                        <span class="text-xs">Documents</span></DropDownItem
                      >
                      <DropDownItem class="my-1" disabled divided>
                        <span class="text-xs">Servers</span></DropDownItem
                      >
                      <DropDownItem divided>Clear Menu</DropDownItem>
                    </DropDownMenu>
                  </template>
                </DropDown>
              </DropDownItem>
              <DropDownItem divided>
                <div class="flex w-full justify-between items-center">
                  <span>Force Quit</span>
                  <span class="text-xs text-white/25">
                    <i class="i-mdi:apple-keyboard-option" />
                    <i class="i-mdi:apple-keyboard-command" />
                    <i class="i-mdi:power" />
                  </span>
                </div>
              </DropDownItem>
              <DropDownItem divided>Sleep</DropDownItem>
              <DropDownItem>Restart...</DropDownItem>
              <DropDownItem>Shut Down...</DropDownItem>
              <DropDownItem divided>
                <div class="flex w-full justify-between items-center">
                  <span>Lock Screen</span>
                  <span class="text-xs text-white/25">
                    <i class="i-mdi:apple-keyboard-control" />
                    <i class="i-mdi:apple-keyboard-command" />
                    <span>Q</span>
                  </span>
                </div>
              </DropDownItem>
              <DropDownItem>
                <div class="flex w-full justify-between items-center">
                  <span>Lot Out</span>
                  <span class="text-xs text-white/25">
                    <i class="i-mdi:apple-keyboard-shift" />
                    <i class="i-mdi:apple-keyboard-command" />
                    <span>Q</span>
                  </span>
                </div>
              </DropDownItem>
            </DropDownMenu>
          </template>
        </DropDown>
      </li>
    </ul>

    <ul class="flex z-1">
      <li>
        <p>{{ datetime }}</p>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  @extend %blurred-bg;
}
</style>
