import Index from './index.vue';

describe('pages/index.vue', () => {
  test('mount', () => {
    const wrapper = shallowMount(Index);
    expect(wrapper.text()).toMatch('0');
  });

  test('increament', async () => {
    const wrapper = shallowMount(Index);
    await wrapper.find('[data-el="increament-btn"]').trigger('click');
    expect(wrapper.find('p').text()).toBe('1');
  });

  test('decreament', async () => {
    const wrapper = shallowMount(Index);
    await wrapper.find('[data-el="decreament-btn"]').trigger('click');
    expect(wrapper.find('p').text()).toBe('-1');
  });
});
