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

  const focus = (id: string) => {
    if (!applications.value[id] || focusing.value === id) return;

    applications.value[id].zIndex = ++zIndex.value;
    focusing.value = id;
  };

  const launch = (name: EApplication) => {
    const id = (focusing.value = generateId());
    applications.value[id] = {
      name,
      id,
      component: shallowRef(COMPONENT[name]),
      zIndex: ++zIndex.value,
    };
    dockStore.add(name, id);
  };

  const shutdown = (id: string) => {
    if (!applications.value[id])
      throw new Error(`Application not found. (id: ${id})`);

    const name = applications.value[id].name;
    for (const activeId of dockStore.dock[name]!.activeIds)
      delete applications.value[activeId];
    dockStore.remove(name);
  };

  return {
    applications,
    focus,
    launch,
    shutdown,
  };
});
