import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      proxy:
        mode === "development"
          ? {
              "/quizapp/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/quizapp/, ""), // Убираем /quizapp из пути
              },
            }
          : undefined,
    },
    base: "/quizapp/",
    build: {
      outDir: '/var/www/quizapp/dist', // Путь, куда будет собираться билд
      emptyOutDir: true, // Удалит старые файлы перед билдом
    },

    plugins: [react()],
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
    esbuild: {
      jsxInject: `import React from 'react'`,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // Алиас для папки src
      },
    },
  };
});
