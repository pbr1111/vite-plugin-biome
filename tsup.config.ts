import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts'],
  dts: true,
  format: ['esm', 'cjs'],
  watch: false,
  clean: true,
  minify: true
});
