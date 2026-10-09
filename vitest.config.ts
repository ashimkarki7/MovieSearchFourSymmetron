import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./", import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
  },
  resolve: {
    alias: {
      "~": root,
      "@mock": fileURLToPath(new URL("./lib/mock/", import.meta.url)),
      "@constants": fileURLToPath(
        new URL("./constants/index.ts", import.meta.url),
      ),
      "@globaltypes": fileURLToPath(new URL("./types/", import.meta.url)),
    },
  },
});
