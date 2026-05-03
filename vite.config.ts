import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  css: { preprocessorOptions: { scss: { quietDeps: true } } },
  plugins: [reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
});
