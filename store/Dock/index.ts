import { defineStore } from 'pinia';
import { EApplication, useApplicationStore } from '../Application';

export type IDockApplication = {
  name: EApplication;
  img: {
    src: string;
    alt: string;
  };
  href?: string;
  keep: boolean;
  activeIds: string[];
};
const APPLICATION_CONFIG = {
  [EApplication.FINDER]: {
    name: EApplication.FINDER,
    img: {
      src: '/icons/finder.svg',
      alt: 'Finder',
    },
    activeIds: [],
    keep: true,
  },
  [EApplication.GITHUB]: {
    name: EApplication.GITHUB,
    img: {
      src: '/icons/github.svg',
      alt: 'Github',
    },
    href: 'https://github.com/khsolah/macOS-vue',
    activeIds: [],
    keep: true,
  },
  [EApplication.SAFARI]: {
    name: EApplication.SAFARI,
    img: {
      src: '/icons/safari.svg',
      alt: 'Safari',
    },
    activeIds: [],
    keep: true,
  },
  [EApplication.CALCULATOR]: {
    name: EApplication.CALCULATOR,
    img: {
      src: '/icons/calculator.webp',
      alt: 'Calculator',
    },
    activeIds: [],
    keep: true,
  },
};

export const useDockStore = defineStore('Dock', () => {
  const applicationStore = useApplicationStore();

  const dock = ref(
    useLocalStorage<{ [key in EApplication]?: IDockApplication }>(
      'Dock',
      {
        [EApplication.FINDER]: APPLICATION_CONFIG[EApplication.FINDER],
        [EApplication.GITHUB]: APPLICATION_CONFIG[EApplication.GITHUB],
        [EApplication.SAFARI]: APPLICATION_CONFIG[EApplication.SAFARI],
        [EApplication.CALCULATOR]: APPLICATION_CONFIG[EApplication.CALCULATOR],
      },
      {
        mergeDefaults: true,
      },
    ),
  );
  const size = computed(
    () =>
      Object.values(dock.value).filter(
        ({ keep, activeIds }) => activeIds.length || keep,
      ).length,
  );
  const keepSize = computed(
    () => Object.values(dock).filter(({ keep }) => keep).length,
  );

  const minimized = ref([]);

  const init = () => {
    for (const item of Object.values(dock.value)) {
      item.activeIds.length = 0;
    }

    dock.value[EApplication.GITHUB]?.activeIds.push('');
  };

  const add = (application: EApplication, id: string) => {
    if (dock.value[application]?.activeIds.length) {
      dock.value[application]?.activeIds.push(id);
      return;
    }

    dock.value[application] = APPLICATION_CONFIG[application];
    dock.value[application]!.activeIds = [id];
  };
  const remove = (application: EApplication) => {
    const target = dock.value[application];
    if (!target) return;

    target.activeIds.length = 0;
    if (!target.keep) delete dock.value[application];
  };

  const keepInDock = (name: EApplication) => {
    if (!dock.value[name]) return;

    dock.value[name]!.keep = true;
  };
  const removeFromDock = (name: EApplication) => {
    if (!dock.value[name]) return;

    dock.value[name]!.keep = false;
  };

  const openApplication = (name: EApplication) => {
    if (!dock.value[name]) throw new Error(`Application ${name} is not exist!`);

    if (dock.value[name]!.activeIds.length) {
      applicationStore.focus(name);
      return;
    }

    applicationStore.launch(name);
  };

  return {
    dock,
    size,
    keepSize,
    minimized,
    init,
    add,
    remove,
    keepInDock,
    removeFromDock,
    openApplication,
  };
});
