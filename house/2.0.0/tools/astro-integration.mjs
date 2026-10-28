// Astro integration: the same contract as the Vite plugin. /house/ is external at build and served from HOUSE_DIR in dev.
//   import house from "./house-tools/astro-integration.mjs";  integrations: [house()]
import vitePlugin from "./vite-plugin.mjs";

export default function house(options = {}) {
  return {
    name: "house",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({ vite: { plugins: [vitePlugin(options)] } });
      },
    },
  };
}
