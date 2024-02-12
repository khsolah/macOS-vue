import { defineStore } from 'pinia';
import { useDockStore } from '~/store/Dock';

export enum EApplication {
  FINDER = 'FINDER',
  SAFARI = 'SAFARI',
  GITHUB = 'GITHUB',
  CALCULATOR = 'CALCULATOR',
}
const COMPONENT = {
  [EApplication.CALCULATOR]: defineAsyncComponent(
    () => import('~/components/Application/Calculator/index.vue'),
  ),
  [EApplication.SAFARI]: null,
  [EApplication.GITHUB]: null,
  [EApplication.FINDER]: null,
};

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

export const useApplicationStore = defineStore('Application', () => {
  const dockStore = useDockStore();
  const zIndex = ref(0);
  const focusing = ref('');
  const applications = ref<
    Record<
      string,
      {
        component: ReturnType<typeof defineAsyncComponent>;
        id: string;
        name: EApplication;
        zIndex: number;
      }
    >
  >({});

  const focus = (id: string): number => {
    if (focusing.value === id) return zIndex.value;

    focusing.value = id;
    ++zIndex.value;
    if (!applications.value[id]) return zIndex.value;

    return (applications.value[id].zIndex = zIndex.value);
  };

  const launch = (name: EApplication) => {
    const id = (focusing.value = generateId());
    applications.value[id] = {
      name,
      id,
      component: shallowRef(COMPONENT[name]),
      zIndex: ++zIndex.value,
    };
    dockStore.add(name);
  };

  const shutdown = (id: string) => {
    if (!applications.value[id]) return;

    dockStore.remove(applications.value[id].name);
    delete applications.value[id];
  };

  return {
    applications,
    focusing,
    focus,
    launch,
    shutdown,
  };
});
