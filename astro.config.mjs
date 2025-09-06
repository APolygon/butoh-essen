import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Serve static files from public directory
  outDir: "dist",
  publicDir: "public",
  site: "https://butospirit.org",
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        // Exclude admin and impressum pages from sitemap
        return !page.includes("/admin/") && !page.includes("/impressum/");
      },
    }),
  ],

  // i18n configuration
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
