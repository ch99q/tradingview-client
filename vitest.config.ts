import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 20000,
    environment: "node",
    globals: true,
    setupFiles: ["dotenv/config"],
  },
});
