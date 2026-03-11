import { defineConfig, type Plugin, type Rollup } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * Converts render-blocking CSS <link> tags emitted by Vite into
 * non-render-blocking ones using the media="print" / onload trick.
 * Safe because critical above-the-fold CSS is already inlined in index.html.
 */
function asyncCssPlugin(): Plugin {
  return {
    name: "async-css",
    enforce: "post",
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet"([^>]*) href="(\/assets\/[^"]+\.css)"([^>]*)>/g,
        '<link rel="stylesheet" href="$2" media="print" onload="this.media=\'all\'"$1$3>\n    <noscript><link rel="stylesheet" href="$2"></noscript>'
      );
    },
  };
}

/**
 * Injects <link rel="modulepreload"> for async (lazy-loaded) JS chunks so the
 * browser discovers them from the HTML instead of waiting for the main bundle
 * to request them. This flattens the critical request chain from 3 levels to 2.
 */
function modulePreloadLazyChunksPlugin(): Plugin {
  return {
    name: "module-preload-lazy-chunks",
    enforce: "post",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        const preloadTags: string[] = [];
        for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
          const rollupChunk = chunk as Rollup.OutputChunk;
          if (
            rollupChunk.type === "chunk" &&
            !rollupChunk.isEntry &&
            fileName.endsWith(".js")
          ) {
            preloadTags.push(
              `<link rel="modulepreload" href="/${fileName}">`
            );
          }
        }
        if (preloadTags.length === 0) return html;
        return html.replace("</head>", `    ${preloadTags.join("\n    ")}\n  </head>`);
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: process.env.TEMPO === "true" ? "0.0.0.0" : "::",
    port: 8080,
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    asyncCssPlugin(),
    modulePreloadLazyChunksPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
