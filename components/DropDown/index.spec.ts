import DropDown, { EDropDownTrigger } from './index.tsx';

describe('DropDown', () => {
  test('render', () => {
    const wrapper = shallowMount(DropDown, {
      slots: {
        default: '<div data-spec-el="defaultSlot">Default Slot</div>',
        dropdown: '<div data-spec-el="dropdownSlot">DropDown Slot</div>',
      },
    });

    expect(wrapper.find('[data-spec-el="dropdown"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-spec-el="defaultSlot"]').exists()).toBeTruthy();
  });

  test('hover', async () => {
    const wrapper = shallowMount(DropDown, {
      props: {
        trigger: EDropDownTrigger.HOVER,
      },
    });
    const dropdown = wrapper.find('[data-spec-el="dropdown"]');
    const slotsDropdown = wrapper.find('[data-spec-el="slots-dropdown"]');

    expect(slotsDropdown.classes()).toContain('hidden');

    await dropdown.trigger('pointerenter');
    expect(slotsDropdown.classes()).not.toContain('hidden');

    await dropdown.trigger('pointerleave');
    expect(slotsDropdown.classes()).toContain('hidden');
  });

  test('click', async () => {
    const wrapper = shallowMount(DropDown, {
      slots: {
        default: '<div class="default">Default</div>',
        dropdown: '<div class="dropdown__item">drop down</div>',
      },
    });
    const slotsDefault = wrapper.find('[data-spec-el="slots-default"]');
    const slotsDropdown = wrapper.find('[data-spec-el="slots-dropdown"]');
    const dropdownItem = wrapper.find('.dropdown__item');
    expect(slotsDropdown.classes()).toContain('hidden');

    await slotsDefault.trigger('click');
    expect(slotsDropdown.classes()).not.toContain('hidden');

    await dropdownItem.trigger('click');
    expect(slotsDropdown.classes()).toContain('hidden');

    dropdownItem.element.setAttribute('aria-disabled', 'true');
    await slotsDefault.trigger('click');
    await dropdownItem.trigger('click');
    expect(slotsDropdown.classes()).not.toContain('hidden');
  });
});
