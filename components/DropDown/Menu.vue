<script setup lang="ts">
import type { TDropDownMenu } from './types';

const props = defineProps<{
  menu: TDropDownMenu;
  isSubMenu?: boolean;
}>();
const hasShortcuts = computed(() =>
  props.menu.item.some((item) => !!item.shortcuts),
);
</script>

<template>
  <DropDown :position="props.menu.position" :trigger="props.menu.trigger">
    <slot name="btn" :menu="props.menu" :is-sub-menu="props.isSubMenu" />

    <template #dropdown>
      <DropDownList>
        <DropDownItem
          v-for="item in props.menu.item"
          :key="item.name"
          :divided="item.divided"
          :disabled="item.disabled"
        >
          <slot :name="item.name" :item="item">
            <template v-if="item.subMenu">
              <DropDownMenu :menu="item.subMenu" :is-sub-menu="true">
                <template #btn>
                  <div class="w-full flex items-center">
                    <i
                      v-if="item.prefix"
                      class="text-xs font-bold"
                      :class="[
                        item.prefix.icon,
                        { 'opacity-0': !item.prefix.show },
                      ]"
                    />
                    <span>{{ item.label }}</span>
                    <i
                      class="text-lg ml-auto translate-x-1 i-mdi:chevron-right"
                    />
                  </div>
                </template>
              </DropDownMenu>
            </template>

            <template v-else>
              <div class="flex items-center justify-start">
                <slot :name="`${item.name}-prefix`" :item="item">
                  <i
                    v-if="item.prefix"
                    class="text-xs font-bold"
                    :class="[
                      item.prefix.icon,
                      { 'opacity-0': !item.prefix.show },
                    ]"
                  />
                </slot>
                <span class="mr-1 whitespace-nowrap">{{ item.label }}</span>
              </div>
              <div
                v-if="hasShortcuts"
                class="flex text-xs ml-12 text-white/25 items-center gap-1"
              >
                <DropDownShortcuts
                  v-if="item.shortcuts"
                  :shortcuts="item.shortcuts"
                />
              </div>
            </template>
          </slot>
        </DropDownItem>
      </DropDownList>
    </template>
  </DropDown>
</template>
