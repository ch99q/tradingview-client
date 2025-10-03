import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts', './src/studies/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  outDir: './dist',
  platform: 'node',
  target: 'node18',
  minify: false,
  sourcemap: true,
})