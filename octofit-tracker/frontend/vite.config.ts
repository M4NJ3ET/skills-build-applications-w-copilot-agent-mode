import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173
  },
  plugins: [react()],
  define: {
    'import.meta.env.VITE_CODESPACE_NAME': JSON.stringify(process.env.CODESPACE_NAME || '')
  }
});
