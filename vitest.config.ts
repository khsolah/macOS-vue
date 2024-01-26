import path from 'path';
import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import React from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    Vue(),
    React(),
    AutoImport({
      imports: ['vue'],
      packagePresets: ['pinia', '@vue/test-utils', '@vueuse/core'],
    }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '.'),
    },
  },
});
