import Bun from 'bun';

// https://bun.sh/docs/bundler
await Bun.build({
  entrypoints: ['src/index.ts'],
  outdir: './dist',
  target: 'bun',
  minify: true,
});
