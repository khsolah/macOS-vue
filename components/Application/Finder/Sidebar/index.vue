<template>
  <div class="px-2 col-span-2 row-start-2 row-span-9 overflow-auto">
    <ul class="sidebar__group">
      <div class="sidebar__title">Favorites</div>
      <li class="sidebar__item">
        <div class="sidebar__icon home-folder" />
        <span>Home</span>
      </li>
      <li class="sidebar__item">
        <div class="sidebar__icon air-drop" />
        <span>AirDrop</span>
      </li>
      <li class="sidebar__item">
        <div class="sidebar__icon recent-items" />
        <span>Recents</span>
      </li>
      <li class="sidebar__item">
        <div class="sidebar__icon applications-folder" />
        <span>Applications</span>
      </li>
      <li class="sidebar__item">
        <div class="sidebar__icon desktop-folder" />
        <span>Desktop</span>
      </li>
      <li class="sidebar__item">
        <div class="sidebar__icon generic-file" />
        <span>Documents</span>
      </li>
      <li class="sidebar__item">
        <div class="sidebar__icon downloads-folder" />
        <span>Downloads</span>
      </li>
    </ul>
    <ul class="sidebar__group">
      <div class="sidebar__title">iCloud</div>
      <li class="sidebar__item">
        <div class="sidebar__icon icloud" />
        <span>iCloud Drive</span>
      </li>
      <li class="sidebar__item">
        <div class="sidebar__icon generic-folder" />
        <span>Shared</span>
      </li>
    </ul>
    <ul class="sidebar__group">
      <div class="sidebar__title">Tags</div>
      <li class="sidebar__item">
        <i class="text-red-500 i-mdi:circle" />
        <span>Red</span>
      </li>
      <li class="sidebar__item">
        <i class="text-orange-500 i-mdi:circle" />
        <span>Orange</span>
      </li>
      <li class="sidebar__item">
        <i class="text-yellow-500 i-mdi:circle" />
        <span>Yellow</span>
      </li>
      <li class="sidebar__item">
        <i class="text-green-500 i-mdi:circle" />
        <span>Green</span>
      </li>
      <li class="sidebar__item">
        <i class="text-blue-500 i-mdi:circle" />
        <span>Blue</span>
      </li>
      <li class="sidebar__item">
        <i class="text-purple-500 i-mdi:circle" />
        <span>Purple</span>
      </li>
      <li class="sidebar__item">
        <i class="text-gray-500 i-mdi:circle" />
        <span>Gray</span>
      </li>
      <li class="sidebar__item">
        <i class="text-gray-500 rotate-180 i-mdi:circle-multiple-outline" />
        <span>All Tags...</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  &__group {
    @apply mb-3;
    &:nth-of-type(2) .sidebar__icon {
      @apply bg-[rgb(96,215,240)];
    }
  }
  &__title {
    @apply font-bold text-xs px-2 text-white/25;
  }
  &__icon {
    @apply bg-[rgb(42,150,255)] h-4 w-4;
    mask-size: cover;
    $icon-list: air-drop, applications-folder, desktop-folder, downloads-folder,
      generic-file, generic-folder, home-folder, icloud, recent-items;
    @each $icon in $icon-list {
      &.#{$icon} {
        mask-image: url('/icons/sidebar-#{$icon}.png');
      }
    }
  }
  &__item {
    @apply flex gap-1 items-center;
    @apply text-sm text-white py-1 px-2;
    @apply rounded-md cursor-default;
    &--active {
      @apply bg-white/25;
    }
  }
}
</style>
