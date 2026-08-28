import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },

    prerender: {
      enabled: true,
      crawlLinks: true,
      autoStaticPathsDiscovery: true,
      autoSubfolderIndex: true,
    },
  },

  vite: {
    base: process.env.GITHUB_ACTIONS
      ? "/rediet-assefa-hotel/"
      : "/",
  },
});
