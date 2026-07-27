import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Tailwind is passed explicitly so the CSS pipeline never depends on the
  // wrapper's internal plugin order. Without this the dev server serves
  // src/styles.css raw (uncompiled @theme/@utility) and the app renders unstyled.
  plugins: [tailwindcss()],
  vite: {
    server: {
      port: 8080,
      host: true,
    },
  },
});
