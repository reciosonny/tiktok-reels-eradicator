import path from "path";

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  css: {
    devSourcemap: true,
  },
  build: {
    commonjsOptions: {
      include: [/@repo\/ui/, /node_modules/],
    },
    outDir: "./browser-extensions/chrome/dist",
    rollupOptions: {
      input: {
        index: './src/main.ts',
        'index-html': './index.html',
        'extension-click-entry': './src/extension-click-entry.ts',
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
    minify: false
  },
  resolve: {
    alias: {
      '@repo/ui': path.resolve("../../packages/ui/src"),
      '$': path.resolve("./src"),
    },
  },
})
