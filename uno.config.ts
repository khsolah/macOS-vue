import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind,
} from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
  safelist: [
    'i-mdi:apple-keyboard-command',
    'i-mdi:apple-keyboard-control',
    'i-mdi:apple-keyboard-option',
    'i-mdi:apple-keyboard-shift',
    'i-mdi:check',
    'i-mdi:chevron-right',
    'i-mdi:microphone-outline',
    'i-mdi:power',
    'i-fontisto:world-o',
  ],
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
