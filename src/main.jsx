import { WalletProvider } from "./context/WalletContext";
import { SaleProvider } from "./context/SaleContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import App from "./App";
import { initTelegramWebApp } from "./telegram";
import "./index.css";

initTelegramWebApp();

const DEFAULT_MANIFEST_URL =
  "https://radiant-dusk-c1027e.netlify.app/tonconnect-manifest.json";

const manifestUrl =
  import.meta.env.VITE_MANIFEST_URL || DEFAULT_MANIFEST_URL;

// Helps Android return to the Mini App after Tonkeeper; set your bot deep link in Netlify if you have one.
const twaReturnUrl =
  import.meta.env.VITE_TWA_RETURN_URL ||
  "https://radiant-dusk-c1027e.netlify.app/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      actionsConfiguration={{
        twaReturnUrl,
        returnStrategy: "back",
      }}
    >
      <WalletProvider>
        <SaleProvider>
          <App />
        </SaleProvider>
      </WalletProvider>
    </TonConnectUIProvider>
  </React.StrictMode>
);
