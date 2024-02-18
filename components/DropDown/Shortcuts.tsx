import type { PropType } from 'vue';

export default defineComponent({
  props: {
    shortcuts: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <>
        {props.shortcuts?.map((shortcut) =>
          /^i-[a-zA-Z]+:[a-zA-Z-]+$/.test(shortcut) ? (
            <i key={shortcut} class={shortcut} />
          ) : (
            <span key={shortcut}>{shortcut}</span>
          ),
        )}
      </>
    );
  },
});
