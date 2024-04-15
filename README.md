# @pbr1111/vite-plugin-biome

[![npm version](https://badge.fury.io/js/%40pbr1111%2Fvite-plugin-biome.svg)](https://badge.fury.io/js/%40pbr1111%2Fvite-plugin-biome)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@pbr1111/vite-plugin-biome)

This Vite plugin seamlessly integrates the Biome linter, formatter, and checker into your development workflow, providing lightning-fast code analysis and formatting directly within the build process.

## Features

- **Blazing-Fast Linting**: Experience significantly faster linting compared to traditional linters like ESLint.
- **Versatile Modes**: Choose between linting (lint), formatting (format), and checking (check) Biome to tailor the plugin to your needs.
- **Streamlined Configuration**: Define options for mode, path, applying fixes, and error handling for a customized setup.
- **Hot Reload Support**: The plugin automatically re-runs Biome when file changes occur during hot module replacement

## Installation

1. Install the plugin using npm/yarn/pnpm:
- npm: `npm install -D @pbr1111/vite-plugin-biome`
- yarn: `yarn add @pbr1111/vite-plugin-biome -D`
- pnpm: `pnpm add -D @pbr1111/vite-plugin-biome`

2. Add the plugin to your vite.config.js/ts file:
```ts
import { defineConfig } from 'vite';
import { biomePlugin } from '@pbr1111/vite-plugin-biome';

export default defineConfig({
  plugins: [biomePlugin()],
});
```

## Usage

By default, the plugin runs Biome in linting mode (lint) on your entire project. You can customize its behavior using options:

- `mode`: Specify the Biome mode (`lint`, `format`, or `check`). Defaults to `lint`.
- `path`: Define the path to the files or directories you want to process. Defaults to the current working directory (`.`).
- `applyFixes`: Set to `true` to apply Biome's formatting or fixing suggestions (depends on mode). Defaults to `false`.
- `failOnError`: Set to `true` to throw an error when Biome encounters issues. Defaults to `false`.

### Example
```ts
import { defineConfig } from 'vite';
import { biomePlugin } from '@pbr1111/vite-plugin-biome';

export default defineConfig({
  plugins: [
    biomePlugin({
      mode: 'format', // Set to 'format' to automatically format code
      path: 'src/**/*.js', // Process only JavaScript files in the 'src' directory
      applyFixes: true, // Apply formatting fixes
      failOnError: true, // Throw an error on Biome errors
    }),
  ],
});
```
