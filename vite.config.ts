/// <reference types="vitest/config" />
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'components/confirm/index': resolve(
          __dirname,
          'src/components/confirm/index.ts'
        ),
        'components/datatable/index': resolve(
          __dirname,
          'src/components/datatable/index.ts'
        ),
        'components/datepicker/index': resolve(
          __dirname,
          'src/components/datepicker/index.ts'
        ),
        'components/empty/index': resolve(
          __dirname,
          'src/components/empty/index.ts'
        ),
        'components/filters/index': resolve(
          __dirname,
          'src/components/filters/index.ts'
        ),
        'components/modal/index': resolve(
          __dirname,
          'src/components/modal/index.ts'
        ),
        'components/pagination/index': resolve(
          __dirname,
          'src/components/pagination/index.ts'
        ),
        'components/scroll/index': resolve(
          __dirname,
          'src/components/scroll/index.ts'
        ),
        'components/tooltip/index': resolve(
          __dirname,
          'src/components/tooltip/index.ts'
        ),
        'components/gallery/index': resolve(
          __dirname,
          'src/components/gallery/index.ts'
        ),
        'components/form/index': resolve(
          __dirname,
          'src/components/form/index.ts'
        ),
        'components/theme/index': resolve(
          __dirname,
          'src/components/theme/index.ts'
        ),
        'components/loader/index': resolve(
          __dirname,
          'src/components/loader/index.ts'
        ),
        'components/actions/index': resolve(
          __dirname,
          'src/components/actions/index.ts'
        ),
        'components/export/index': resolve(
          __dirname,
          'src/components/export/index.ts'
        ),
        'enums/index': resolve(__dirname, 'src/enums/index.ts'),
        'hooks/index': resolve(__dirname, 'src/hooks/index.ts'),
        'types/index': resolve(__dirname, 'src/types/index.ts'),
        'stores/index': resolve(__dirname, 'src/stores/index.ts'),
        'providers/index': resolve(__dirname, 'src/providers/index.ts'),
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: [
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].es.js',
        },
        {
          format: 'cjs',
          dir: 'dist',
          entryFileNames: '[name].cjs.js',
        },
      ],
    },
  },
});
