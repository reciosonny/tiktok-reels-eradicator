import path from "path";
import fs from 'fs';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import checker from 'vite-plugin-checker';
// import sassDts from 'vite-plugin-sass-dts';

const reorganizeOptionsAssets = {
  name: 'reorganize-options-assets',
  generateBundle(options, bundle) {
    // 1. Move HTML file
    console.log('bundle: ', Object.keys(bundle));
    if (bundle['options.html']) {
      console.log('using options.html');
      bundle['options.html'].fileName = 'whattheheck/options.html';
    }

    // 2. Find and move CSS associated with options
    const cssAsset = Object.keys(bundle).find(name => 
      name.endsWith('.css') && 
      bundle[name].source?.includes('/* Options page CSS */')
    );
    
    if (cssAsset) {
      bundle[cssAsset].fileName = 'options/options.css';
    }

    // 3. Clean up unnecessary assets
    Object.keys(bundle).forEach(name => {
      if (name.startsWith('assets/') && name.includes('options')) {
        delete bundle[name];
      }
    });
  }
}

const MoveHtmlPlugin = {
  name: 'move-html-plugin',
  closeBundle() {
    const sourceFile = path.resolve(__dirname, 'browser-extensions', 'chrome', 'dist', 'src', 'browser-widgets', 'options', 'options.html');
    const destinationDir = path.resolve(__dirname, 'browser-extensions', 'chrome');

    console.log('sourceFile: ', sourceFile);
    if (fs.existsSync(sourceFile)) {
      // fs.unlinkSync(destinationDirFile);
      // fs.mkdirSync(destinationDir, { recursive: true });
      fs.renameSync(sourceFile, path.join(destinationDir, 'options.html'));
      console.log('Moved index.html to dist/html/index.html');
    } else {
      console.log('index.html not found in dist folder.');
    }
  },
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  return {
    plugins: [
      svelte(), 
      tailwindcss()
    ],
    css: {
      devSourcemap: mode === 'development',
    },
    build: {
      commonjsOptions: {
        include: [/@repo\/ui/, /node_modules/],
      },
      outDir: "./browser-extensions/chrome/dist",
      rollupOptions: {
        input: {
          index: './src/main.ts',
        },
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
        },
      },
      minify: mode === 'production',
      sourcemap: mode === 'development',
    },
    resolve: {
      alias: {
        '$lib': path.resolve("./src/lib"),
      }
    }
  }
})
