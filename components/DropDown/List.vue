<script setup lang="ts">
import type { TDropDownList } from './types';

const props = defineProps<{
  list: TDropDownList;
  isSubList?: boolean;
  handleClick?: (event: MouseEvent) => void;
  handleMouseEnter?: (event: MouseEvent) => void;
}>();
const hasShortcuts = computed(() =>
  props.list.item.some((item) => !!item.shortcuts),
);
</script>

<template>
  <DropDown :position="props.list.position" :trigger="props.list.trigger">
    <slot name="btn" :list="props.list" :is-sub-list="props.isSubList" />

    <template #dropdown>
      <DropDownMenu>
        <DropDownItem
          v-for="item in props.list.item"
          :key="item.name"
          :divided="item.divided"
          :disabled="item.disabled"
        >
          <slot :name="item.name" :item="item">
            <template v-if="item.subList">
              <DropDownList :list="item.subList" :is-sub-list="true">
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
              </DropDownList>
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
      </DropDownMenu>
    </template>
  </DropDown>
</template>
