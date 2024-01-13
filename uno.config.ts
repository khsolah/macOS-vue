import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind,
} from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
  presets: [
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetWind({
      dark: {
        dark: '.dark-mode',
      },
    }),
  ],
  transformers: [transformerDirectives()],
});
