import { createTestingPinia } from '@pinia/testing';
import Store from './CounterStore.vue';
import { useCounterStore } from '~/store/Counter';

type Context = {
  wrapper: ReturnType<typeof shallowMount>;
  counterStore: ReturnType<typeof useCounterStore>;
};

const init = (): Context => {
  const wrapper = shallowMount(Store, {
    global: {
      plugins: [createTestingPinia()],
    },
  });
  const counterStore = useCounterStore();
  return { wrapper, counterStore };
};

describe('pages/store.vue', () => {
  beforeEach<Context>((context) => {
    const { wrapper, counterStore } = init();
    context.wrapper = wrapper;
    context.counterStore = counterStore;
  });

  test<Context>('increament', async ({ wrapper, counterStore }) => {
    await wrapper.find('[data-el="increament-btn"]').trigger('click');
    expect(counterStore.increament).toHaveBeenCalledTimes(1);
  });

  test<Context>('decreament', async ({ wrapper, counterStore }) => {
    await wrapper.find('[data-el="decreament-btn"]').trigger('click');
    expect(counterStore.decreament).toHaveBeenCalledTimes(1);
  });
});
