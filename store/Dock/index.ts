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
  active: boolean;
};
const APPLICATION_CONFIG = {
  [EApplication.FINDER]: {
    name: EApplication.FINDER,
    img: {
      src: '/icons/finder.svg',
      alt: 'Finder',
    },
    active: false,
    keep: true,
  },
  [EApplication.GITHUB]: {
    name: EApplication.GITHUB,
    img: {
      src: '/icons/github.svg',
      alt: 'Github',
    },
    href: 'https://github.com/khsolah/macOS-vue',
    active: false,
    keep: true,
  },
  [EApplication.SAFARI]: {
    name: EApplication.SAFARI,
    img: {
      src: '/icons/safari.svg',
      alt: 'Safari',
    },
    active: false,
    keep: true,
  },
  [EApplication.CALCULATOR]: {
    name: EApplication.CALCULATOR,
    img: {
      src: '/icons/calculator.webp',
      alt: 'Calculator',
    },
    active: false,
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
      Object.values(dock.value).filter(({ keep, active }) => active || keep)
        .length,
  );
  const keepSize = computed(
    () => Object.values(dock).filter(({ keep }) => keep).length,
  );

  const minimized = ref([]);

  const init = () => {
    for (const item of Object.values(dock.value)) {
      item.active = false;
    }

    dock.value[EApplication.GITHUB]!.active = true;
  };

  const add = (application: EApplication) => {
    if (dock.value[application]?.active) {
      return;
    }

    dock.value[application] = APPLICATION_CONFIG[application];
    dock.value[application]!.active = true;
  };
  const remove = (application: EApplication) => {
    const target = dock.value[application];
    if (!target) return;

    target.active = false;
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

    if (dock.value[name]!.active) {
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
