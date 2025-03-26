import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => {
  process.env = {
    ...process.env,
    ...loadEnv("development", process.cwd()),
  };

  return {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env": process.env,
    },
  };
});
