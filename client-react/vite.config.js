import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/admin": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/members": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/trainers": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/packages": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/payments": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/dashboard": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});