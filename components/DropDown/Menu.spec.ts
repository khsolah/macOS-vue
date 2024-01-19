import DropDownMenu from './Menu.tsx';

describe('DropDownMenu', () => {
  test('render', () => {
    const wrapper = shallowMount(DropDownMenu, {
      slots: {
        default: 'default slot',
      },
    });

    expect(
      wrapper.find('[data-spec-el="dropdown-menu"]').exists(),
    ).toBeTruthy();
    expect(wrapper.text()).toContain('default slot');
  });
});
