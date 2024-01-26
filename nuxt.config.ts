// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@unocss/nuxt', '@vueuse/nuxt'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use './assets/scss/index';
          `,
        },
        resolve: {
          alias: [
            {
              // This will help us use our global styles from regular sass files:
              find: '@styles',
              replacement: path.resolve(__dirname, '/assets/scss/index.scss'),
            },
          ],
        },
      },
    },
  },
});
