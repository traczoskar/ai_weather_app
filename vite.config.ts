import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
        },
        include: "**/*.svg?react",
      }),
    ],
    base: "/ai_weather_app/",
    define: {
      "process.env": env,
    },
    build: {
      outDir: "build",
    },
  };
});
