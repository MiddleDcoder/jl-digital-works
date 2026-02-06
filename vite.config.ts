import { defineConfig, type Plugin } from "vite";
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

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    asyncCssPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
