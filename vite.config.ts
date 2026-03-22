import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const repositoryName = "mol-portfolio";
const defaultBasePath = `/${repositoryName}/`;

export default defineConfig(({ command }) => ({
  base: command === "build"
    ? (process.env.VITE_BASE_PATH ?? defaultBasePath)
    : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [],
  },
}));
