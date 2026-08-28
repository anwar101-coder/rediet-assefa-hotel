import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  base: "/rediet-assefa-hotel/",
  tanstackStart: {
    server: { entry: "server" },
  },
});
