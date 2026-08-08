import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function tonConnectManifestPlugin() {
  const handler = (req, res, next) => {
    const url = req.url?.split("?")[0];
    if (url !== "/tonconnect-manifest.json") {
      return next();
    }

    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost:5173";
    const protoHeader = req.headers["x-forwarded-proto"];
    const proto = Array.isArray(protoHeader)
      ? protoHeader[0]
      : protoHeader || "http";
    const origin = `${proto}://${host}`;

    const body = JSON.stringify({
      url: origin,
      name: "Alamdar NFT",
      iconUrl: `${origin}/tonconnect-icon.png`,
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-store");
    res.end(body);
  };

  return {
    name: "tonconnect-manifest",
    configureServer(server) {
      // Before static files so public/tonconnect-manifest.json cannot shadow this.
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig({
  plugins: [react(), tonConnectManifestPlugin()],
  server: {
    // Bind all interfaces so Chrome extension can reach 127.0.0.1 (not only ::1)
    host: true,
    port: 5173,
    strictPort: true,
    // Required so Cloudflare TryCloudflare hostnames are not blocked by Vite.
    allowedHosts: [".trycloudflare.com", "localhost", "127.0.0.1"],
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/api": {
        target: "https://alamdar-backend1.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
