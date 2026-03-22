import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const repositoryName = "mol-portfolio";

export default defineConfig(({ command }) => ({
  base: command === "build" ? `/${repositoryName}/` : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [],
  },
}));
