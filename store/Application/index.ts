import { defineStore } from 'pinia';

export enum EApplicationName {
  CALCULATOR = 'CALCULATOR',
}

export const useApplicationStore = defineStore('Application', () => {
  const applications = ref<
    {
      component: ReturnType<typeof defineAsyncComponent>;
      id: string;
      name: EApplicationName;
    }[]
  >([]);

  const launch = (name: EApplicationName) => {
    switch (name) {
      case EApplicationName.CALCULATOR:
        applications.value.push({
          name,
          id: (() =>
            Date.now().toString(36) +
            Math.random().toString(36).substring(2))(),
          component: shallowRef(
            defineAsyncComponent(
              () => import('~/components/Application/Calculator/index.vue'),
            ),
          ),
        });
        break;
      default:
        throw new Error(`No such application exist: ${name}`);
    }
  };

  const shutdown = (id: string) => {
    const index = applications.value.findIndex(
      (application) => application.id === id,
    );
    if (index === -1) throw new Error(`Application not found. (id: ${id})`);
    applications.value.splice(index, 1);
  };

  return {
    applications,
    launch,
    shutdown,
  };
});
