import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import vercel from 'vite-plugin-vercel'
import ssr from 'vite-plugin-ssr/plugin';

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    vercel(),
    ssr(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
   // outDir: path.resolve(import.meta.dirname, "dist/public"),
    outDir: path.resolve(import.meta.dirname, ".vercel/output/static"),
    emptyOutDir: true,
  },
});
