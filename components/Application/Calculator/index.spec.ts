import ApplicationHocWrapper from '../hoc/Wrapper.vue';
import Calculator from './index.vue';

enum EEl {
  NUMBER_0 = 'calculator-number-0',
  NUMBER_1 = 'calculator-number-1',
  NUMBER_2 = 'calculator-number-2',
  NUMBER_3 = 'calculator-number-3',
  NUMBER_4 = 'calculator-number-4',
  NUMBER_5 = 'calculator-number-5',
  NUMBER_6 = 'calculator-number-6',
  NUMBER_7 = 'calculator-number-7',
  NUMBER_8 = 'calculator-number-8',
  NUMBER_9 = 'calculator-number-9',
  POINT = 'calculator-decimal-point',
  ADD = 'calculator-add',
  SUBTRACT = 'calculator-subtract',
  MULTIPLY = 'calculator-multiply',
  DIVIDE = 'calculator-divide',
  EQUAL = 'calculator-equal',
  CLEAR = 'calculator-clear',
  CHANGE_SIGN = 'calculator-change-sign',
  PERCENT = 'calculator-percent',
  RESULT = 'calculator-result',
  LOG = 'calculator-log',
  CLEAR_LOG = 'calculator-clear-log',
}

type Context = {
  wrapper: ReturnType<typeof shallowMount>;
  findEl: (name: EEl) => ReturnType<ReturnType<typeof shallowMount>['find']>;
  result: ReturnType<ReturnType<typeof shallowMount>['find']>;
};

describe('Calculator', () => {
  beforeEach<Context>((context) => {
    context.wrapper = shallowMount(Calculator, {
      global: { stubs: { ApplicationHocWrapper } },
    });
    context.findEl = (name) => context.wrapper.find(`[data-spec-el="${name}"]`);
    context.result = context.findEl(EEl.RESULT);
  });

  test<Context>('Number', async ({ findEl, result }) => {
    expect(result.text()).toBe('0');

    await findEl(EEl.NUMBER_1).trigger('click');
    expect(result.text()).toBe('1');

    await findEl(EEl.NUMBER_2).trigger('click');
    expect(result.text()).toBe('12');

    await findEl(EEl.NUMBER_3).trigger('click');
    expect(result.text()).toBe('123');
  });

  test<Context>('Clear', async ({ findEl, result }) => {
    const clearEl = findEl(EEl.CLEAR);
    expect(clearEl.text()).toBe('AC');

    await findEl(EEl.NUMBER_1).trigger('click');
    expect(clearEl.text()).toBe('C');

    await clearEl.trigger('click');
    expect(result.text()).toBe('0');
    expect(clearEl.text()).toBe('AC');
  });

  test<Context>('Decimal point', async ({ findEl, result }) => {
    await findEl(EEl.POINT).trigger('click');
    expect(result.text()).toBe('0.');

    await findEl(EEl.NUMBER_1).trigger('click');
    expect(result.text()).toBe('0.1');
  });

  test<Context>('Percent', async ({ findEl, result }) => {
    await findEl(EEl.NUMBER_1).trigger('click');
    await findEl(EEl.NUMBER_0).trigger('click');
    await findEl(EEl.PERCENT).trigger('click');
    expect(result.text()).toBe('0.1');
  });

  test<Context>('Change sign', async ({ findEl, result }) => {
    await findEl(EEl.NUMBER_1).trigger('click');
    await findEl(EEl.CHANGE_SIGN).trigger('click');
    expect(result.text()).toBe('-1');
  });

  test<Context>('Add', async ({ findEl, result }) => {
    await findEl(EEl.NUMBER_1).trigger('click');
    await findEl(EEl.ADD).trigger('click');
    expect(result.text()).toBe('1');

    await findEl(EEl.NUMBER_2).trigger('click');
    expect(result.text()).toBe('2');

    await findEl(EEl.EQUAL).trigger('click');
    expect(result.text()).toBe('3');
  });

  test<Context>('Subtract', async ({ findEl, result }) => {
    await findEl(EEl.NUMBER_1).trigger('click');
    await findEl(EEl.SUBTRACT).trigger('click');
    expect(result.text()).toBe('1');

    await findEl(EEl.NUMBER_2).trigger('click');
    expect(result.text()).toBe('2');

    await findEl(EEl.EQUAL).trigger('click');
    expect(result.text()).toBe('-1');
  });

  test<Context>('Multiply', async ({ findEl, result }) => {
    await findEl(EEl.NUMBER_2).trigger('click');
    await findEl(EEl.MULTIPLY).trigger('click');
    expect(result.text()).toBe('2');

    await findEl(EEl.NUMBER_3).trigger('click');
    expect(result.text()).toBe('3');

    await findEl(EEl.EQUAL).trigger('click');
    expect(result.text()).toBe('6');
  });

  test<Context>('Divide', async ({ findEl, result }) => {
    await findEl(EEl.NUMBER_1).trigger('click');
    await findEl(EEl.NUMBER_0).trigger('click');
    await findEl(EEl.DIVIDE).trigger('click');
    expect(result.text()).toBe('10');

    await findEl(EEl.NUMBER_2).trigger('click');
    expect(result.text()).toBe('2');

    await findEl(EEl.EQUAL).trigger('click');
    expect(result.text()).toBe('5');
  });

  test<Context>('Equal', async ({ findEl, result }) => {
    await findEl(EEl.NUMBER_1).trigger('click');
    await findEl(EEl.ADD).trigger('click');
    await findEl(EEl.NUMBER_2).trigger('click');
    await findEl(EEl.EQUAL).trigger('click');
    await findEl(EEl.EQUAL).trigger('click');

    expect(result.text()).toBe('5');
  });

  test<Context>('Log', async ({ findEl }) => {
    await findEl(EEl.NUMBER_1).trigger('click');
    await findEl(EEl.NUMBER_0).trigger('click');
    await findEl(EEl.ADD).trigger('click');
    await findEl(EEl.NUMBER_2).trigger('click');
    await findEl(EEl.EQUAL).trigger('click');

    expect(findEl(EEl.LOG).text()).contain('10 + 2');
    expect(findEl(EEl.LOG).text()).contain('= 12');

    await findEl(EEl.CLEAR_LOG).trigger('click');
    expect(findEl(EEl.LOG).text).toBe('');
  });
});
