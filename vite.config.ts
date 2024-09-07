import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';
import fs from 'fs';
import { resolve } from 'path';

function getPackageName() {
  const packageJSON = JSON.parse(fs.readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));
  return packageJSON.name;
}

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: getPackageName(),
      fileName: 'index',
    },
  },
  test: {},
  plugins: [
    dts({
      insertTypesEntry: true,
    }) as any,
  ],
});
