import DropDownItem from './Item.tsx';

describe('DropDownItem', () => {
  test('render', () => {
    const wrapper = shallowMount(DropDownItem, {
      slots: {
        default: 'default slot',
      },
    });

    expect(
      wrapper.find('[data-spec-el="dropdown-item"]').exists(),
    ).toBeTruthy();
    expect(wrapper.text()).toContain('default slot');
  });

  test('disabled', () => {
    const wrapper = shallowMount(DropDownItem, {
      attrs: { disabled: '' },
    });

    expect(
      wrapper
        .find('[data-spec-el="dropdown-item"]')
        .attributes('aria-disabled'),
    ).toBe('true');
  });

  test('divided', () => {
    const wrapper = shallowMount(DropDownItem, {
      attrs: { divided: '' },
    });

    expect(wrapper.find('[data-spec-el="dropdown-item"]').classes()).toContain(
      'dropdown__item--divided',
    );
  });
});
