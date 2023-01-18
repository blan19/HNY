import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [EnvironmentPlugin(["VITE_BASE_URL"])],
});
