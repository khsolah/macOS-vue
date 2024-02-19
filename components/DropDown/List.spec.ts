import DropDownList from './List.jsx';

describe('DropDownList', () => {
  test('render', () => {
    const wrapper = shallowMount(DropDownList, {
      slots: {
        default: 'default slot',
      },
    });

    expect(
      wrapper.find('[data-spec-el="dropdown-list"]').exists(),
    ).toBeTruthy();
    expect(wrapper.text()).toContain('default slot');
  });
});
