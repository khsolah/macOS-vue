<script setup lang="ts">
const enum EOperator {
  EQUAL = '=',
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
  CHANGE_SIGN = '+-',
  AC = 'AC',
  C = 'C',
  PERCENT = '%',
  DECOMAL_POINT = '.',
}
export type TLog = [(number | EOperator)[], number, string];

const props = defineProps<{
  id: string;
  zIndex: number;
}>();

const numberStack = ref<string[]>(['']);
const operatorStack = ref<EOperator[]>([]);
const lastInputValue = ref<number | EOperator | null>(null);
const lastInputNumber = ref(0);
const lastInputOperator = ref<EOperator | null>(null);
const log = ref<TLog[0]>([]);
const logs = ref<TLog[]>([]);
const hideCurrentLog = ref(false);
const showCalculatorLog = ref(false);

const curr = computed(
  () =>
    numberStack.value[numberStack.value.length - 1] ||
    numberStack.value[numberStack.value.length - 2] ||
    0,
);

const input = (value: EOperator | number) => {
  if (typeof value === 'number') {
    lastInputValue.value = value;
    return numberStack.value.push(
      `${+(numberStack.value.pop()! + value.toString()) || 0}`,
    );
  }

  switch (value) {
    case EOperator.DECOMAL_POINT:
      if (!operatorStack.value.length) numberStack.value.length = 0;
      numberStack.value.push((numberStack.value.pop()! || '0') + '.');
      break;
    case EOperator.CHANGE_SIGN:
      numberStack.value.push(`${-numberStack.value.pop()!}`);
      break;
    case EOperator.PERCENT:
      numberStack.value.push(
        `${(+numberStack.value.pop()! || +lastInputNumber.value || 0) * 0.01}`,
      );
      break;
    case EOperator.AC:
      numberStack.value.length = 0;
      operatorStack.value.length = 0;
      numberStack.value.push('');
      lastInputNumber.value = 0;
      lastInputOperator.value = null;
      lastInputValue.value = null;
      break;
    case EOperator.C:
      if (lastInputValue.value === EOperator.EQUAL) {
        numberStack.value[numberStack.value.length - 1] = '0';
        operatorStack.value.pop();
      } else if (typeof lastInputValue.value === 'number') {
        numberStack.value[numberStack.value.length - 1] = '0';
        lastInputNumber.value =
          +numberStack.value[numberStack.value.length - 2] || 0;
      } else {
        operatorStack.value.pop();
        lastInputOperator.value = null;
      }
      lastInputValue.value = null;
      break;
    default: {
      if (value === EOperator.EQUAL) {
        if (!lastInputValue.value) {
          lastInputValue.value = value;
          numberStack.value.pop();
          numberStack.value.push('');
          break;
        }

        if (lastInputValue.value === null)
          numberStack.value[
            numberStack.value.length - 1
          ] = `${lastInputNumber.value}`;
        numberStack.value[numberStack.value.length - 1] =
          numberStack.value[numberStack.value.length - 1] ||
          `${lastInputNumber.value}`;

        if (!operatorStack.value.length && lastInputOperator.value)
          operatorStack.value.push(lastInputOperator.value);

        if (lastInputValue.value) lastInputValue.value = value;
      }

      if (operatorStack.value[operatorStack.value.length - 1])
        log.value.push(
          (lastInputOperator.value =
            operatorStack.value[operatorStack.value.length - 1]),
        );
      if (numberStack.value[numberStack.value.length - 1])
        log.value.push(
          (lastInputNumber.value =
            +numberStack.value[numberStack.value.length - 1]),
        );

      const lastOperator = operatorStack.value[operatorStack.value.length - 1];
      if (
        !(
          (lastOperator === EOperator.ADD ||
            lastOperator === EOperator.SUBTRACT) &&
          (value === EOperator.MULTIPLY || value === EOperator.DIVIDE)
        ) &&
        numberStack.value.length > 1
      ) {
        do {
          const operator = operatorStack.value.pop();
          const last = numberStack.value.pop()!;
          const num = last
            ? +last
            : +numberStack.value[numberStack.value.length - 1];

          switch (operator) {
            case EOperator.ADD:
              numberStack.value[numberStack.value.length - 1] = `${
                +numberStack.value[numberStack.value.length - 1] + num
              }`;
              break;
            case EOperator.SUBTRACT:
              numberStack.value[numberStack.value.length - 1] = `${
                +numberStack.value[numberStack.value.length - 1] - num
              }`;
              break;
            case EOperator.MULTIPLY:
              numberStack.value[numberStack.value.length - 1] = `${
                +numberStack.value[numberStack.value.length - 1] * num
              }`;
              break;
            case EOperator.DIVIDE:
              numberStack.value[numberStack.value.length - 1] = `${
                +numberStack.value[numberStack.value.length - 1] / num
              }`;
              break;
            default:
              break;
          }
        } while (
          numberStack.value.length > 1 &&
          value !== EOperator.MULTIPLY &&
          value !== EOperator.DIVIDE
        );
      }

      if (numberStack.value[numberStack.value.length - 1])
        numberStack.value.push('');

      if ((hideCurrentLog.value = value === EOperator.EQUAL)) {
        logs.value.push([
          log.value.slice(),
          +numberStack.value[0],
          Date.now().toString(36) + Math.random().toString(36).substring(2),
        ]);
      } else {
        operatorStack.value.push((lastInputOperator.value = value));
        lastInputNumber.value = +numberStack.value[0];
      }

      break;
    }
  }
};
</script>

