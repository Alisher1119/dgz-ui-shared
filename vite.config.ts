/// <reference types="vitest/config" />
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
const components = [
  'actions',
  'confirm',
  'datatable',
  'datepicker',
  'empty',
  'export',
  'filters',
  'form',
  'gallery',
  'loader',
  'modal',
  'pagination',
  'scroll',
  'theme',
  'tooltip',
] as const;
const utils = ['enums', 'hooks', 'providers', 'stores', 'types'] as const;
const entries = {
  index: 'src/index.ts',
  ...Object.fromEntries(
    components.map((name) => [
      `components/${name}/index`,
      `src/components/${name}/index.ts`,
    ])
  ),
  ...Object.fromEntries(
    utils.map((name) => [`${name}/index`, `src/${name}/index.ts`])
  ),
};
const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'i18next',
  'react-i18next',
  'lucide-react',
  'react-hook-form',
  'tailwindcss',
];
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dtsPlugin({
      include: ['src'],
      exclude: ['src/**/*.test.*', 'src/**/*.spec.*', 'src/setupTests.ts'],
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.build.json',
      copyDtsFiles: true,
      rollupTypes: false,
      strictOutput: false,
    }),
  ],
  resolve: {
    dedupe: external.filter((e) => e !== 'react/jsx-runtime'),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    workspace: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
  build: {
    sourcemap: true,
    minify: 'esbuild',
    cssCodeSplit: false,
    lib: {
      entry: Object.fromEntries(
        Object.entries(entries).map(([key, value]) => [
          key,
          resolve(__dirname, value),
        ])
      ),
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: (id) =>
        external.some((ext) => id === ext || id.startsWith(`${ext}/`)) ||
        /^dgz-ui(\/.*)?$/.test(id),
      output: [
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].es.js',
          chunkFileNames: 'chunks/[name]-[hash].es.js',
        },
        {
          format: 'cjs',
          dir: 'dist',
          entryFileNames: '[name].cjs.js',
          chunkFileNames: 'chunks/[name]-[hash].cjs.js',
          interop: 'auto',
        },
      ],
    },
  },
});
