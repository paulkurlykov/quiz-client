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
              "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
              },
            }
          : undefined,
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