<template>
  <div>
    <ApplicationHocWrapper
      :id="props.id"
      :width="232"
      :height="288"
      :z-index="props.zIndex"
    >
      <div
        class="h-72 mt-7 text-white grid w-58 gap-1px grid-cols-4 grid-rows-6"
      >
        <div
          class="font-thin px-2 col-span-4 row-span-1 select-none"
          un-flex="~ justify-end items-center"
          un-text="right 5xl"
          data-spec-el="calculator-result"
        >
          {{ curr }}
        </div>

        <!-- row 2 -->
        <template v-if="lastInputValue">
          <button
            class="calculator__button calculator__button--symbol"
            data-spec-el="calculator-clear"
            @click="input(EOperator.C)"
          >
            C
          </button>
        </template>
        <template v-else>
          <button
            class="calculator__button calculator__button--symbol"
            data-spec-el="calculator-clear"
            @click="input(EOperator.AC)"
          >
            AC
          </button>
        </template>
        <button
          class="calculator__button calculator__button--symbol"
          data-spec-el="calculator-change-sign"
          @click="input(EOperator.CHANGE_SIGN)"
        >
          <i class="i-mdi:plus-minus-variant" />
        </button>
        <button
          class="calculator__button calculator__button--symbol"
          data-spec-el="calculator-percent"
          @click="input(EOperator.PERCENT)"
        >
          <i class="i-mdi:percent-outline" />
        </button>
        <button
          class="calculator__button calculator__button--symbol calculator__button--operator"
          data-spec-el="calculator-divide"
          @click="input(EOperator.DIVIDE)"
        >
          <i class="i-mdi:division" />
        </button>

        <!-- row 3 -->
        <button
          class="calculator__button calculator__button--number"
          data-spec-el="calculator-number-7"
          @click="input(7)"
        >
          7
        </button>
        <button
          class="calculator__button calculator__button--number"
          data-spec-el="calculator-number-8"
          @click="input(8)"
        >
          8
        </button>
        <button
          class="calculator__button calculator__button--number"
          data-spec-el="calculator-number-9"
          @click="input(9)"
        >
          9
        </button>
        <button
          class="calculator__button calculator__button--symbol calculator__button--operator"
          data-spec-el="calculator-multiply"
          @click="input(EOperator.MULTIPLY)"
        >
          <i class="i-mdi:close" />
        </button>

        <!-- row 4 -->
        <button
          class="calculator__button calculator__button--number"
          data-spec-el="calculator-number-4"
          @click="input(4)"
        >
          4
        </button>
        <button
          class="calculator__button calculator__button--number"
          data-spec-el="calculator-number-5"
          @click="input(5)"
        >
          5
        </button>
        <button
          class="calculator__button calculator__button--number"
          data-spec-el="calculator-number-6"
          @click="input(6)"
        >
          6
        </button>
        <button
          class="calculator__button calculator__button--symbol calculator__button--operator"
          data-spec-el="calculator-subtract"
          @click="input(EOperator.SUBTRACT)"
        >
          <i class="i-mdi:minus" />
        </button>

        <!-- row 5 -->
        <button
          class="calculator__button calculator__button--number"
          data-spec-el="calculator-number-1"
          @click="input(1)"
        >
          1
        </button>
        <button
          class="calculator__button calculator__button--number"
          data-spec-el="calculator-number-2"
          @click="input(2)"
        >
          2
        </button>
        <button
          class="calculator__button calculator__button--number"
          data-spec-el="calculator-number-3"
          @click="input(3)"
        >
          3
        </button>
        <button
          class="calculator__button calculator__button--symbol calculator__button--operator"
          data-spec-el="calculator-add"
          @click="input(EOperator.ADD)"
        >
          <i class="i-mdi:plus" />
        </button>

        <!-- row 6 -->
        <button
          class="col-span-2 calculator__button calculator__button--number"
          data-spec-el="calculator-number-0"
          @click="input(0)"
        >
          0
        </button>
        <button
          class="calculator__button calculator__button--number"
          data-spec-el="calculator-decimal-point"
          @click="input(EOperator.DECOMAL_POINT)"
        >
          .
        </button>
        <button
          class="calculator__button calculator__button--symbol calculator__button--operator"
          data-spec-el="calculator-equal"
          @click="input(EOperator.EQUAL)"
        >
          <i class="i-mdi:equal" />
        </button>
      </div>
    </ApplicationHocWrapper>

    <!-- Log -->
    <template v-if="showCalculatorLog">
      <ApplicationHocWrapper
        id="CALCULATOR_LOG"
        name="CALCULATOR_LOG"
        :width="220"
        :height="300"
        :z-index="props.zIndex"
        :top="270"
        :left="143"
        :nav="{ fullscreen: { disabled: true } }"
        @close="showCalculatorLog = false"
      >
        <div
          class="rounded-t-xl bg-[rgb(61,56,53)] h-7 top-0.5 right-0.5 left-0.5 z--1 absolute font-bold"
          un-text="sm white/50"
          un-flex="~ items-center justify-center"
        >
          Paper Tape
        </div>
        <div
          class="bg-[rgb(30,30,30)] h-75 mt-7 text-white text-sm p-4 w-55 overflow-auto"
        >
          <div v-for="log in logs" :key="log[2]" class="mb-4">
            <p class="flex flex-wrap">
              <span
                v-for="(item, index) in log[0]"
                :key="`${index}-${item}`"
                class="mr-1"
                >{{ item }}</span
              >
            </p>
            <p class="basis-full">= {{ log[1] }}</p>
          </div>
          <div v-show="!hideCurrentLog">
            <span
              v-for="(item, index) in log"
              :key="`${index}-${item}`"
              class="ml-1"
              >{{ item }}</span
            >
          </div>
        </div>
      </ApplicationHocWrapper>
    </template>
  </div>
</template>

<style lang="scss">
.calculator {
  &__button {
    @apply cursor-default relative;
    @apply flex justify-center items-center;
    @apply text-inherit text-2xl;
    @apply border-none outline-none;

    &--number {
      @apply bg-white/30 active:bg-white/50;
    }

    &--symbol {
      @apply bg-white/15 text-xl active:bg-white/30;
    }

    &--operator {
      @apply font-medium bg-amber-500 active:bg-amber-500/70;
    }
  }
}
</style>
