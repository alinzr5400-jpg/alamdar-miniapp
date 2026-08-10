import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { fetchSaleConfig } from "../services/api";
import { NFT_PRICE, MIN_BUY, MAX_BUY, TOTAL_NFT } from "../config/constants";

const SaleContext = createContext(null);

const fallback = {
  mintPrice: NFT_PRICE,
  minBuy: MIN_BUY,
  maxBuy: MAX_BUY,
  totalSupply: TOTAL_NFT,
  minted: 0,
  remaining: 12652,
  reveal: false,
  saleOpen: true,
  saleStartsAt: null,
  network: "testnet",
  collectionAddress: null,
  paymentAddress: null,
  loading: true,
  error: null,
};

export function SaleProvider({ children }) {
  const [sale, setSale] = useState(fallback);

  const refreshSale = useCallback(async () => {
    try {
      const data = await fetchSaleConfig();
      setSale({
        ...fallback,
        ...data,
        loading: false,
        error: null,
      });
      return data;
    } catch (err) {
      setSale((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Failed to load sale",
      }));
      return null;
    }
  }, []);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const data = await fetchSaleConfig();
        if (!alive) return;
        setSale({
          ...fallback,
          ...data,
          loading: false,
          error: null,
        });
      } catch (err) {
        if (!alive) return;
        setSale((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : "Failed to load sale",
        }));
      }
    }

    load();
    const timer = setInterval(load, 60000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);

  return (
    <SaleContext.Provider value={{ ...sale, refreshSale }}>
      {children}
    </SaleContext.Provider>
  );
}

export function useSale() {
  const ctx = useContext(SaleContext);
  if (!ctx) {
    throw new Error("useSale must be used inside SaleProvider");
  }
  return ctx;
}
