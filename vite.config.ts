// @lovable.dev/vite-tanstack-config already includes:
// TanStack Start, React, Tailwind, tsconfig paths, Nitro,
// VITE_* environment injection, path aliases, etc.
// Do not add those plugins manually.

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  // GitHub Pages is a static host, so don't generate a Nitro
  // server when building in GitHub Actions.
  nitro: isGitHubActions ? false : undefined,

  tanstackStart: isGitHubActions
    ? {
        // Generate static HTML for GitHub Pages.
        prerender: {
          enabled: true,
          crawlLinks: true,
        },

        // Start prerendering from the homepage.
        pages: [{ path: "/" }],
      }
    : {
        // Keep the normal Lovable/TanStack server configuration
        // outside GitHub Actions.
        server: { entry: "server" },
      },
});
