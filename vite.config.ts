import path from "node:path";
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  // Moved index.html to src folder according to
  // https://stackoverflow.com/a/72326219
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist"
  },
  resolve: {
    alias: { "/src": path.resolve(process.cwd(), "src") }
  },
})
