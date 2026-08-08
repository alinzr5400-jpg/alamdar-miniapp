import { WalletProvider } from "./context/WalletContext";
import { SaleProvider } from "./context/SaleContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import App from "./App";
import "./index.css";

// Fixed public HTTPS manifest so Tonkeeper (mobile/extension) can always load it.
const DEFAULT_MANIFEST_URL =
  "https://radiant-dusk-c1027e.netlify.app/tonconnect-manifest.json";

const manifestUrl =
  import.meta.env.VITE_MANIFEST_URL || DEFAULT_MANIFEST_URL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <WalletProvider>
        <SaleProvider>
          <App />
        </SaleProvider>
      </WalletProvider>
    </TonConnectUIProvider>
  </React.StrictMode>
);
