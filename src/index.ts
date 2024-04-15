import type { Plugin } from 'vite';
import { exec } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

type Mode = 'lint' | 'format' | 'check';

type Options = {
  mode?: Mode;
  path?: string;
  failOnError?: boolean;
  applyFixes?: boolean;
};

const DEFAULT_OPTIONS: Required<Options> = { mode: 'lint', path: '.', applyFixes: false, failOnError: false };

const biomePlugin = (options: Options): Plugin => {
  let config: Required<Options>;
  let command: string;

  const runBiome = async () => {
    try {
      const { stdout, stderr } = await execAsync(command, { cwd: process.cwd() });
      if (stdout) {
        console.log(`[Biome]: ${stdout}`);
      }
      if (stderr) {
        console.error(`[Biome]: ${stderr}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`[Biome]: ${error.message}`);
        if (config.failOnError) {
          throw new Error('Build failed due to Biome errors.');
        }
      }
    }
  };

  return {
    name: 'vite-plugin-biome',
    enforce: 'pre',
    configResolved() {
      config = { ...DEFAULT_OPTIONS, ...options };
      const filesPath = path.join(process.cwd(), config.path);
      command = `biome ${config.mode} ${filesPath} ${
        config.applyFixes ? (config.mode === 'format' ? '--write' : '--apply') : ''
      } --colors=force`;
    },
    async buildStart() {
      await runBiome();
    },
    async handleHotUpdate() {
      await runBiome();
    }
  };
};

export { biomePlugin };
