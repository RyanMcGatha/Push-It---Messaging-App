import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "ryan-mcgatha",
    project: "javascript-react"
  })],

  server: {
    historyApiFallback: true,
    fs: {
      allow: [".."],
    },
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },

  build: {
    sourcemap: true
  }
});