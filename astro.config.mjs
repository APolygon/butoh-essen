import { defineConfig } from "astro/config";

export default defineConfig({
  // no import from 'astro:content' here!

  // Serve static files from public directory
  outDir: "dist",
  publicDir: "public",
});
