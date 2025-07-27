import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  // Serve static files from public directory
  outDir: "dist",
  publicDir: "public",
  integrations: [react()],

  // i18n configuration
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
