/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

const componentEntries = [
  'confirm',
  'datatable',
  'datepicker',
  'empty',
  'filters',
  'modal',
  'pagination',
  'scroll',
  'tooltip',
  'gallery',
  'form',
  'theme',
  'loader',
  'actions',
  'export',
] as const;

const utilEntries = ['enums', 'hooks', 'types', 'stores', 'providers'] as const;

const entries = {
  index: resolve(__dirname, 'src/index.ts'),
  ...Object.fromEntries(
    componentEntries.map((name) => [
      `components/${name}/index`,
      resolve(__dirname, `src/components/${name}/index.ts`),
    ])
  ),
  ...Object.fromEntries(
    utilEntries.map((name) => [
      `${name}/index`,
      resolve(__dirname, `src/${name}/index.ts`),
    ])
  ),
};

const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'i18next',
  'react-i18next',
  'dayjs',
  'lucide-react',
  'react-hook-form',
  'tailwindcss',
  /^dgz-ui(\/.*)?$/,
];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dtsPlugin({
      include: ['src/**/*'],
      exclude: ['src/**/*.test.*', 'src/**/*.spec.*'],
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.json',
    }),
  ],
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      'i18next',
      'react-i18next',
      'dayjs',
      'lucide-react',
      'react-hook-form',
      'dgz-ui',
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  build: {
    sourcemap: true,
    minify: 'esbuild',
    lib: {
      entry: entries,
    },
    rollupOptions: {
      external: (id) => {
        return external.some((pattern) =>
          pattern instanceof RegExp
            ? pattern.test(id)
            : id === pattern || id.startsWith(`${pattern}/`)
        );
      },
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
