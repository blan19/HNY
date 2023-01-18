import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [
    EnvironmentPlugin([
      "VITE_BASE_URL",
      "VITE_UNSPLASH_ACCESS_KEY",
      "VITE_UNSPLASH_SECRET_KEY",
    ]),
  ],
});
