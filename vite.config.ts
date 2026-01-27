import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

/**
 * Vite configuration for GitHub Pages deployment
 * Repo: dougmens/REACT-UI-Dashboards
 * Pages base path is mandatory for correct asset resolution.
 */

export default defineConfig({
  base: "/REACT-UI-Dashboards/",
  plugins: [react()],
  server: {
    port: 5173,
  },
});
