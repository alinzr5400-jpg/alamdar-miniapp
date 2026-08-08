import { createContext, useContext, useMemo } from "react";
import { useTonWallet, useTonAddress } from "@tonconnect/ui-react";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const wallet = useTonWallet();
  const walletAddress = useTonAddress(true);

  const connected = !!wallet;

  const value = useMemo(
    () => ({
      connected,
      wallet,
      walletAddress,

      walletName: wallet?.device?.appName || "",

      network: wallet?.account?.chain || "",

      walletImage: wallet?.device?.imageUrl || "",
    }),
    [wallet, walletAddress, connected]
  );

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  return useContext(WalletContext);
}