import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // Add this line to ensure history API fallback is enabled
    fs: {
      allow: [".."],
    },
  },
  resolve: {
    alias: {
      // Setup aliases if necessary
      "@": resolve(__dirname, "./src"),
    },
  },
});
