import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Exercise the real handler with mocked infrastructure, without Start's RPC
// transform replacing it with a deployed server-function transport stub.
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: { include: ["src/lib/quotes.functions.test.ts"], restoreMocks: true },
});