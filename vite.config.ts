import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
// Relative base: JS/CSS resolve under the current URL path (local `serve dist` or `/repo/` on GitHub Pages).
export default defineConfig({
  base: './',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
})