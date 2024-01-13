import { useCounterStore } from './index';

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('increament', () => {
    const counterStore = useCounterStore();
    expect(counterStore.count).toBe(0);
    counterStore.increament();
    expect(counterStore.count).toBe(1);
  });

  test('decreament', () => {
    const counterStore = useCounterStore();
    expect(counterStore.count).toBe(0);
    counterStore.decreament();
    expect(counterStore.count).toBe(-1);
  });
});
