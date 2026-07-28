import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";

// Vite only exposes VITE_-prefixed vars, and only to the client. Server code
// (the contact-form handler) reads process.env, which in dev does NOT contain
// anything from .env — so load the file and forward the server-only keys.
// In production these come from the host's real environment (e.g. Vercel).
const fileEnv = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
for (const key of ["RESEND_API_KEY", "CONTACT_FROM"]) {
  if (!process.env[key] && fileEnv[key]) process.env[key] = fileEnv[key];
}

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
